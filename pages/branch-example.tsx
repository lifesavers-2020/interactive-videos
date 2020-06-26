import React from "react";
import { BranchOnTimestamp, Branch } from "../components/interactives/BranchOnTimestamp";

const src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const branches: Branch[] = [
  {
    start: 1,
    end: 83,
    choices: [
      { name: "Hit a Bird", start: 17, end: 22 },
      { name: "Wake a Rabbit", start: 46, end: 53 },
    ],
  },
];

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

const BranchExamplePage: React.FC = () => {
  return (
    <>
      <BranchOnTimestamp {...{ src, branches, width: VIDEO_WIDTH, height: VIDEO_HEIGHT }} />
    </>
  );
};

export default BranchExamplePage;
