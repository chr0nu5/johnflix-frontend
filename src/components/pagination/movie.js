import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { CloseCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Button, Tag, Progress, Avatar, Tooltip } from "antd";

import { useNavigate } from "react-router-dom";

const Holder = styled.div`
  position: relative;
  border-radius: 8px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  flex: 1 1 calc((100% - (7 * 16px)) / 4);
  max-width: calc((100% - (7 * 16px)) / 4);
  box-sizing: border-box;
`;

const Details = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.background});
  overflow: hidden;
  border-radius: 8px;
  -webkit-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 100%;
  height: 100%;
  z-index: 89;
  overflow: scroll;
`;

const Close = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 8px;
  cursor: pointer;
  z-index: 1000;
  width: 48px;
  height: 48px;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 0) 100%
  );

  backdrop-filter: blur(4px);

  &.open {
    pointer-events: all;
    user-select: all;
    opacity: 1;
  }
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 90%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transform: translate(-50%, -50%);
  pointer-events: none;
  user-select: none;
  opacity: 0;
  overflow: hidden;
  border-radius: 8px;

  &.open {
    pointer-events: all;
    user-select: all;
    opacity: 1;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 40%;
  background: transparent;
  z-index: 0;
  object-fit: cover;
  mask-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0) 99%,
    rgba(0, 0, 0, 1) 60%
  );

  /* For Safari and older WebKit browsers */
  -webkit-mask-image: -webkit-gradient(
    linear,
    left 0%,
    left bottom,
    color-stop(60%, rgba(0, 0, 0, 1)),
    color-stop(99%, rgba(0, 0, 0, 0))
  );
`;

const Info = styled.div`
  padding: 32px;
`;

const Title = styled.div`
  font-size: 48px;
  font-family: "Anton", serif;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 100%;
  pointer-events: none;
  user-select: none;
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

export default function Movie({ width, height, movie }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [clone, setClone] = useState(null);

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
    navigate(`/play/${movie.hash}/${movie.type}`);
  };

  const animateToCenter = (event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    // Create a clone
    const _clone = target.cloneNode(true);
    _clone.style.position = "fixed";
    _clone.style.top = `${rect.top}px`;
    _clone.style.left = `${rect.left}px`;
    _clone.style.width = `${rect.width}px`;
    _clone.style.height = `${rect.height}px`;
    _clone.style.transition = "all 1s";
    _clone.style.zIndex = 97;

    document.body.appendChild(_clone);

    setTimeout(() => {
      _clone.style.top = "50%";
      _clone.style.left = "50%";
      _clone.style.width = "50%";
      _clone.style.height = "90%";
      _clone.style.transform = "translate(-50%, -50%)";

      setClone(_clone);
    }, 1);

    setTimeout(() => {
      setOpen(true);
    }, 1000);

    // Clean up after animation
    // clone.addEventListener("transitionend", () => {
    //   document.body.removeChild(clone);
    //   setSelectedMovie(movie);
    // });
  };

  useEffect(() => {
    if (!open && clone) {
      document.body.removeChild(clone);
      setClone(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <Holder width={width} height={height}>
        <Details
          background={movie.cover}
          onClick={(event) => {
            animateToCenter(event);
          }}></Details>
      </Holder>
      <Overlay className={open ? "open" : ""} onClick={() => setOpen(false)} />
      <Content className={open ? "open" : ""}>
        <Close onClick={() => setOpen(false)}>
          <CloseCircleOutlined />
        </Close>
        {open && (
          <>
            <Video
              autoPlay
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
            <Info>
              <Title>{movie.title ? movie.title : movie.name}</Title>
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
                {movie.date ? (
                  <Tag color="gold">{parseYear(movie.date)}</Tag>
                ) : (
                  <></>
                )}
                {movie.duration ? (
                  <Tag color="orange">{parseDuration(movie.duration)}</Tag>
                ) : (
                  <></>
                )}
              </PlayInfo>
              {movie.media && movie.season && movie.number && (
                <Description style={{ textTransform: "uppercase" }}>
                  {movie.title ? movie.title : movie.name}{" "}
                  <strong style={{ color: "#ed2517" }}>
                    S{movie.season}
                    {movie.number}
                  </strong>
                </Description>
              )}
              {movie.description && (
                <Description>{movie.description}</Description>
              )}
              <Button
                onClick={() => {
                  setOpen(false);
                  play();
                }}
                size={"large"}
                style={{ marginTop: "24px" }}
                icon={<CaretRightOutlined />}>
                {movie.progress && movie.progress > 0 ? "RESUME" : "PLAY"}
              </Button>
              {movie.tag &&
                movie.genre &&
                (movie.tag.length > 0 || movie.genre.length > 0) && (
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
                                setOpen(false);
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
                                setOpen(false);
                                navigate(`/genre/${genre.hash}`);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </Tooltip>
                        );
                      })}
                    </Avatar.Group>
                  </GenresTags>
                )}
            </Info>
          </>
        )}
      </Content>
    </>
  );
}
