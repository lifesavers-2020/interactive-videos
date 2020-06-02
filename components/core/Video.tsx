import React from "react";

interface Props {
  src: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  videoProps?: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
}

export const Video: React.FC<Props> = ({ src, width, height, style, videoProps }) => {
  return (
    <div style={{ width, height, ...style }}>
      <video height={height} width={width} {...videoProps}>
        <source src={src} />
      </video>
    </div>
  );
};
