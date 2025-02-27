import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { CloseCircleOutlined } from "@ant-design/icons";

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
  border-radius: 10px;
  -webkit-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 100%;
  height: 100%;
  z-index: 96;
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

  &.open {
    pointer-events: all;
    user-select: all;
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  z-index: 98;
  pointer-events: none;
  user-select: none;
  opacity: 0;

  &.open {
    pointer-events: all;
    user-select: all;
    opacity: 1;
  }
`;

export default function Movie({ width, height, movie }) {
  const [open, setOpen] = useState(false);

  const [clone, setClone] = useState(null);

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
      </Content>
    </>
  );
}
