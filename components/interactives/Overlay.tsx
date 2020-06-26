import React, { useState, useCallback, useRef, useEffect } from "react";
import { Video } from "../core/Video";

const FAST_FORWARD_REWIND_DURATION = 5;

interface Props {
  src1: string;
  src2: string;
  width: number;
  height: number;
}

export const Overlay: React.FC<Props> = ({ src1, src2, width, height }) => {
  const [isFirstVideoOnTop, setIsFirstVideoOnTop] = useState(true);

  const v1Ref = useRef<HTMLVideoElement>(null);
  const v2Ref = useRef<HTMLVideoElement>(null);

  const playPauseVideo = useCallback(() => {
    if (!v1Ref.current || !v2Ref.current) return;
    v1Ref.current.paused ? v1Ref.current.play() : v1Ref.current.pause();
    v2Ref.current.paused ? v2Ref.current.play() : v2Ref.current.pause();
  }, [v1Ref, v2Ref]);

  const onVideoSwitch = useCallback(
    (switchTo: boolean) => {
      setIsFirstVideoOnTop(switchTo);
    },
    [setIsFirstVideoOnTop]
  );

  const onVideoContextMenu = useCallback(
    (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
      e.preventDefault();
      playPauseVideo();
    },
    [playPauseVideo]
  );

  const videoControlHandler = useCallback(
    (e: KeyboardEvent) => {
      if (!v1Ref.current || !v2Ref.current) return;

      // Play/pause video
      if (e.key === " ") return playPauseVideo();

      // Fast-forward/rewind video
      let amount = 0;

      if (e.key === "ArrowRight") amount = 1;
      else if (e.key === "ArrowLeft") amount = -1;

      v1Ref.current.currentTime += amount * FAST_FORWARD_REWIND_DURATION;
      v2Ref.current.currentTime += amount * FAST_FORWARD_REWIND_DURATION;
    },
    [playPauseVideo, v1Ref, v2Ref]
  );

  useEffect(() => {
    window.addEventListener("keydown", videoControlHandler);
    return () => window.removeEventListener("keydown", videoControlHandler);
  }, [videoControlHandler]);

  return (
    <>
      <div style={{ height, marginBottom: 16 }}>
        <Video
          src={src1}
          height={height}
          width={width}
          style={{ position: "absolute", zIndex: isFirstVideoOnTop ? 1 : -1 }}
          videoProps={{
            autoPlay: true,
            muted: true,
            ref: v1Ref,
            onContextMenu: onVideoContextMenu,
          }}
        />
        <Video
          src={src2}
          height={height}
          width={width}
          style={{ position: "absolute", zIndex: isFirstVideoOnTop ? -1 : 1 }}
          videoProps={{
            autoPlay: true,
            muted: true,
            ref: v2Ref,
            onContextMenu: onVideoContextMenu,
          }}
        />
      </div>

      <button onClick={() => onVideoSwitch(!isFirstVideoOnTop)}>Switch Video</button>
    </>
  );
};
