import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Tag, Progress, Avatar, Tooltip } from "antd";

const Holder = styled.div`
  position: absolute;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  left: 50%;
  transform: translate(-50%, 0) scale(1);
  overflow: hidden;
  transition: all 1s cubic-bezier(0.3, 0.7, 0.3, 1);
  border: 0px solid #000;

  &.previous {
    width: 120% !important;
    height: 120% !important;
    filter: blur(40px);
    border-radius: 0px;
    bottom: 112px;
  }

  &.active {
    width: 100% !important;
    height: 100% !important;
    margin-left: 0px !important;
    border-radius: 0px;
    bottom: 0px;
  }

  &.next {
    border-radius: 10px;
    -webkit-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 1);
    -moz-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 1);
    box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 1);
    cursor: pointer;
    bottom: 112px;
  }
`;

const MovieShadow = styled.div`
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  transition: all 1s cubic-bezier(0.3, 0.7, 0.3, 1);
  z-index: 1;
`;

const MovieInfo = styled.div`
  position: absolute;
  left: 48px;
  bottom: 48px;
  z-index: 2;
  transition: all 1s cubic-bezier(0.3, 0.7, 0.3, 1);
`;

const Title = styled.div`
  font-size: 48px;
  font-family: "Anton", serif;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 100%;
  pointer-events: none;
`;

const PlayInfo = styled.div`
  pointer-events: none;
`;
const Description = styled.div`
  margin-top: 24px;
  pointer-events: none;
`;
const GenresTags = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
`;
const Buttons = styled.div`
  margin-top: 24px;
`;

const Video = styled.video`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 0;
  object-fit: cover;
`;

export default function Movie({
  index,
  movie,
  counter,
  height,
  next,
  previous,
  selected,
  screen,
}) {
  const navigate = useNavigate();

  const isNext = index > counter;
  const delay = isNext ? (index - counter) * 0.1 : 0;

  const parseYear = (date) => {
    return `${date}`.substr(0, 4);
  };

  const parseDuration = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);

    var hDisplay = h > 0 ? h + (h === 1 ? "h " : "h ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? "m" : "m") : "";
    return hDisplay + mDisplay;
  };

  const play = () => {
    navigate(`/play/${movie.hash}`);
  };

  return (
    <Holder
      key={index}
      style={{
        backgroundImage: `url(${movie.cover})`,
        zIndex: index,
        marginLeft: `${
          isNext ? `${(index - counter - 1) * (height + 24)}px` : "0px"
        }`,
        height: `${height * 0.64}px`,
        width: `${height}px`,
        transitionDelay: `${delay}s`,
      }}
      className={`${index < counter ? "previous" : ""} ${
        index === counter ? "active" : ""
      } ${isNext ? "next" : ""}`}
      onClick={() => {
        selected(index);
      }}>
      <MovieShadow style={{ opacity: index <= counter ? 1 : 0 }} />
      <MovieInfo
        style={{
          opacity: index === counter ? 1 : 0,
          width: screen / 3,
        }}>
        <Title>{movie.title}</Title>
        {movie.progress && movie.progress > 0 ? (
          <Progress
            percent={(movie.progress / movie.duration) * 100}
            status="active"
            showInfo={false}
            strokeColor={"#fff"}
          />
        ) : (
          <></>
        )}
        <PlayInfo>
          <Tag color="gold">{parseYear(movie.date)}</Tag>
          <Tag color="orange">{parseDuration(movie.duration)}</Tag>
        </PlayInfo>
        {movie.description && <Description>{movie.description}</Description>}
        {(movie.tag.length > 0 || movie.genre.length > 0) &&
        index === counter ? (
          <GenresTags>
            <Avatar.Group
              max={{
                count: 5,
              }}>
              {movie.tag.map((tag) => {
                return (
                  <Tooltip title={tag.name} placement="top">
                    <Avatar
                      src={tag.cover}
                      onClick={() => {
                        navigate(`/tag/${tag.hash}`);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                );
              })}
            </Avatar.Group>
            <Avatar.Group
              max={{
                count: 5,
              }}>
              {movie.genre.map((genre) => {
                return (
                  <Tooltip title={genre.name} placement="top">
                    <Avatar
                      src={genre.cover}
                      onClick={() => {
                        navigate(`/tag/${genre.hash}`);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                );
              })}
            </Avatar.Group>
          </GenresTags>
        ) : (
          <></>
        )}
        <Buttons>
          <Button
            onClick={index === counter ? play : () => {}}
            size={"large"}
            icon={<CaretRightOutlined />}>
            PLAY
          </Button>
        </Buttons>
      </MovieInfo>
      {index === counter && (
        <Video
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          disablePictureInPicture>
          <source
            src={`${movie.media}#t=${(movie.duration / 100) * 40},${
              (movie.duration / 100) * 50
            }`}
            type="video/mp4"
          />
        </Video>
      )}
    </Holder>
  );
}
