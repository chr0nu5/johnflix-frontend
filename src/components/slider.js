import React from "react";
import styled from "styled-components";

const Holder = styled.div`
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 90%
  );
  @media (max-width: 1024px) {
  }
`;

export default function Slider({ height }) {
  return <Holder style={{ height: height }}></Holder>;
}
