import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import axios from "axios";

function Todos() {
  const URL = "https://pre-onboarding-selection-task.shop/todos";
  const token = localStorage.getItem("token");
  const [todo, setTodo] = useState("");
  const [todolist, setTodolist] = useState([]);

  const [idNumber, setIdNumber] = useState();
  const [modifyTodo, setModifyTodo] = useState("");

  const navigate = useNavigate();

  const getTodos = () => {
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTodolist(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getTodos();
  }, []);

  const handleCreateTodoClick = async (e) => {
    e.preventDefault();
    await axios
      .post(
        URL,
        { todo: todo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTodolist([
          ...todolist,
          {
            id: res.data.id,
            todo: res.data.todo,
            isCompleted: res.data.isCompleted,
            userId: res.data.userId,
          },
        ]);
        setTodo("");
      })
      .catch((err) => console.log(err));
  };

  const handleCompletedClick = async (id, todo, isCompleted) => {
    await axios
      .put(
        `${URL}/${id}`,
        {
          todo: todo,
          isCompleted: !isCompleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => getTodos())
      .catch((err) => console.log(err));
  };

  const handleModifyClick = async (id, isCompleted) => {
    await axios
      .put(
        `${URL}/${id}`,
        {
          todo: modifyTodo,
          isCompleted: isCompleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIdNumber(null);
        setModifyTodo("");
        getTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleTodoDelete = async (id) => {
    await axios
      .delete(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => getTodos())
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <TodoContainer>
        <SubmitButton>
          <textarea
            placeholder="할 일을 적으세요"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={handleCreateTodoClick}>추가</button>
        </SubmitButton>
        {todolist
          ? todolist.map((el) => (
              <Todolist key={el.id}>
                <AiOutlineCheckCircle
                  className={`completed-button  ${
                    el.isCompleted ? "success" : "fail"
                  }`}
                  onClick={() =>
                    handleCompletedClick(el.id, el.todo, el.isCompleted)
                  }
                />

                {idNumber === el.id ? (
                  <>
                    <textarea
                      value={modifyTodo}
                      onChange={(e) => setModifyTodo(e.target.value)}
                    >
                      hi
                    </textarea>
                    <button onClick={() => setIdNumber(null)}>취소</button>
                    <button
                      onClick={() => handleModifyClick(el.id, el.isCompleted)}
                    >
                      완료
                    </button>
                  </>
                ) : (
                  <>
                    <p>{el.todo}</p>
                    <BiPencil
                      className="modify-button"
                      onClick={() => setIdNumber(el.id)}
                    />
                    <AiOutlineDelete
                      className="delete-button"
                      onClick={() => handleTodoDelete(el.id)}
                    />
                  </>
                )}
              </Todolist>
            ))
          : null}
      </TodoContainer>
    </Container>
  );
}

export default Todos;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TodoContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 2rem 0;
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  & > textarea {
    resize: none;
    width: 60%;
    height: 4rem;
    margin-right: 1rem;
  }
  & > button {
    width: 10%;
  }
`;

const Todolist = styled.div`
  display: flex;
  align-items: center;
  width: 72%;
  margin-top: 1rem;
  border: 1px solid black;
  .completed-button {
    font-size: 2rem;
    font-weight: 200;
    cursor: pointer;
    &.success {
      color: #19ce60;
    }
  }
  & > p {
    display: flex;

    width: 100%;
    padding: 1rem;
  }

  .modify-button {
    font-size: 2rem;
    padding-right: 0.5rem;
    color: #495057;
    cursor: pointer;
  }
  .delete-button {
    font-size: 2rem;
    color: #495057;
    cursor: pointer;
  }
`;
