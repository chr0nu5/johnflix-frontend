import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Api from "../libs/api";

import Display from "../components/display/display";

const Holder = styled.div `
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
  }
`;



export default function Home() {

    const api = Api();

    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }

    const [movies, setMovies] = useState([]);

    const getRecommended = async () => {
        const data = await api.getMovies();
        if (data.results) {
            setMovies(data.results)
        } else {
            setMovies(data);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        window.addEventListener("load", handleWindowSizeChange);
    }, []);

    useEffect(() => {
        getRecommended();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Holder>
    <Display movies={movies} width={width} height={height} />
  </Holder>;
}