import React, { useState } from "react";
import styled from "styled-components";

import Movie from "./movie";

const Holder = styled.div `
  overflow: hidden;
  position: relative;
`;

export default function Display({ movies, width, height }) {

    const [counter, setCounter] = useState(0);

    const next = () => {
        if (counter < movies.length - 1) {
            setCounter(counter + 1);
        }
    };

    const previous = () => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
    };

    const selected = (index) => {
        setCounter(index);
    }

    return <Holder style={{ height: `${height}px`, width: `${width}px` }}>
      {movies.map((movie, index) => {
        return <Movie key={index} index={index} movie={movie} counter={counter} height={height * 0.3} next={next} previous={previous} selected={selected} screen={width} />
      })}
  </Holder>;
}