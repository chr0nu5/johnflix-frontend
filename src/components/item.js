import React, { useState } from "react";
import styled from "styled-components";
import { Skeleton } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import Watchlist from "./watchlist";

const ElementContent = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  right: 8px;
  bottom: 0px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: 0.5s;
`;

const SkeletonHolder = styled.div`
  /* background: rgba(0, 0, 0, 0.5); */
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  transition: 1s;
  opacity: 1;

  div {
    width: 100% !important;
    height: 100% !important;

    div {
      width: 100% !important;
      height: 100% !important;
    }
  }
`;

const ElementContentOverlay = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  transition: 1s;
  opacity: 0.5;
  z-index: 2;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 90%
  );

  &:hover {
    opacity: 1;
  }

  @media (max-width: 1024px) {
    opacity: 1;
  }
`;

const ItemTitle = styled.div`
  position: absolute;
  left: 8px;
  bottom: 8px;
  right: 8px;
  font-size: 24px;
  z-index: 2;

  span {
    display: block;
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    font-size: 16px;

    span {
      font-size: 12px;
    }
  }
`;

const Play = styled.a`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e50914;
  border: none;
  border-radius: 80px;
  padding: 16px;
  cursor: pointer;
  transition: 1s;
  opacity: 0.5;
  z-index: 2;

  &:hover {
    opacity: 1;
  }
`;

const Heart = styled.div`
  position: absolute;
  right: 12px;
  top: 8px;
  z-index: 2;

  svg {
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 1));
  }
`;

export default function Item({ item }) {
  const [loaded, setLoaded] = useState(false);

  const img = new Image();
  img.src = item.image;
  img.onload = () => {
    setLoaded(true);
  };

  return (
    <ElementContent
      style={{ backgroundImage: loaded ? `url(${item.image})` : "none" }}
    >
      <SkeletonHolder style={{ opacity: loaded ? 0 : 1 }}>
        <Skeleton.Image active={!loaded} />
      </SkeletonHolder>
      <Heart style={{ top: item.time ? 24 : 8 }}>
        <Watchlist initial={item.watchlist} hash={item.hash} />
      </Heart>
      <ElementContentOverlay>
        <Play href={`/${item.path}/${item.hash}`}>
          <CaretRightOutlined />
        </Play>
        <ItemTitle>
          {item.title}
          <span>{item.subtitle}</span>
        </ItemTitle>
      </ElementContentOverlay>
    </ElementContent>
  );
}
