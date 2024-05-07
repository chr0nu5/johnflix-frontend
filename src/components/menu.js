import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

import Page from "./page";

import Api from "../libs/api";
import Storage from "../libs/storage";
import Helper from "../libs/helper";

const Holder = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 10%,
    transparent
  );
  z-index: 99;
  transition: 1s;

  &.black {
    background: rgba(0, 0, 0, 0.9);
  }

  @media (max-width: 1024px) {
  }
`;

const Logo = styled.div`
  span {
    transition: 0.5s;

    &:hover {
      opacity: 0.8;
    }

    img {
      height: 25px;
      margin-right: 24px;

      @media (max-width: 1024px) {
        margin-right: 0px;
      }
    }
  }
`;

const MenuHolder = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuItem = styled.a`
  display: block;
  margin: 0px 16px;
  width: fit-content;
  text-decoration: none;
  white-space: nowrap;
  transition: 0.5s;

  &:hover {
    opacity: 0.8;
  }
`;

const Profile = styled.div`
  img {
    height: 25px;
    margin-left: 24px;
  }
`;

const Notification = styled.div`
  margin-left: 24px;
`;

const Search = styled.div`
  margin-left: 24px;

  a {
    transition: 0.5s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const NotificationItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0px 0px 0px;
  transition: 0.5s;

  &:hover {
    opacity: 0.6;
  }
`;

const NotificationItemImage = styled.div`
  width: 112px;
  height: 63px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 64px;
    height: 35px;
  }
`;

const NotificationItemTitle = styled.div`
  width: 100%;
  padding: 0px 0px 0px 8px;

  span {
    font-size: 12px;
  }
`;

const MenuSpacer = styled.div`
  width: 100%;
`;

const MenuItemProfile = styled.a`
  font-weight: 700;
  display: block;
  margin-top: 16px;
`;

export default function Menu({ hidden }) {
  const api = Api();
  const storage = Storage();
  const helper = Helper();
  const navigate = useNavigate();

  const logout = () => {
    storage.removeItem("token");
    navigate("/login");
  };

  const [menuItems, setMenuItems] = useState([]);
  const [latest, setLatest] = useState([]);

  const getData = async () => {
    const token = storage.getItem("token");
    const menu = await api.getContents(token);
    setMenuItems(menu);

    const latest = await api.getLatest(token, "movies", hidden);
    setLatest(latest);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [black, setBlack] = useState(false);

  function handleWindowScroll() {
    if (window.scrollY > 0) {
      setBlack(true);
    } else {
      setBlack(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <Holder className={black ? "black" : ""}>
      <Page>
        <MenuHolder>
          <Logo>
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              <img src="/img/logo.png" alt="JohnFLIX" className="desktop" />
              <img src="/img/icon.png" alt="JohnFLIX" className="mobile" />
            </span>
          </Logo>
          <Popover
            content={
              <>
                {menuItems.map((menuItem) => {
                  return (
                    <MenuItem
                      href={"#"}
                      onClick={() => {
                        navigate(`/${menuItem.path}/${menuItem.hash}`);
                      }}
                      style={{ color: "#fff" }}
                    >
                      {menuItem.title}
                    </MenuItem>
                  );
                })}
              </>
            }
          >
            <MenuItem className="mobile" href={`#`}>
              Browse
            </MenuItem>
          </Popover>
          {menuItems.map((menuItem) => {
            return (
              <MenuItem
                className="desktop"
                href={"#"}
                onClick={() => {
                  navigate(`/${menuItem.path}/${menuItem.hash}`);
                }}
              >
                {menuItem.title}
              </MenuItem>
            );
          })}
          <MenuSpacer />
          <Search>
            <a href="/search">
              <SearchOutlined />
            </a>
          </Search>
          <Notification>
            <Popover
              content={
                <>
                  {latest.map((movie) => {
                    return (
                      <NotificationItem href={`/${movie.path}/${movie.hash}`}>
                        <NotificationItemImage
                          style={{ backgroundImage: `url(${movie.image})` }}
                        ></NotificationItemImage>
                        <NotificationItemTitle>
                          <strong>{movie.title}</strong>,{" "}
                          {movie.subtitle ? `${movie.subtitle}, ` : ``}
                          <span>({helper.secondsToHm(movie.duration)})</span>
                        </NotificationItemTitle>
                      </NotificationItem>
                    );
                  })}
                </>
              }
              title="Updates"
              trigger="hover"
            >
              <BellOutlined />
            </Popover>
          </Notification>
          <Profile>
            <Popover
              content={
                <>
                  <MenuItemProfile href="/watchlist">WatchList</MenuItemProfile>
                  <MenuItemProfile onClick={logout}>Logout</MenuItemProfile>
                </>
              }
              title="Profile"
              trigger="hover"
            >
              <UserOutlined style={{ marginLeft: 24 }} />
            </Popover>
          </Profile>
        </MenuHolder>
      </Page>
    </Holder>
  );
}
