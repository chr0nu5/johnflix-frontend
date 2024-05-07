import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Tag } from "antd";
import Helper from "../libs/helper";
import Api from "../libs/api";
import Storage from "../libs/storage";
import Slider from "./slider";
import Page from "./page";
// import List from "./list";

const Holder = styled.div`
  position: relative;
`;

const Title = styled.div`
  font-size: 32px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Data = styled.div`
  &.spaced {
    padding-top: 16px;
  }
`;

const Link = styled.a`
  cursor: pointer;
`;

const Clear = styled.div`
  clear: both;
`;

export default function VideoData({ media, width, height }) {
  const helper = Helper();
  const navigate = useNavigate();
  const api = Api();
  const storage = Storage();

  const [recommended, setRecommended] = useState();
  const [genres, setGenres] = useState();
  const [tags, setTags] = useState();

  const getData = async () => {
    const token = storage.getItem("token");
    const response = await api.getRecommended(token, media.hash);
    if (response && response.items.length > 0) {
      setRecommended({
        title: "You might like:",
        list: response.items,
      });
    }

    if (media.genres && media.genres.length > 0) {
      setGenres({
        title: "Genres:",
        list: media.genres.map((genre) => {
          return {
            hash: genre.hash,
            image: genre.image,
            title: genre.name,
            path: "genre",
          };
        }),
      });
    }

    if (media.tags && media.tags.length > 0) {
      setTags({
        title: "Tags:",
        list: media.tags.map((tag) => {
          return {
            hash: tag.hash,
            image: tag.image,
            title: tag.name,
            path: "tag",
          };
        }),
      });
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder style={{ width: width }}>
      <Page>
        <Title>
          {media.season ? `${media.season}: ` : ""}
          {media.title}
        </Title>
        <Data className="spaced">
          {media.views > 0 && (
            <Tag bordered color="warning" style={{ fontSize: 16 }}>
              {media.views} view(s)
            </Tag>
          )}
          {media.date && (
            <Tag bordered color="blue" style={{ fontSize: 16 }}>
              {media.date.substring(0, 4)}
            </Tag>
          )}
          {media.duration && (
            <Tag bordered color="error" style={{ fontSize: 16 }}>
              {helper.secondsToHm(media.duration)}
            </Tag>
          )}
          {media.genres.map((genre, index) => {
            return (
              <Link
                key={`genre-${index}`}
                onClick={() => {
                  navigate(`/genre/${genre.hash}`);
                }}
              >
                <Tag bordered color="success" style={{ fontSize: 16 }}>
                  {genre.name}
                </Tag>
              </Link>
            );
          })}
          {media.tags.map((tag, index) => {
            return (
              <Link
                key={`tag-${index}`}
                onClick={() => {
                  navigate(`/tag/${tag.hash}`);
                }}
              >
                <Tag bordered color="blue" style={{ fontSize: 16 }}>
                  {tag.name}
                </Tag>
              </Link>
            );
          })}
        </Data>
      </Page>
      {recommended && (
        <Data className="spaced">
          <Slider title={recommended.title} items={recommended.list} />
        </Data>
      )}
      {genres && (
        <Data className="spaced">
          <Slider title={genres.title} items={genres.list} />
          <Clear />
        </Data>
      )}
      {tags && (
        <Data className="spaced">
          <Slider title={tags.title} items={tags.list} />
          <Clear />
        </Data>
      )}
    </Holder>
  );
}