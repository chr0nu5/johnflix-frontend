import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { Slider } from "antd";

import Api from "../libs/api";

const Holder = styled.div `
  position: relative;
  width: 100%;
  height: 100%;
`;

const Video = styled.video `
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: transparent;
  z-index: 0;
`;

const Controls = styled.div `
    position: absolute;
    left: 24px;
    bottom: 24px;
    border-radius: 16px;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(10px);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ControlsHolder = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

const ProgressHolder = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-top: 2px solid rgba(255,255,255,0.1);
`;

const ProgressBar = styled.div `
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProgressCurrent = styled.div `
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-align: center;
`

const ProgressRemaining = styled.div `
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-align: center;
`

export default function Player() {

    const api = Api();
    const { hash } = useParams();

    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState();

    // video

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);




    const changeCurrentTime = (time) => {
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    }

    const sec2Time = (sec) => {
        const hrs = Math.floor(sec / 3600);
        const min = Math.floor((sec % 3600) / 60);
        const secRemain = Math.floor(sec % 60);
        return `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secRemain.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);
        video.addEventListener("timeupdate", updateTime);
        video.addEventListener("loadedmetadata", updateDuration);
        return () => {
            video.removeEventListener("timeupdate", updateTime);
            video.removeEventListener("loadedmetadata", updateDuration);
        };
    }, [media]);

    useEffect(() => {
        if (media) {
            setCurrentTime(media.progress)
        }
    }, [media]);

    // end video

    const getMedia = async () => {
        const response = await api.getMovie(hash);
        setMedia(response.results[0])
    }

    function handleWindowSizeChange() {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        window.addEventListener("load", handleWindowSizeChange);
    }, []);

    useEffect(() => {
        getMedia();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hash]);

    return <Holder style={{width: width, height: height}}>
      {media && <>
        <Controls style={{width: width - 48}}>
          <ControlsHolder></ControlsHolder>
          <ProgressHolder>
            <ProgressCurrent>{sec2Time(currentTime)}</ProgressCurrent>
            <ProgressBar style={{width: width - 248}}>
              <Slider
                min={0}
                max={duration}
                defaultValue={currentTime}
                style={{width: "100%"}}
                tooltip={{ formatter: sec2Time }}
                onChangeComplete={setCurrentTime}
              />
            </ProgressBar>
            <ProgressRemaining>{sec2Time(duration - currentTime)}</ProgressRemaining>
          </ProgressHolder>
        </Controls>
        <Video ref={videoRef} preload="auto" poster={media.cover}>
          <source src={media.media} type="video/mp4" />
        </Video>
      </>}
    </Holder>;
}