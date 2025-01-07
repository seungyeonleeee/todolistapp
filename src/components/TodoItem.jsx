import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TodoContext } from "../App";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 12px 10px 10px;
  margin: 5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
`;
const CheckBox = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  overflow: hidden;
  input {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 1px solid ${({ theme }) => theme.grayColor};
    border-radius: 50%;
    transition: all 0.3s;
    cursor: pointer;
    &:checked {
      background: ${({ theme }) => theme.accentColor};
      border: 1px solid transparent;
      &:after {
        content: "";
        border: 2px solid ${({ theme }) => theme.subBgColor};
        border-top: none;
        border-right: none;
        height: 6px;
        left: 7px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -80%) rotate(-45deg);
        width: 12px;
      }
    }
  }
`;
const TodoText = styled.div`
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  gap: 4px;
  h4 {
    color: ${({ theme }) => theme.textColor};
  }
  span {
    font: normal 12px/1 "Montserrat";
    color: ${({ theme }) => theme.grayColor};
  }
`;
const DeleteBtn = styled.button`
  width: 22px;
  height: 22px;
  svg {
    stroke: ${({ theme }) => theme.grayColor};
    transition: stroke 0.3s;
  }
  &:hover,
  &:active {
    svg {
      stroke: ${({ theme }) => theme.accentColor};
    }
  }
`;

const TodoItem = ({ id, isDone, content, createdDate }) => {
  const { onUpdate, onDelete } = useContext(TodoContext);

  const onChangeCheckbox = () => {
    onUpdate(id);
  };
  const onClickDelete = () => {
    onDelete(id);
  };

  return (
    <Wrapper>
      <CheckBox>
        <input checked={isDone} type="checkbox" onChange={onChangeCheckbox} />
      </CheckBox>
      <TodoText>
        <h4>{content}</h4>
        <span>{new Date(createdDate).toLocaleDateString()}</span>
      </TodoText>
      <DeleteBtn onClick={onClickDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </DeleteBtn>
    </Wrapper>
  );
};
export default React.memo(TodoItem);
