import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { TodoContext } from "../App";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 10px;
  background: ${({ theme }) => theme.subBgColor};
`;
const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  svg {
    width: 30px;
    height: 30px;
    fill: ${({ theme }) => theme.accentColor};
  }
  h3 {
    font-size: 20px;
    margin-top: 5px;
  }
`;
const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  input {
    padding: 5px 10px;
    font: normal 18px/1 "GmarketSans";
    color: ${({ theme }) => theme.textColor};
    border-bottom: 1px solid ${({ theme }) => theme.grayColor};
    transition: all 0.3s;
    &:focus {
      border-bottom: 1px solid ${({ theme }) => theme.accentColor};
    }
  }
  button {
    width: 35px;
    height: 35px;
    svg {
      stroke: ${({ theme }) => theme.textColor};
      transition: stroke 0.3s;
    }
    &:hover,
    &:active {
      svg {
        stroke: ${({ theme }) => theme.accentColor};
      }
    }
  }
`;

const TodoEditor = () => {
  const { onCreate } = useContext(TodoContext);
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) onSubmit();
  };

  const onSubmit = () => {
    if (!content) {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  return (
    <Wrapper>
      <TitleGroup>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        <h3>새로운 To Do 작성하기</h3>
      </TitleGroup>
      <InputGroup>
        <input
          ref={inputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          placeholder="To Do를 작성하세요"
        />
        <button onClick={onSubmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </InputGroup>
    </Wrapper>
  );
};

export default TodoEditor;
