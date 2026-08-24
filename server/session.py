"""会话级文件表:双击打开的本地文件 → 短 id(承接 /replay/{id}/raw)。"""
from __future__ import annotations

import pathlib
import threading
import uuid


class SessionFiles:
    def __init__(self):
        self._lock = threading.Lock()
        self._files: dict[str, pathlib.Path] = {}

    def register(self, path: pathlib.Path) -> str:
        file_id = uuid.uuid4().hex[:12]
        with self._lock:
            self._files[file_id] = path
        return file_id

    def get(self, file_id: str) -> pathlib.Path | None:
        with self._lock:
            return self._files.get(file_id)


session_files = SessionFiles()
