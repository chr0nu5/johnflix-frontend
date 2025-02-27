import React, { useState } from "react";
import styled from "styled-components";

import Movie from "./movie";

import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";

const Holder = styled.div`
  overflow: hidden;
  position: relative;
`;

const Title = styled.div`
  position: absolute;
  left: 48px;
  font-size: 80px;
  color: #fff;
  font-family: "Anton", serif;
  font-weight: 400;
  z-index: 40;
  text-transform: uppercase;
  top: 128px;
  opacity: 0.24;
  text-shadow: 0px 0px 20px #000000;
  pointer-events: none;
  line-height: 100%;
`;

const Arrows = styled.div`
  position: absolute;
  bottom: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 41;
  cursor: pointer;
  opacity: 0.32;
  bottom: 56px;

  &:hover {
    opacity: 0.64;
  }

  svg {
    width: 40px;
    height: 40px;
  }

  &.left {
    left: 50%;
    margin-left: -32px;
  }
  &.right {
    left: 50%;
    margin-left: 16px;
  }
`;

export default function Display({
  movies,
  width,
  height,
  more,
  title,
  playPreview,
  linkTo,
}) {
  const [counter, setCounter] = useState(0);

  const next = () => {
    if (counter < movies.length - 1) {
      setCounter(counter + 1);
    }
  };

  const previous = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const selected = (index) => {
    setCounter(index);
  };

  return (
    <Holder style={{ height: `${height}px`, width: `${width}px` }}>
      {movies.map((movie, index) => {
        return (
          <Movie
            key={index}
            index={index}
            movie={movie}
            counter={counter}
            height={height * 0.3}
            selected={selected}
            screen={width}
            playPreview={playPreview}
            linkTo={linkTo}
          />
        );
      })}
      {more && (
        <Movie
          height={height * 0.3}
          more={more}
          screen={width}
          key={movies.length}
          index={movies.length}
          counter={counter}
          playPreview={playPreview}
          linkTo={linkTo}
        />
      )}
      {title && counter < movies.length - 1 && <Title>{title}</Title>}
      {counter > 0 && (
        <Arrows
          style={{ marginLeft: `-${(height * 0.3) / 2 + 16 - 16}px` }}
          className={"left"}
          onClick={previous}>
          <LeftCircleOutlined />
        </Arrows>
      )}
      {counter < movies.length - 1 && (
        <Arrows
          style={{ marginLeft: `-${(height * 0.3) / 2 - 32 - 16}px` }}
          className={"right"}
          onClick={next}>
          <RightCircleOutlined />
        </Arrows>
      )}
    </Holder>
  );
}
