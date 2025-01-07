import React, { useState, useMemo, useContext } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { TodoContext } from "../App";

const UlItem = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  li {
    display: flex;
    align-items: center;
    gap: 4px;
    font: normal 16px/1 "Montserrat";
    color: ${({ theme }) => theme.grayColor};
    &::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${({ theme }) => theme.grayColor};
    }
    span {
      font: normal 16px/1 "GmarketSans";
      color: ${({ theme }) => theme.textColor};
      margin-top: 4px;
    }
  }
`;
const InputItem = styled.div`
  width: 362px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 8px 0 5px;
  border-radius: 10px;
  background: ${({ theme }) => theme.subBgColor};
  margin-bottom: 20px;
  svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.grayColor};
    margin-bottom: 4px;
  }
  input {
    font: normal 14px/1 "GmarketSans";
    color: ${({ theme }) => theme.textColor};
    &:focus {
    }
  }
`;
const TodoArea = styled.div`
  height: 50vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
    width: 0px;
  }
`;
const TodoWrapper = styled.div`
  width: 362px;
  border-radius: 10px;
  background: ${({ theme }) => theme.subBgColor};
`;
const EmptyTodo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  svg {
    width: 50px;
    height: 50px;
    stroke: ${({ theme }) => theme.grayColor};
  }
  p {
    font: normal 20px/1 "Montserrat";
    color: ${({ theme }) => theme.grayColor};
  }
`;

const TodoList = () => {
  const { todo } = useContext(TodoContext);

  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearchResult = () => {
    return search === ""
      ? todo
      : todo.filter((item) =>
          item.content.toLowerCase().includes(search.toLocaleLowerCase())
        );
  };

  const analyzeTodo = useMemo(() => {
    const totalCount = todo.length;
    const doneCount = todo.filter((item) => item.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount };
  }, [todo]);
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;

  return (
    <>
      <UlItem>
        <li>
          Total Number : <span>{totalCount}</span>
        </li>
        <li>
          Completed To-Do : <span>{doneCount}</span>
        </li>
        <li>
          Incompleted To-Do : <span>{notDoneCount}</span>
        </li>
      </UlItem>
      <InputItem>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          value={search}
          onChange={onChangeSearch}
          placeholder="찾고 싶은 검색어를 입력하세요"
        />
      </InputItem>
      <TodoArea>
        <TodoWrapper style={{ padding: todo.length > 0 ? "10px" : 0 }}>
          {getSearchResult().map((item, i) => (
            <TodoItem key={i} {...item} />
          ))}
        </TodoWrapper>
        {todo.length > 0 ? null : (
          <EmptyTodo>
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
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            <p>No To-Do yet</p>
          </EmptyTodo>
        )}
      </TodoArea>
    </>
  );
};

export default TodoList;
