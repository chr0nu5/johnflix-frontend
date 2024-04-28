import React from "react";
import styled from "styled-components";

const Holder = styled.div`
  padding: 10px;
  @media (max-width: 768px) {
  }
`;

export default function Blank() {
  return <Holder></Holder>;
}
