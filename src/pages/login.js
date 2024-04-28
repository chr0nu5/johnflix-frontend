import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";

import Api from "../libs/api";
import Storage from "../libs/storage";

const Holder = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-image: url(/img/bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

const LoginHolder = styled.div`
  background: rgba(0, 0, 0, 0.8);
  width: 400px;
  max-width: 100%;
  padding: 24px;
  border-radius: 8px;
`;

const LoginLogo = styled.div`
  position: absolute;
  left: 24px;
  top: 24px;
`;

const LoginTitle = styled.div`
  font-size: 32px;
  margin-bottom: 24px;
`;

const Field = styled.div`
  width: 100%;
  margin-bottom: 24px;

  &.last {
    margin-bottom: 0px;
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const api = Api();
  const storage = Storage();

  const [loading, setLoading] = useState(false);

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [_api, contextHolder] = notification.useNotification();
  const showNotification = (type, title, text) => {
    _api[type]({
      message: title,
      description: text,
    });
  };

  const login = async () => {
    if (!username || !password) {
      showNotification(
        "error",
        "Ops!",
        "Both username and password are required"
      );
    } else {
      setLoading(true);
      const token = await api.login(username, password);
      setLoading(false);
      setUserName(null);
      setPassword(null);

      storage.removeItem("token");

      if (token.error) {
        showNotification("error", "Ops!", "Invalid username or password");
      } else {
        if (token.token) {
          showNotification("success", ":)", "Welcome!");
          storage.saveItem("token", token.token);
          navigate("/");
        } else {
          showNotification("error", "Ops!", "Invalid username or password");
        }
      }
    }
  };

  const isLoggedIn = async () => {
    const token = storage.getItem("token");
    console.log(token);
    if (token) {
      const user = await api.getProfile(token);
      if (user.username) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    isLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Holder>
      {contextHolder}
      <Overlay>
        <LoginLogo>
          <img src="/img/logo.png" height="50" alt="Logo" />
        </LoginLogo>
        <LoginHolder>
          <LoginTitle>Sign In</LoginTitle>
          <Field>
            <Input
              value={username}
              autoComplete="none"
              autoCorrect="none"
              autoCapitalize="none"
              size="large"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Field>
          <Field>
            <Input.Password
              value={password}
              autoComplete="none"
              autoCorrect="none"
              autoCapitalize="none"
              size="large"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field className="last">
            <Button
              size="large"
              type="primary"
              loading={loading}
              block
              onClick={!loading ? login : () => {}}
            >
              {loading ? "Wait" : "Sign In"}
            </Button>
          </Field>
        </LoginHolder>
      </Overlay>
    </Holder>
  );
}
