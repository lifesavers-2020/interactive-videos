import React, { useState, useEffect, useRef, useMemo, RefObject } from "react";
import { Video } from "../core/Video";
import { CountdownTimer } from "../core/CountdownTimer";

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
  width: number;
  height: number;
}

interface ChoiceDetail {
  name: string;
  onClick: () => void;
}

type VideoState = "playing-main-story" | "pause-choosing" | "playing-choice";

export const BranchOnTimestamp: React.FC<Props> = ({ src, branches, width, height }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let timerRef: CountdownTimer | null;
  const [choiceOnClicks, setChoiceOnClicks] = useState<ChoiceDetail[]>([]);
  const [showTimer, setShowTimer] = useState(false);

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

    const countDownFinishHandler = () => {
    //   TODO: if (videoState === "playing-choice") {
    //     video.currentTime = branch.end;
    //     videoState = "playing-main-story";
    //     choice = null;
    //     branchIndex++;
    //   }
    }


    const step = () => {
      if (branchIndex >= branches.length) return;

      const timestamp = video.currentTime;
      const branch = branches[branchIndex];

      // Encounter a branch, pause the video and let user to choose
      if (videoState === "playing-main-story" && timestamp >= branch.start) {
        video.pause();
        setShowTimer(true);
        videoState = "pause-choosing";
        timerRef.
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
        setShowTimer(false);
        timerRef?.resetCounter()
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
        height={height}
        width={width}
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
      { // TODO fix error below }
      {showTimer ? <CountdownTimer ref = {ref => timerRef = ref} countDownFinishHandler = {this.countDownFinishHandler} width={this.props.width} height = {this.props.height}/> : null}
    </>
  );
};
