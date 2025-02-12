import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Api from "../libs/api";

import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Dropdown } from "antd";

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

const Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  gap: 24px;
  padding-left: 16px;
  padding-top: 8px;

  span {
    font-weight: bold;
    cursor: pointer;
    display: block;
    font-family: "Anton", serif;
    font-weight: 200;
    letter-spacing: 1px;

    &:hover {
      color: #ed2517;
    }
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;

export default function Menu() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
    if (key === "2") {
      navigate("/watchlist");
    } else if (key === "3") {
      logout();
    }
  };

  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const api = Api();

  const getProfile = async () => {
    const response = await api.getProfile();
    setUser(response);
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder>
      <Logo onClick={() => navigate("/")}>
        <img src="/img/icon.png" alt="JohnFLIX" />
      </Logo>
      <Items>
        {user &&
          user.menu &&
          user.menu.map((item, index) => {
            return (
              <span
                onClick={() => {
                  navigate(`/${item.url}`);
                }}
                key={index}>
                {item.name}
              </span>
            );
          })}
      </Items>
      <User>
        <Dropdown
          menu={{
            items: [
              {
                label: "My Watchlist",
                key: "2",
              },
              {
                label: "Logout",
                key: "3",
              },
            ],
            onClick,
          }}>
          <Avatar style={{ borderColor: "#fff" }} icon={<UserOutlined />} />
        </Dropdown>
      </User>
    </Holder>
  );
}
