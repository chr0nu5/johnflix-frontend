import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tag, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import Slider from "./slider";
import Menu from "./menu";

import Helper from "../libs/helper";

import Page from "./page";

const Holder = styled.div`
  @media (max-width: 1024px) {
  }
`;

const Featured = styled.div`
  position: relative;
  width: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  @media (max-width: 1024px) {
  }
`;

const FeaturedBlur = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(8px);
`;

const Content = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

const ContentTitle = styled.div`
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 1024px) {
    font-size: 40px;
  }
`;

const ContentTags = styled.div`
  margin-bottom: 24px;
`;

export default function Display({ items, hidden }) {
  const helper = Helper();

  const [height, setHeight] = useState(window.innerHeight);
  // const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
    // setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("load", handleWindowSizeChange);
  }, []);

  return (
    <Holder>
      <Featured
        style={{
          height: height,
          backgroundImage: `url(${items[0].image})`,
        }}
      >
        <FeaturedBlur />
        <Menu hidden={hidden} />
        <Content>
          <Page>
            <ContentTitle>{items[0].title}</ContentTitle>
            <ContentTags>
              {items[0].subtitle && (
                <Tag bordered color="success" style={{ fontSize: 16 }}>
                  {items[0].subtitle}
                </Tag>
              )}
              {items[0].duration && (
                <Tag bordered color="warning" style={{ fontSize: 16 }}>
                  {helper.secondsToHm(items[0].duration)}
                </Tag>
              )}
            </ContentTags>
            <Button
              style={{ marginBottom: 16 }}
              type="primary"
              size={"large"}
              icon={<CaretRightOutlined />}
              onClick={() => {
                window.location = `/${items[0].path}/${items[0].hash}`;
              }}
            >
              PLAY
            </Button>
          </Page>
          <Slider height={160} items={items} />
        </Content>
      </Featured>
    </Holder>
  );
}
