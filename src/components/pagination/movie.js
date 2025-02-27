import React from "react";
import styled from "styled-components";

const Holder = styled.div`
  position: relative;
  border-radius: 8px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  flex: 1 1 calc((100% - (7 * 16px)) / 4);
  max-width: calc((100% - (7 * 16px)) / 4);
  box-sizing: border-box;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.background});
  overflow: hidden;
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

export default function Movie({ width, height, movie }) {
  return (
    <Holder width={width} height={height} background={movie.cover}></Holder>
  );
}
