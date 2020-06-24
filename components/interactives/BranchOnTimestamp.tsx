import React, { useState, useEffect, useRef, useMemo } from "react";
import { Video } from "../core/Video";

export interface Choice {
  name: string;
  start: number;
  end: number;
}

export interface Branch {
  start: number;
  end: number;
  choices: Choice[];
}

interface Props {
  src: string;
  branches: Branch[];
}

interface ChoiceDetail {
  name: string;
  onClick: () => void;
}

type VideoState = "playing-main-story" | "pause-choosing" | "playing-choice";

export const BranchOnTimestamp: React.FC<Props> = ({ src, branches }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [choiceOnClicks, setChoiceOnClicks] = useState<ChoiceDetail[]>([]);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    let animationHandle: number;
    let branchIndex = 0;
    let videoState: VideoState = "playing-main-story";
    let choice: number | null = null;

    video.oncontextmenu = (e) => {
      e.preventDefault();
      if (videoState === "pause-choosing") return;
      video.paused ? video.play() : video.pause();
    };

    const step = () => {
      if (branchIndex >= branches.length) return;

      const timestamp = video.currentTime;
      const branch = branches[branchIndex];

      // Encounter a branch, pause the video and let user to choose
      if (videoState === "playing-main-story" && timestamp >= branch.start) {
        video.pause();
        videoState = "pause-choosing";
        setChoiceOnClicks(
          branch.choices.map(({ name }, i) => ({
            name,
            onClick: () => (choice = i),
          }))
        );
      }

      // User chooses a branch, jump to the correct timestamp and play
      if (videoState === "pause-choosing" && choice !== null) {
        video.currentTime = branch.choices[choice].start;
        video.play();
        videoState = "playing-choice";
        setChoiceOnClicks([]);
      }

      // End branching, go back to main story line
      if (videoState === "playing-choice" && choice !== null && timestamp >= branch.choices[choice].end) {
        video.currentTime = branch.end;
        videoState = "playing-main-story";
        choice = null;
        branchIndex++;
      }

      animationHandle = window.requestAnimationFrame(step);
    };

    animationHandle = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationHandle);
  }, [videoRef, branches]);

  const VideoMemo = useMemo(
    () => (
      <Video
        src={src}
        videoProps={{
          playsInline: true,
          ref: videoRef,
          autoPlay: true,
          muted: true,
        }}
      />
    ),
    [src]
  );

  return (
    <>
      {VideoMemo}
      <div>
        {choiceOnClicks.map((choice) => (
          <button key={choice.name} onClick={choice.onClick}>
            {choice.name}
          </button>
        ))}
      </div>
    </>
  );
};
