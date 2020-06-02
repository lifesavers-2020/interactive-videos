import React from "react";
import { Overlay } from "../components/interactives/Overlay";

const src1 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const src2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

const VIDEO_WIDTH = 1280;
const VIDEO_HEIGHT = 720;

const OverLayExamplePage: React.FC = () => {
  return (
    <>
      <Overlay {...{ src1, src2, width: VIDEO_WIDTH, height: VIDEO_HEIGHT }} />
    </>
  );
};

export default OverLayExamplePage;
