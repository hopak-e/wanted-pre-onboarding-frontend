import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TodoContainer,
  SubmitButton,
  Todolist,
} from "../components/todos/TodosStyled";
import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { getTodos, postTodo, putTodo, deleteTodo } from "../apis/apis";

function Todos() {
  const token = localStorage.getItem("token");
  const [todo, setTodo] = useState("");
  const [todolist, setTodolist] = useState([]);

  const [idNumber, setIdNumber] = useState();
  const [modifyTodo, setModifyTodo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/todos");
    } else {
      navigate("/");
    }
    getTodos(setTodolist);
  }, []);

  const handleTodoCreate = async (todo) => {
    try {
      const res = await postTodo(todo);
      setTodolist((prev) => [...prev, res]);
      setTodo("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleTodoCompleted = async (id, todo, isCompleted) => {
    try {
      await putTodo(id, todo, isCompleted);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleTodoModify = async (id, modifyTodo, isCompleted) => {
    try {
      await putTodo(id, modifyTodo, isCompleted);
      setIdNumber(null);
      setModifyTodo("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleTodoDelete = async (id) => {
    try {
      await deleteTodo(id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
          <button onClick={() => handleTodoCreate(todo)}>추가</button>
        </SubmitButton>
        {todolist &&
          todolist.map((el) => (
            <Todolist key={el.id}>
              <AiOutlineCheckCircle
                className={`completed-button  ${
                  el.isCompleted ? "success" : "fail"
                }`}
                onClick={() =>
                  handleTodoCompleted(el.id, el.todo, el.isCompleted)
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
                    onClick={() =>
                      handleTodoModify(el.id, modifyTodo, !el.isCompleted)
                    }
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
          ))}
      </TodoContainer>
    </Container>
  );
}

export default Todos;
