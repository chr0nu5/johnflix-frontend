import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { Slider, Dropdown } from "antd";
import {
  PauseOutlined,
  CaretRightOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExpandOutlined,
  CompressOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import Api from "../libs/api";

const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 0;
`;

const Controls = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 1;
  transition: all 0.5s;
`;

const ControlsHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

const ControlBlock = styled.div`
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

const ControlBlockButton = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 40px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  border-radius: 6px;
  margin-left: 16px;
`;

const PlayPauseButton = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ProgressHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
`;

const ProgressBar = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressCurrent = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-align: center;
`;

const ProgressRemaining = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-align: center;
`;

const ProgressBarBg = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  cursor: pointer;
`;

const ProgressBarCurrent = styled.div`
  height: 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  z-index: 1;
  position: absolute;
  left: 0px;
  top: 0px;
`;

const TitleHolder = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 200px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.2) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 2;
  display: flex;
  align-items: start;
  justify-content: space-between;
  transition: all 0.5s;
`;

const Title = styled.div`
  font-size: 48px;
  font-family: "Anton", serif;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 32px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const BackButton = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100px;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const Subtitle = styled.div`
  text-align: center;
  position: absolute;
  bottom: 156px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  left: 50%;
  transform: translate(-50%, 0%);
  padding: 8px 16px;
  pointer-events: none;
  max-width: 50%;
  transition: all 0.5s;

  span {
    display: block;
    font-size: 24px;
  }
`;

export default function Player() {
  const api = Api();
  const { hash } = useParams();
  const navigate = useNavigate();

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  // const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState();

  // video

  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const [currentTime, setCurrentTime] = useState(null);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);

  const fullScreenElement = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [fillScreen, setFillScreen] = useState(false);

  const [subtitle, setSubtitle] = useState([]);
  const [subtitleLine, setSubtitleLine] = useState("");

  const controlsTimeout = useRef(null);
  useEffect(() => {
    if (!isPlaying) {
      setControlsVisible(true);
      return;
    }

    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);

    controlsTimeout.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);

    if (isPlaying) {
      controlsTimeout.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    }
  };

  const playPauseAction = () => {
    if (!videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const changeCurrentTime = (event) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const width = rect.width;
      const percent = clickX / width;
      setCurrentTime(duration * percent);
      videoRef.current.currentTime = duration * percent;
    }
  };

  const changeVolume = (volume) => {
    videoRef.current.volume = volume;
    setVolume(volume);
  };

  const displayVolume = (volume) => {
    return `${parseInt(volume * 100)}%`;
  };

  const sec2Time = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const min = Math.floor((sec % 3600) / 60);
    const secRemain = Math.floor(sec % 60);
    return `${hrs.toString().padStart(2, "0")}:${min
      .toString()
      .padStart(2, "0")}:${secRemain.toString().padStart(2, "0")}`;
  };

  const getSubtitleForTime = (_currentTime) => {
    const _subtitle = subtitle.find(
      (sub) => _currentTime >= sub.startTime && _currentTime <= sub.endTime
    );
    return _subtitle ? _subtitle.text : "";
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    videoRef.current.volume = 1;
    setVolume(1);

    const updateTime = () => {
      setCurrentTime(videoRef.current.currentTime);

      const _subtitleLine = getSubtitleForTime(videoRef.current.currentTime);
      setSubtitleLine(_subtitleLine);

      if (videoRef.current.paused) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    };
    const updateDuration = () => setDuration(video.duration);
    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media, subtitle]);

  const cleanSubtitleText = (text) => {
    return text.replace(/[^a-zA-Z0-9À-ÿ.,!?;:'"(){}\]\s-]/g, "").trim();
  };

  const parseSubtitle = (subtitleText) => {
    const _regex =
      /(\d{2}):(\d{2}):(\d{2})[.,](\d{3}) --> (\d{2}):(\d{2}):(\d{2})[.,](\d{3})/;
    return subtitleText
      .trim()
      .split(/\n\n+/)
      .map((block) => {
        const lines = block.split("\n");
        let timeLine = null;
        let text = [];

        for (let line of lines) {
          const timeMatch = line.match(_regex);

          if (timeMatch) {
            timeLine = line;
            break;
          }
        }

        if (timeLine) {
          const timeMatch = timeLine.match(_regex);
          const startTime =
            parseInt(timeMatch[1]) * 3600 +
            parseInt(timeMatch[2]) * 60 +
            parseInt(timeMatch[3]) +
            parseInt(timeMatch[4]) / 1000;

          const endTime =
            parseInt(timeMatch[5]) * 3600 +
            parseInt(timeMatch[6]) * 60 +
            parseInt(timeMatch[7]) +
            parseInt(timeMatch[8]) / 1000;

          text = lines.slice(lines.indexOf(timeLine) + 1).join("\n");
          return { startTime, endTime, text: cleanSubtitleText(text) };
        }
        return null;
      })
      .filter(Boolean);
  };

  const formatTextWithBreaks = (text) => {
    return text
      .split("\n")
      .map((line, index) => <span key={index}>{line}</span>);
  };

  const downloadSubtitle = async (url) => {
    const response = await api.getSubtitle(media.subtitle.vtt);
    const _subtitle = parseSubtitle(response);
    setSubtitle(_subtitle);
  };

  useEffect(() => {
    if (media) {
      videoRef.current.currentTime = media.progress;
      setCurrentTime(media.progress);

      if (media.subtitle && media.subtitle.vtt) {
        downloadSubtitle(media.subtitle.vtt);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media]);

  const [currentPlaybackRate, setCurrentPlaybackRate] = useState(1);
  const playbackRate = [
    {
      key: "5",
      label: "2x",
    },
    {
      key: "4",
      label: "1.75x",
    },
    {
      key: "3",
      label: "1.5x",
    },
    {
      key: "2",
      label: "1.25x",
    },
    {
      key: "1",
      label: "1x",
    },
  ];

  const changePlaybackRate = (data) => {
    const selected = parseInt(data.key);
    const values = [0, 1, 1.25, 1.5, 1.75, 2];
    const finalPlaybackRate = values[selected];
    videoRef.current.playbackRate = finalPlaybackRate;
    setCurrentPlaybackRate(`${finalPlaybackRate}`);
  };

  const changeFillScreen = () => {
    if (fillScreen) {
      setFillScreen(false);
    } else {
      setFillScreen(true);
    }
  };

  const changeFullScreen = () => {
    if (!document.fullscreenElement) {
      fullScreenElement.current
        .requestFullscreen()
        .then(() => setFullScreen(true));
    } else {
      document.exitFullscreen().then(() => setFullScreen(false));
    }
  };

  // end video

  const getMedia = async () => {
    const response = await api.getMovie(hash);
    setMedia(response.results[0]);
  };

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

  const goHome = () => {
    navigate("/");
  };

  return (
    <Holder
      style={{ width: width, height: height }}
      ref={fullScreenElement}
      onMouseMove={handleMouseMove}>
      {media && (
        <>
          <TitleHolder style={{ opacity: controlsVisible ? 1 : 0 }}>
            <BackButton onClick={goHome}>
              <ArrowLeftOutlined />
            </BackButton>
            <Title style={{ width: width - 100 }}>{media.title}</Title>
          </TitleHolder>
          {subtitleLine && subtitleLine.length > 0 ? (
            <Subtitle style={{ bottom: controlsVisible ? 156 : 24 }}>
              {formatTextWithBreaks(subtitleLine)}
            </Subtitle>
          ) : (
            <></>
          )}
          <Controls
            style={{ width: width - 48, opacity: controlsVisible ? 1 : 0 }}>
            <ControlsHolder>
              <ControlBlock className="left">
                <Slider
                  min={0}
                  max={1}
                  defaultValue={volume}
                  step={0.01}
                  style={{ width: "50%" }}
                  tooltip={{ formatter: displayVolume }}
                  onChange={changeVolume}
                />
              </ControlBlock>
              <ControlBlock>
                <PlayPauseButton onClick={playPauseAction}>
                  {isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
                </PlayPauseButton>
              </ControlBlock>
              <ControlBlock className="right">
                <ControlBlockButton>CC</ControlBlockButton>
                <Dropdown
                  placement="top"
                  menu={{
                    items: playbackRate,
                    selectable: true,
                    defaultSelectedKeys: ["1"],
                    onClick: changePlaybackRate,
                  }}>
                  <ControlBlockButton>
                    {currentPlaybackRate}x
                  </ControlBlockButton>
                </Dropdown>
                <ControlBlockButton onClick={changeFillScreen}>
                  {fillScreen ? (
                    <FullscreenExitOutlined />
                  ) : (
                    <FullscreenOutlined />
                  )}
                </ControlBlockButton>
                <ControlBlockButton onClick={changeFullScreen}>
                  {fullScreen ? <CompressOutlined /> : <ExpandOutlined />}
                </ControlBlockButton>
              </ControlBlock>
            </ControlsHolder>
            <ProgressHolder>
              <ProgressCurrent>{sec2Time(currentTime)}</ProgressCurrent>
              <ProgressBar style={{ width: width - 248 }}>
                <ProgressBarBg onClick={changeCurrentTime} ref={progressBarRef}>
                  <ProgressBarCurrent
                    style={{
                      width: `${(currentTime / duration) * 100}%`,
                    }}></ProgressBarCurrent>
                </ProgressBarBg>
              </ProgressBar>
              <ProgressRemaining>
                {sec2Time(duration - currentTime)}
              </ProgressRemaining>
            </ProgressHolder>
          </Controls>
          <Video
            autoPlay
            ref={videoRef}
            preload="auto"
            poster={media.cover}
            style={{ objectFit: fillScreen ? "cover" : "contain" }}
            onClick={playPauseAction}>
            <source src={media.media} type="video/mp4" />
          </Video>
        </>
      )}
    </Holder>
  );
}
