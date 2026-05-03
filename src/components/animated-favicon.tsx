"use client"

import { useEffect } from "react";

const FAVICON_SIZE = 64;
const MIN_FRAME_MS = 20;

type Frame = {
  dataUrl: string,
  durationMs: number,
};

type ImageDecodeResult = {
  image: VideoFrame,
};

type ImageDecoderInit = {
  data: ReadableStream<Uint8Array> | ArrayBuffer | ArrayBufferView,
  type: string,
};

type ImageDecoderTrack = {
  frameCount: number,
};

type ImageDecoderInstance = {
  completed: Promise<void>,
  tracks: { selectedTrack: ImageDecoderTrack | null },
  decode: (options: { frameIndex: number }) => Promise<ImageDecodeResult>,
  close: () => void,
};

type ImageDecoderCtor = new (init: ImageDecoderInit) => ImageDecoderInstance;

export function AnimatedFavicon({ src }: { src: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ImageDecoder = (window as unknown as { ImageDecoder?: ImageDecoderCtor })
      .ImageDecoder;
    if (!ImageDecoder) return;

    const ensureLink = (rel: string) => {
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      return link;
    }

    const iconLink = ensureLink("icon");
    const shortcutLink = ensureLink("shortcut icon");
    const previousIconHref = iconLink.getAttribute("href");
    const previousShortcutHref = shortcutLink.getAttribute("href");

    let cancelled = false;
    let timeoutId: number | undefined;
    let decoder: ImageDecoderInstance | null = null;

    const applyFavicon = (dataUrl: string) => {
      iconLink.href = dataUrl;
      shortcutLink.href = dataUrl;
    };

    const run = async () => {
      try {
        const response = await fetch(src, { cache: "force-cache" });
        if (!response.ok || !response.body || cancelled) return;

        decoder = new ImageDecoder({
          data: response.body,
          type: "image/webp",
        });
        await decoder.completed;
        if (cancelled) return;

        const track = decoder.tracks.selectedTrack;
        if (!track || track.frameCount === 0) return;

        const canvas = document.createElement("canvas");
        canvas.width = FAVICON_SIZE;
        canvas.height = FAVICON_SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const frames: Frame[] = [];
        for (let i = 0; i < track.frameCount; i++) {
          const { image } = await decoder.decode({ frameIndex: i });
          if (cancelled) {
            image.close();
            return;
          }
          ctx.clearRect(0, 0, FAVICON_SIZE, FAVICON_SIZE);
          ctx.drawImage(image, 0, 0, FAVICON_SIZE, FAVICON_SIZE);
          const durationUs = image.duration ?? 100_000;
          image.close();
          frames.push({
            dataUrl: canvas.toDataURL("image/png"),
            durationMs: Math.max(MIN_FRAME_MS, Math.round(durationUs / 1000)),
          });
        }

        if (cancelled || frames.length === 0) return;

        let index = 0;
        const tick = () => {
          if (cancelled) return;
          const frame = frames[index];
          applyFavicon(frame.dataUrl);
          index = (index + 1) % frames.length;
          timeoutId = window.setTimeout(tick, frame.durationMs);
        };
        tick();
      } catch {
        // decoding unsupported or failed — leave the static favicon in place
      }
    };

    run();

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      try {
        decoder?.close();
      } catch {
        // ignore
      }
      if (previousIconHref !== null) iconLink.href = previousIconHref;
      if (previousShortcutHref !== null) shortcutLink.href = previousShortcutHref;
    };
  }, [src]);

  return null;
}
