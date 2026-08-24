"""/api/source 代理:语义对齐官方 chroviewer source-proxy.ts。

- 仅 https URL(无凭证)
- ≤5 次重定向
- 256MB 上限
- SSRF 防护:hostname 解析后所有地址须为公网(拦截私网/保留段)
"""
from __future__ import annotations

import ipaddress
import socket

import httpx

MAX_SOURCE_BYTES = 256 * 1024 * 1024
MAX_REDIRECTS = 5
REDIRECT_STATUSES = {301, 302, 303, 307, 308}
REQUEST_TIMEOUT = 120.0

_BLOCKED_NETS: list[tuple[ipaddress._BaseNetwork, int]] = [
    (ipaddress.ip_network(n), v)
    for n, v in [
        ("0.0.0.0/8", 4), ("10.0.0.0/8", 4), ("100.64.0.0/10", 4),
        ("127.0.0.0/8", 4), ("169.254.0.0/16", 4), ("172.16.0.0/12", 4),
        ("192.0.0.0/24", 4), ("192.0.2.0/24", 4), ("192.88.99.0/24", 4),
        ("192.168.0.0/16", 4), ("198.18.0.0/15", 4), ("198.51.100.0/24", 4),
        ("203.0.113.0/24", 4), ("224.0.0.0/4", 4), ("240.0.0.0/4", 4),
        ("::/128", 6), ("::1/128", 6), ("::ffff:0:0/96", 6),
        ("64:ff9b:1::/48", 6), ("100::/64", 6), ("2001::/32", 6),
        ("2001:2::/48", 6), ("2001:db8::/32", 6), ("fc00::/7", 6),
        ("fe80::/10", 6), ("ff00::/8", 6),
    ]
]


def is_public_address(address: str) -> bool:
    try:
        ip = ipaddress.ip_address(address)
    except ValueError:
        return False
    for net, version in _BLOCKED_NETS:
        if version == ip.version and ip in net:
            return False
    return True


class SourceProxyError(Exception):
    def __init__(self, message: str, status: int):
        super().__init__(message)
        self.status = status


def validate_source_url(value: str) -> str:
    """校验并规范化源 URL,不合法抛 SourceProxyError。"""
    if len(value) == 0 or len(value) > 4096:
        raise SourceProxyError("Invalid source URL", 400)
    try:
        from urllib.parse import urlparse
        parsed = urlparse(value)
    except ValueError:
        raise SourceProxyError("Invalid source URL", 400) from None
    if parsed.scheme != "https" or parsed.username or parsed.password:
        raise SourceProxyError("Only public HTTPS source URLs are allowed", 400)
    hostname = parsed.hostname or ""
    hostname = hostname.strip("[]")
    if (
        hostname == "localhost"
        or hostname.endswith(".localhost")
        or hostname.endswith(".local")
        or hostname.endswith(".internal")
        or hostname.endswith(".home.arpa")
    ):
        raise SourceProxyError("Private source addresses are not allowed", 403)
    try:
        infos = socket.getaddrinfo(hostname, None)
    except OSError:
        raise SourceProxyError("Source hostname could not be resolved", 502) from None
    addresses = {info[4][0] for info in infos}
    if not addresses or not all(is_public_address(a) for a in addresses):
        raise SourceProxyError("Private source addresses are not allowed", 403)
    return value


async def proxy_remote_source(value: str | None) -> tuple[bytes | None, int, dict[str, str], str | None]:
    """代理下载。返回 (body, status, headers, error_message)。

    body 为 None 且 error_message 非空 = 代理自身错误;
    否则为远端响应(可能非 2xx,body 可能为空)。
    """
    if value is None:
        return None, 400, {}, "Missing source URL"
    source = value
    headers_out = {
        "cache-control": "no-store",
        "x-content-type-options": "nosniff",
    }
    async with httpx.AsyncClient(follow_redirects=False, timeout=REQUEST_TIMEOUT) as client:
        for _redirects in range(MAX_REDIRECTS + 1):
            try:
                url = validate_source_url(source)
            except SourceProxyError as e:
                return None, e.status, {}, e.message
            try:
                async with client.stream(
                    "GET", url,
                    headers={"accept": "application/octet-stream, application/zip, */*"},
                ) as response:
                    if response.status_code in REDIRECT_STATUSES:
                        location = response.headers.get("location")
                        if not location:
                            return None, 502, {}, "Source redirect was missing its destination"
                        from urllib.parse import urljoin
                        source = urljoin(url, location)
                        continue
                    if response.status_code >= 400:
                        await response.aread()
                        return None, response.status_code, headers_out, None
                    body = bytearray()
                    async for chunk in response.aiter_bytes():
                        body.extend(chunk)
                        if len(body) > MAX_SOURCE_BYTES:
                            return None, 413, {}, "Source file is too large"
                    headers_out["content-type"] = (
                        response.headers.get("content-type") or "application/octet-stream"
                    )
                    return bytes(body), response.status_code, headers_out, None
            except httpx.HTTPError:
                return None, 502, {}, "Source request failed"
        return None, 502, {}, "Source redirected too many times"
