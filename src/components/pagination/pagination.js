import React from "react";
import styled from "styled-components";

import Movie from "./movie";

import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Holder = styled.div`
  position: fixed;
  width: ${(props) => props.width}px;
  min-height: ${(props) => props.height}px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.background});
`;

const Blur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
`;

const Elements = styled.div`
  width: ${(props) => props.width}px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  padding: 32px;
  padding-top: ${(props) => props.margin}px;
  justify-content: flex-start;
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

const Buttons = styled.div`
  margin-top: 24px;
  padding: 32px;
  padding-top: 0px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

export default function Pagination({ width, height, data, getPage, photos }) {
  return data ? (
    <>
      <Holder
        width={width}
        height={height}
        background={data.results.info.cover}>
        <Blur />
        <Title>
          {data.results.info.name
            ? data.results.info.name
            : data.results.info.title}
        </Title>
      </Holder>
      <Elements width={width} margin={height - (width / 2) * 0.56}>
        {data.results.movies.map((movie) => {
          return (
            <Movie
              width={width / 4 - 32}
              height={(width / 4) * 0.56}
              key={movie.hash}
              movie={movie}
              photos={photos}
            />
          );
        })}
      </Elements>
      {(data.previous || data.next) && (
        <Buttons>
          {data.previous ? (
            <Button
              onClick={() => {
                getPage(data.previous);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              size={"large"}
              icon={<CaretLeftOutlined />}>
              PREVIOUS PAGE
            </Button>
          ) : (
            <Button disabled size={"large"} icon={<CaretLeftOutlined />}>
              PREVIOUS PAGE
            </Button>
          )}
          {data.next ? (
            <Button
              onClick={() => {
                getPage(data.next);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              size={"large"}
              icon={<CaretRightOutlined />}>
              NEXT PAGE
            </Button>
          ) : (
            <Button disabled size={"large"} icon={<CaretRightOutlined />}>
              NEXT PAGE
            </Button>
          )}
        </Buttons>
      )}
    </>
  ) : (
    <></>
  );
}
