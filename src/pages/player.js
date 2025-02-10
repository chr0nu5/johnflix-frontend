import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { Slider, Dropdown } from "antd";
import {
    PauseOutlined,
    CaretRightOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    ExpandOutlined,
    CompressOutlined
} from '@ant-design/icons';

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

const ControlBlock = styled.div `
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.right {
    justify-content: end;
    padding-right: 24px;
  }
  &.left {
    justify-content: start;
    padding-left: 24px;
  }
`;

const ControlBlockButton = styled.div `
  border: 1px solid rgba(255,255,255,0.5);
  width: 40px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: rgba(255,255,255,1);
  cursor: pointer;
  border-radius: 6px;
  margin-left: 16px;
`;

const PlayPauseButton = styled.div `
    width: 24px;
    height: 24px;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
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

    // const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState();

    // video

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [currentTime, setCurrentTime] = useState(null);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);

    const fullScreenElement = useRef(null);
    const [fullScreen, setFullScreen] = useState(false);
    const [fillScreen, setFillScreen] = useState(false);


    const playPauseAction = () => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    }

    const changeCurrentTime = (time) => {
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    }

    const changeVolume = (volume) => {
        videoRef.current.volume = volume;
        setVolume(volume);
    }

    const displayVolume = (volume) => {
        return `${parseInt(volume*100)}%`;
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

        videoRef.current.volume = 1;
        setVolume(1);

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
            videoRef.current.currentTime = media.progress
            setCurrentTime(media.progress)
        }
    }, [media]);

    const [currentPlaybackRate, setCurrentPlaybackRate] = useState(1);
    const playbackRate = [{
            key: '5',
            label: '2x'
        },
        {
            key: '4',
            label: '1.75x'
        },
        {
            key: '3',
            label: '1.5x'
        },
        {
            key: '2',
            label: '1.25x'
        },
        {
            key: '1',
            label: '1x'
        }
    ];

    const changePlaybackRate = (data) => {
        const selected = parseInt(data.key);
        const values = [0, 1, 1.25, 1.5, 1.75, 1.75, 2];
        const finalPlaybackRate = values[selected];
        videoRef.current.playbackRate = finalPlaybackRate;
        setCurrentPlaybackRate(`${finalPlaybackRate}`);
    }

    const changeFillScreen = () => {
        if (fillScreen) {
            setFillScreen(false);
        } else {
            setFillScreen(true)
        }
    }

    const changeFullScreen = () => {
        if (!document.fullscreenElement) {
            fullScreenElement.current.requestFullscreen().then(() => setFullScreen(true));
        } else {
            document.exitFullscreen().then(() => setFullScreen(false));
        }
    }

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

    return <Holder style={{width: width, height: height}} ref={fullScreenElement}>
      {media && <>
        <Controls style={{width: width - 48}}>
          <ControlsHolder>
            <ControlBlock className="left">
              <Slider
                min={0}
                max={1}
                defaultValue={volume}
                step={0.01}
                style={{width: "50%"}}
                tooltip={{ formatter: displayVolume }}
                onChange={changeVolume}
              />
            </ControlBlock>
            <ControlBlock>
              <PlayPauseButton onClick={playPauseAction}>
                {isPlaying ? <PauseOutlined /> : <CaretRightOutlined /> }
              </PlayPauseButton>
            </ControlBlock>
            <ControlBlock className="right">
              <ControlBlockButton>CC</ControlBlockButton>
              <Dropdown
                placement="top"
                menu={{
                  items: playbackRate,
                  selectable: true,
                  defaultSelectedKeys: ['1'],
                  onClick: changePlaybackRate
                }}
              >
                <ControlBlockButton>{currentPlaybackRate}x</ControlBlockButton>
              </Dropdown>
              <ControlBlockButton onClick={changeFillScreen}>
                {fillScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              </ControlBlockButton>
              <ControlBlockButton onClick={changeFullScreen}>
                {fullScreen ? <CompressOutlined /> : <ExpandOutlined />}
              </ControlBlockButton>
            </ControlBlock>
          </ControlsHolder>
          <ProgressHolder>
            <ProgressCurrent>{sec2Time(currentTime)}</ProgressCurrent>
            <ProgressBar style={{width: width - 248}}>
              {currentTime && <Slider
                min={0}
                max={duration}
                defaultValue={currentTime}
                style={{width: "100%"}}
                tooltip={{ formatter: sec2Time }}
                onChangeComplete={changeCurrentTime}
              />}
            </ProgressBar>
            <ProgressRemaining>{sec2Time(duration - currentTime)}</ProgressRemaining>
          </ProgressHolder>
        </Controls>
        <Video ref={videoRef} preload="auto" poster={media.cover} style={{objectFit: fillScreen ? "cover" : "contain"}}>
          <source src={media.media} type="video/mp4" />
        </Video>
      </>}
    </Holder>;
}