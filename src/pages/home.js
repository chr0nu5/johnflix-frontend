import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Holder = styled.div`
  padding: 10px;
  @media (max-width: 768px) {
  }
`;

export default function Home() {
  // states
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("load", handleWindowSizeChange);
  }, []);

  return (
    <Holder>
      {width} : {height}
    </Holder>
  );
}
