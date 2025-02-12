import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Holder = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;

  width: 100%;
  height: 80px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;

  img {
    height: 50px;
    cursor: pointer;
  }
`;
const Items = styled.div``;
const User = styled.div``;

export default function Menu() {
  const navigate = useNavigate();

  return (
    <Holder>
      <Logo onClick={() => navigate("/")}>
        <img src="/img/icon.png" alt="JohnFLIX" />
      </Logo>
      <Items></Items>
      <User></User>
    </Holder>
  );
}
