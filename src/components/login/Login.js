import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const URL = "https://pre-onboarding-selection-task.shop/";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPassword, setIsPassword] = useState(false);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todos");
    }
  }, []);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex = /@+/g;
    if (!emailRegex.test(e.target.value)) {
      setEmailMessage("이메일 형식이 틀렸습니다. 올바르게 입력해주세요");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 형식입니다.");
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    const message = e.target.value;
    setPassword(message);

    if (message.length >= 8) {
      setPasswordMessage("올바른 형식입니다.");
      setIsPassword(true);
    } else {
      setPasswordMessage("비밀번호는 8자 이상 입력해주세요");
      setIsPassword(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoginForm) {
      try {
        await axios
          .post(
            `${URL}auth/signin`,
            {
              email: email,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              navigate("/todo");
              localStorage.setItem("token", res.data["access_token"]);
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios
          .post(
            `${URL}auth/signup`,
            {
              email: email,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log("rewponse: ", res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={onSubmit}>
        {isLoginForm ? <h1>로그인</h1> : <h1>회원 가입</h1>}
        <Formbox>
          <InputGroup
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={onChangeEmail}
          />
          {email.length > 0 && (
            <span className={`message ${isEmail ? "success" : "error"}`}>
              {emailMessage}
            </span>
          )}
        </Formbox>
        <Formbox>
          <InputGroup
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={onChangePassword}
          />
          {password.length > 0 && (
            <span className={`message ${isPassword ? "success" : "error"}`}>
              {passwordMessage}
            </span>
          )}
        </Formbox>
        <button type="submit" disabled={!(isEmail && isPassword)}>
          {isLoginForm ? "로그인" : "회원가입"}
        </button>
        {isLoginForm ? (
          <span
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setEmail("");
              setPassword("");
            }}
          >
            회원가입
          </span>
        ) : (
          <span
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setEmail("");
              setPassword("");
            }}
          >
            로그인
          </span>
        )}
      </LoginForm>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 50%;
  max-width: 550px;
  height: 30%;
  border: 1px solid black;

  & > button {
    padding: 1rem;
    margin-top: 1rem;
  }

  > span {
    margin-top: 0.5rem;
    text-decoration: none;
    color: black;
    width: 100%;
    text-align: right;
    width: 100%;
    cursor: pointer;
  }
`;

const Formbox = styled.div`
  .message {
    color: black;
    &.error {
      color: red;
    }
  }
`;

const InputGroup = styled.input`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  margin: 1rem 0;
  &::placeholder {
    font-size: 1rem;
  }
`;
