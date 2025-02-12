import React, { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import { Tooltip } from "antd";

import Movie from "./movie";

import {
  RightCircleOutlined,
  LeftCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const Holder = styled.div`
  overflow: hidden;
  position: relative;
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

const ViewMore = styled.div`
  position: absolute;
  bottom: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 41;
  cursor: pointer;

  left: 50%;
  margin-left: 80px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default function Display({ movies, width, height, more }) {
  const navigate = useNavigate();

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
    <>
      <Holder style={{ height: `${height}px`, width: `${width}px` }}>
        {movies.map((movie, index) => {
          return (
            <Movie
              key={index}
              index={index}
              movie={movie}
              counter={counter}
              height={height * 0.3}
              next={next}
              previous={previous}
              selected={selected}
              screen={width}
            />
          );
        })}
      </Holder>
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
      {more && (
        <ViewMore
          onClick={() => {
            navigate(more);
          }}>
          <Tooltip title="View more">
            <ArrowRightOutlined />
          </Tooltip>
        </ViewMore>
      )}
    </>
  );
}
