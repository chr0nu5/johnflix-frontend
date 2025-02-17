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
  left: 50%;
  font-size: 24px;
  color: #fff;
  font-family: "Anton", serif;
  font-weight: 400;
  z-index: 40;
  text-transform: uppercase;
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

  svg {
    width: 40px;
    height: 40px;
  }

  &.left {
    left: 50%;
    margin-left: -48px;
  }
  &.right {
    left: 50%;
    margin-left: 16px;
  }
`;

export default function Display({ movies, width, height, more, title }) {
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
        />
      )}
      {title && counter < movies.length - 1 && (
        <Title
          style={{
            marginLeft: `-${(height * 0.3) / 2 - 8}px`,
            bottom: height * 0.3 + 32,
          }}>
          {title}
        </Title>
      )}
      {counter > 0 && (
        <Arrows className={"left"} onClick={previous}>
          <LeftCircleOutlined />
        </Arrows>
      )}
      {counter < movies.length - 1 && (
        <Arrows className={"right"} onClick={next}>
          <RightCircleOutlined />
        </Arrows>
      )}
    </Holder>
  );
}
