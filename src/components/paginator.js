import React from "react";
import styled from "styled-components";
import { Pagination } from "antd";

import ItemPaginator from "./item_paginator";

import Page from "./page";

const Holder = styled.div`
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 90%
  );
  width: 100%;
  overflow-x: scroll;
  /* height: 300px; */

  &.list {
    overflow: auto;
    /* height: auto; */
  }
`;

const ContentHolder = styled.div`
  width: 100%;
  padding-bottom: 56px;
  /* height: 300px; */

  &.list {
    /* height: auto; */
  }
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 16px;

  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);

  @media (max-width: 1280px) {
    font-size: 16px;
  }
`;

const ElementHolder = styled.div`
  /* display: flex; */
  /* flex-wrap: nowrap; */
  overflow-x: auto;
  width: 100%;
  /* height: 230px; */

  &.list {
    display: block;
    flex-wrap: inherit;
    overflow-x: auto;
    height: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
`;

const Element = styled.div`
  flex: 0 0 auto;
  width: 18%;
  height: 230px;
  position: relative;
  z-index: 0;
  transition: 0.5s;

  &.list {
    flex: auto;
    float: left;
    margin-bottom: 8px;
    width: 20%;
  }

  &:hover {
    z-index: 1;
  }

  @media (max-width: 1536px) {
    width: 30%;
    &.list {
      width: 33.333333333333333%;
    }
  }

  @media (max-width: 1024px) {
    width: 48%;
    &.list {
      width: 50%;
    }
  }
`;

const Progress = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 16px;
  height: 8px;
  z-index: 1;
  background-color: hsla(0, 0%, 100%, 0.3);
  overflow: hidden;
  border-radius: 10px;
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 50%;
  height: 8px;
  background-color: #e50914;
`;

const Paging = styled.div`
  padding-top: 40px;
`;

export default function Paginator({
  title,
  items,
  spaceTop,
  totalPages,
  totalItems,
  callback,
  gallery,
}) {
  return (
    items && (
      <Holder style={{ marginTop: spaceTop }} className={"list"}>
        <ContentHolder className={"list"}>
          <Page>
            <Title>{title}</Title>
            <ElementHolder className={"list"}>
              {items.map((item) => {
                return (
                  <Element
                    className={"list"}
                    style={{ height: gallery ? 460 : 230 }}
                  >
                    <ItemPaginator item={item} gallery={gallery} />
                    {item.time && (
                      <Progress>
                        <ProgressBar
                          style={{
                            width: `${(item.time / item.duration) * 100}%`,
                          }}
                        />
                      </Progress>
                    )}
                  </Element>
                );
              })}
            </ElementHolder>
            {totalPages && (
              <Paging>
                <Pagination
                  total={totalItems}
                  pageSize={40}
                  totalPages={totalPages}
                  hideOnSinglePage
                  onChange={callback}
                  showSizeChanger={false}
                />
              </Paging>
            )}
          </Page>
        </ContentHolder>
      </Holder>
    )
  );
}
