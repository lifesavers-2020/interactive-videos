import React from "react";
import Link from "next/link";

export const IndexPage: React.FC = () => {
  return (
    <>
      <Link href="/overlay-example">
        <button>Overlay Example</button>
      </Link>
    </>
  );
};

export default IndexPage;
