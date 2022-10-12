import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

export const getTodos = async (setTodolist) => {
  await axios
    .get(`${URL}/todos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => setTodolist(res.data))
    .catch((err) => console.log(err));
};

export const postTodo = async (todo) => {
  const res = await axios.post(
    `${URL}/todos`,
    { todo: todo },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const putTodo = async (id, todo, isCompleted) => {
  const res = await axios.put(
    `${URL}/todos/${id}`,
    {
      todo: todo,
      isCompleted: !isCompleted,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${URL}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
