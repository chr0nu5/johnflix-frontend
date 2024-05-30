import React from "react";
import styled from "styled-components";

import Page from "./page";
import Item from "./item";

const Holder = styled.div`
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 90%
  );
  width: 100%;
  overflow-x: scroll;
  height: 300px;

  &.list {
    overflow: auto;
    height: auto;
  }
`;

const ContentHolder = styled.div`
  width: 100%;
  height: 300px;

  &.list {
    height: auto;
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
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  height: 230px;

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

export default function Slider({
  isList,
  title,
  items,
  spaceTop,
  link,
  linkText,
}) {
  return (
    items && (
      <Holder style={{ marginTop: spaceTop }} className={isList ? "list" : ""}>
        <ContentHolder className={isList ? "list" : ""}>
          <Page>
            <Title>
              {title}{" "}
              {link ? (
                <>
                  <a href={link}>({linkText})</a>
                </>
              ) : (
                <></>
              )}
            </Title>
            <ElementHolder className={isList ? "list" : ""}>
              {items.map((item) => {
                return (
                  <Element className={isList ? "list" : ""}>
                    <Item item={item} />
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
          </Page>
        </ContentHolder>
      </Holder>
    )
  );
}
