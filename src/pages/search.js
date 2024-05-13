import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import Api from "../libs/api";
import Storage from "../libs/storage";
import Paginator from "../components/paginator";
import Menu from "../components/menu";
import Page from "../components/page";
import Wrapper from "../components/wrapper";

const Holder = styled.div`
  width: 100%;
  @media (max-width: 1024px) {
  }
`;

const Toolbar = styled.div`
  padding-top: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchIcon = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchField = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100px;
  padding: 16px;
  color: #fff;
  font-size: 32px;
  background: #000;
  border: none;
`;

const SearchFilter = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export default function Search() {
  const api = Api();
  const storage = Storage();

  const [data, setData] = useState([]);

  const [s, setS] = useState();
  const [t, setT] = useState([]);
  const [g, setG] = useState([]);

  const search = async () => {
    const token = storage.getItem("token");
    const response = await api.searchExtra(token, s, g, t);
    setData(response.items);
  };

  useEffect(() => {
    if (s || t.length > 0 || g.length > 0) {
      search();
    } else {
      setData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s, t, g]);

  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);

  const getData = async () => {
    const token = storage.getItem("token");
    let response = await api.getGenres(token, 0);
    let _genres = [];
    for (let i = 0; i < response.length; i++) {
      const _genre = response[i];
      _genres.push({
        label: _genre.title,
        value: _genre.hash,
      });
    }
    setGenres(_genres);
    response = await api.getTags(token, 0);
    let _tags = [];
    for (let i = 0; i < response.length; i++) {
      const _tag = response[i];
      _tags.push({
        label: _tag.title,
        value: _tag.hash,
      });
    }
    setTags(_tags);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeGenre = (value) => {
    setG(value);
  };
  const handleChangeTag = (value) => {
    setT(value);
  };

  let typingTimer;
  const doneTypingInterval = 1000;

  const handleChangeSearch = (e) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setS(e.target.value);
    }, doneTypingInterval);
  };

  return (
    <Wrapper>
      <Holder>
        <Menu hidden={0} />
        <Page>
          <Toolbar>
            <SearchIcon>
              <SearchOutlined style={{ fontSize: 40 }} />
            </SearchIcon>
            <SearchField>
              <SearchInput
                onChange={handleChangeSearch}
                placeholder={"Keywords"}
              />
            </SearchField>
            <SearchFilter>
              <Select
                size={"large"}
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Genres"
                defaultValue={g}
                onChange={handleChangeGenre}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                tokenSeparators={[","]}
                options={genres}
              />
            </SearchFilter>
            <SearchFilter>
              <Select
                size={"large"}
                allowClear
                style={{
                  width: "100%",
                }}
                mode="multiple"
                placeholder="Tags"
                defaultValue={t}
                onChange={handleChangeTag}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                tokenSeparators={[","]}
                options={tags}
              />
            </SearchFilter>
          </Toolbar>
        </Page>
        {data && data.length > 0 && (
          <Paginator
            title={""}
            items={data}
            totalPages={1}
            totalItems={40}
            callback={() => {}}
          />
        )}
      </Holder>
    </Wrapper>
  );
}
