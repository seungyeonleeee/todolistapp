import React, { useState, useRef, useReducer, useCallback } from "react";
import { ThemeProvider, styled } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { darkTheme, lightTheme } from "./styles/theme";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";

export const TodoContext = React.createContext();

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 10px;
  margin: 0 auto;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
`;
const ThemeBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
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
`;

const localTodo = JSON.parse(localStorage.getItem("todo")) || [];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE": {
      const newState = [action.newItem, ...state];
      localStorage.setItem("todo", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    }
    case "DELETE": {
      const newState = state.filter((item) => item.id !== action.targetId);
      localStorage.setItem("todo", JSON.stringify(newState));
      if (newState.length === 0) localStorage.removeItem("todo");
      return newState;
    }
    default:
      return state;
  }
};

const App = () => {
  const [todo, dispatch] = useReducer(reducer, localTodo);

  const idRef = useRef(1);

  const [isDark, setIsDark] = useState(false);

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        isDone: false,
        content,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  const toggleDark = () => {
    setIsDark((current) => !current);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Wrapper>
        <GlobalStyles />
        <Header />
        <ThemeBtn onClick={toggleDark}>
          {isDark ? (
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
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
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
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </ThemeBtn>
        <TodoContext.Provider value={{ todo, onCreate, onUpdate, onDelete }}>
          <TodoEditor />
          <TodoList />
        </TodoContext.Provider>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
