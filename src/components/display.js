import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tag, Button } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import Slider from "./slider";
import Menu from "./menu";

import Helper from "../libs/helper";

import Page from "./page";
import Api from "../libs/api";
import Storage from "../libs/storage";

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
  z-index: 1;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(8px);
`;

const FeaturedVideo = styled.div`
  position: absolute;
  overflow: hidden;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0;
  transition: 1s;
  pointer-events: none;

  video {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: transparent;
  }
`;

const Content = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 3;
`;

const ContentTitle = styled.div`
  font-size: 80px;
  font-weight: bold;
  /* margin-bottom: 8px; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 1024px) {
    font-size: 40px;
  }
`;

const ContentDescription = styled.div`
  font-size: 16px;
  margin-bottom: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const ContentTags = styled.div`
  margin-bottom: 24px;
`;

export default function Display({ items, hidden }) {
  const api = Api();
  const storage = Storage();

  const helper = Helper();

  const [height, setHeight] = useState(window.innerHeight);

  function handleWindowSizeChange() {
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    window.addEventListener("load", handleWindowSizeChange);
  }, []);

  const [preview, setPreview] = useState(false);

  const getMoviePreview = async () => {
    let item = null;
    const token = storage.getItem("token");
    item = await api.getMovie(token, items[0].hash);
    if (item) {
      setPreview(item);
    }
  };

  // useEffect(() => {
  //   if (preview) {
  //     if(preview.height < height) {

  //     } else {

  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [preview, width, height]);

  useEffect(() => {
    getMoviePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {preview && (
          <FeaturedVideo
            style={{
              opacity: preview ? 1 : 0,
            }}
          >
            <video autoPlay playsInline muted>
              <source
                src={`${preview.media}#t=${preview.duration / 3}`}
                type="video/mp4"
              />
            </video>
          </FeaturedVideo>
        )}
        <Menu hidden={hidden} />
        <Content>
          <Page>
            <ContentTitle>{items[0].title}</ContentTitle>
            {preview && (
              <ContentDescription>{preview.description}</ContentDescription>
            )}
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
              style={{ marginBottom: 32 }}
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
          <Slider title={"Recommended for you"} items={items} />
        </Content>
      </Featured>
    </Holder>
  );
}
