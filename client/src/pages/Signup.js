import react, { useState } from "react";
import BigLogo from "../components/BigLogo";
import "./signup.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const submitSignup = () => {
    axios
      .post("https://laggard-server.ga/users/signup", {
        email,
        password,
        name,
        phone,
      })
      .then((result) => {
        console.log("Success Signup");
        props.history.push("/auth/signin");
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.message === "Duplicate email") {
          alert("중복된 이메일입니다.");
        }
        if (err.response.data.message === "Duplicate Phone") {
          alert("중복된 핸드폰 번호입니다.");
        }
      });
  };

  return (
    <div className="signupContainer">
      <div className="contents">
        <div className="logoContainer">
          <BigLogo />
        </div>
        <div className="signupForm">
          <label>
            <span>이메일</span>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleEmail}
              value={email}
            />
          </label>
          <label>
            <span>비밀번호</span>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              onChange={handlePassword}
              value={password}
            />
          </label>
          <label>
            <span>비밀번호 확인</span>
            <input
              type="password"
              name="passwordCheck"
              id="passwordCheck"
              onChange={handlePasswordCheck}
              value={passwordCheck}
            />
          </label>
          <label>
            <span>이름</span>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleName}
              value={name}
            />
          </label>
          <label>
            <span>휴대폰 번호</span>
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={handlePhone}
              value={phone}
            />
          </label>
          <button className="signupButton" onClick={submitSignup}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Signup);
