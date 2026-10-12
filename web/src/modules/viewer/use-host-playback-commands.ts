import { useEffect, useRef } from 'react';

import type { useSongTransport } from './use-song-transport';

/**
 * Pause request coming from the embedding host (SaberLab).
 *
 * SaberLab shows this viewer inside an iframe that stays mounted while other pages are
 * displayed, so a running replay would keep playing off-screen. The host sends
 * `{ type: 'saberlab:playback', action: 'pause' }` to this window when that iframe
 * leaves the visible page.
 *
 * Contract notes (keep the host side in sync — SaberLab `frontend/app.js`):
 * - messages are accepted only from the parent frame on this exact origin;
 * - the request is one-way: it only pauses, freezing the song at its current position.
 *   Nothing resumes automatically when the page comes back — the player continues
 *   manually. Nothing is reset either; opening another replay recreates the iframe;
 * - a pause request is ignored when nothing is playing, so it can never start playback;
 * - a document that supports this protocol is marked with
 *   `<html data-saberlab-host="1">` so the host can tell whether its request was
 *   understood and fall back to its own control path when it was not.
 */
const HOST_PLAYBACK_MESSAGE = 'saberlab:playback';

interface HostPlaybackMessage {
  type: typeof HOST_PLAYBACK_MESSAGE;
  action: 'pause';
}

function isHostPlaybackMessage(data: unknown): data is HostPlaybackMessage {
  if (typeof data !== 'object' || data === null) return false;
  const candidate = data as { type?: unknown; action?: unknown };
  return candidate.type === HOST_PLAYBACK_MESSAGE && candidate.action === 'pause';
}

export function useHostPlaybackCommands({
  disabled,
  transport,
}: {
  /** Live / watch-party runtimes drive the transport themselves. */
  disabled: boolean;
  transport: ReturnType<typeof useSongTransport>;
}) {
  const transportRef = useRef(transport);
  transportRef.current = transport;

  useEffect(() => {
    document.documentElement.dataset.saberlabHost = '1';

    function handleMessage(event: MessageEvent) {
      if (disabled) return;
      if (event.source !== window.parent) return;
      if (event.origin !== window.location.origin) return;
      if (!isHostPlaybackMessage(event.data)) return;
      const current = transportRef.current;
      if (current.playing) current.pause();
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [disabled]);
}
