import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { Button } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import Api from "../libs/api";
import Storage from "../libs/storage";
import Watchlist from "./watchlist";

const Holder = styled.div`
  position: relative;

  .navigation {
    opacity: 0;
  }

  &:hover {
    .navigation {
      opacity: 1;
      bottom: 64px;
    }
  }
`;

const WatchlistHolder = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 3;
`;

const NextEpisode = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 4;
  opacity: 0.1;
  transition: 1s;
`;

const PreviousEpisode = styled.div`
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 4;
  opacity: 0.1;
  transition: 1s;
`;

// const Preview = styled.div`
//   position: absolute;
//   bottom: 56px;
//   width: 300px;
//   height: 168px;
//   -webkit-background-size: cover;
//   -moz-background-size: cover;
//   -o-background-size: cover;
//   background-size: cover;
//   overflow: hidden;
//   border-radius: 8px;
//   padding: 8px;
//   display: flex;
//   align-items: end;
//   justify-content: left;
//   -webkit-box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 1);
//   -moz-box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 1);
//   box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 1);
// `;

export default function Video({ media, width, height, party }) {
  const api = Api();
  const storage = Storage();

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  let _x = (media.height * width) / media.width;

  if (_x < height && !party) {
    height = _x;
  }

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) {
        return;
      }
      const player = (playerRef.current = videojs(
        videoElement,
        {
          autoplay: true,
          // muted: true,
          controls: true,
          nativeControlsForTouch: true,
          width: width,
          height: height,
          poster: media.image,
          playsInline: true,
          responsive: true,
          // fluid: true,
          playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
          tracks: media.subtitle
            ? [
                {
                  src: media.subtitle.vtt,
                  kind: "captions",
                  srclang: media.subtitle.language,
                  label: media.subtitle.label,
                  default: true,
                },
              ]
            : [],
          sources: [
            {
              src: media.media,
              type: "video/mp4",
            },
          ],
        },
        () => {}
      ));
      if (media.progress) {
        if (media.duration - 60 > media.progress.time) {
          player.volume(media.progress.volume);
          player.playbackRate(media.progress.speed);
          player.currentTime(media.progress.time);
        }
      } else {
        player.playbackRate(1.25);
      }
      player.play();
      player.on("ended", async () => {
        const token = storage.getItem("token");
        const response = await api.saveProgress(token, media.hash, "true");
        if (media.next && response && !party) {
          window.location = `/${media.path}/${media.next.hash}`;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, width, height]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerRef]);

  const saveProgress = async (e) => {
    if (
      playerRef.current.currentTime() > 0 &&
      !document.querySelector("video").paused
    ) {
      const token = storage.getItem("token");

      await api.saveProgress(
        token,
        media.hash,
        null,
        playerRef.current.currentTime(),
        playerRef.current.volume(),
        playerRef.current.playbackRate()
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(saveProgress, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder style={{ width: width, height: height }}>
      {media.next && !party && (
        <NextEpisode className="navigation">
          {/* <Preview
            style={{ backgroundImage: `url(${media.next.image})`, right: 0 }}
          >
            {media.next.name}
          </Preview> */}
          <Button
            type="primary"
            size={"large"}
            icon={<CaretRightOutlined />}
            onClick={() => {
              window.location = `/${media.path}/${media.next.hash}`;
            }}
          >
            NEXT
          </Button>
        </NextEpisode>
      )}
      {media.previous && !party && (
        <PreviousEpisode className="navigation">
          {/* <Preview
            style={{ backgroundImage: `url(${media.previous.image})`, left: 0 }}
          >
            {media.previous.name}
          </Preview> */}
          <Button
            type="primary"
            size={"large"}
            icon={<CaretLeftOutlined />}
            onClick={() => {
              window.location = `/${media.path}/${media.previous.hash}`;
            }}
          >
            PREVIOUS
          </Button>
        </PreviousEpisode>
      )}
      <WatchlistHolder>
        <Watchlist initial={media.watchlist} size={24} hash={media.hash} />
      </WatchlistHolder>
      <div
        data-vjs-player
        style={{
          width: width,
          height: height,
        }}
      >
        <video ref={videoRef} className="video-js" />
      </div>
    </Holder>
  );
}
