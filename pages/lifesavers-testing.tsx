import React from "react";
import { BranchOnTimestamp, Branch } from "../components/interactives/BranchOnTimestamp";

const src =
  "https://firebasestorage.googleapis.com/v0/b/lifesavers-9ecdf.appspot.com/o/lifesavers-testing.mp4?alt=media&token=1011e485-9f92-47e2-a866-38cb01f8728d";

const branches: Branch[] = [
  {
    start: 7.8,
    end: 12,
    choices: [
      { name: "Donate stem cells", start: 14.8, end: 14.8 },
      { name: "Donate blood", start: 26.8, end: 37 },
    ],
  },
  { start: 26, end: 26, choices: [] }, // End the video earlier
];

const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 360;

const LifesaversTestingPage: React.FC = () => {
  return (
    <>
      <BranchOnTimestamp {...{ src, branches, width: VIDEO_WIDTH, height: VIDEO_HEIGHT }} />
    </>
  );
};

export default LifesaversTestingPage;
