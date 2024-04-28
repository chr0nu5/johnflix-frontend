import React from "react";
import styled from "styled-components";
import Page from "./page";

const Holder = styled.div`
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 90%
  );
  width: 100%;
  overflow-x: scroll;
  height: 300px;
`;

const ContentHolder = styled.div`
  width: 100%;
  height: 300px;
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

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
`;

const Element = styled.div`
  flex: 0 0 auto;
  width: 20%;
  height: 230px;
  position: relative;
  z-index: 0;

  &:hover {
    z-index: 1;
  }

  @media (max-width: 1536px) {
    width: 33.33333333333333%;
  }

  @media (max-width: 1024px) {
    width: 50%;
  }
`;

const Progress = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 8px;
  height: 4px;
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
  height: 4px;
  background-color: #e50914;
`;

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
`;

export default function Slider({ title, items, spaceTop }) {
  return (
    items && (
      <Holder style={{ marginTop: spaceTop }}>
        <ContentHolder>
          <Page>
            <Title>{title}</Title>
            <ElementHolder>
              {items.map((item) => {
                return (
                  <Element>
                    <ElementContent
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></ElementContent>
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
