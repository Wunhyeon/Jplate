import react, { useState } from "react";
import BigLogo from "../components/BigLogo";
import "./signup.css";
import axios from "axios";

const Signup = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
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
    alert(`${password}, ${passwordCheck}, ${name}, ${phone}`);
    axios.post("http://localhost:5000", {
      userEmail,
      password,
      name,
      phone,
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
              name="userEmail"
              id="userEmail"
              onChange={handleUserEmail}
            />
          </label>
          <label>
            <span>비밀번호</span>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              onChange={handlePassword}
            />
          </label>
          <label>
            <span>비밀번호 확인</span>
            <input
              type="password"
              name="passwordCheck"
              id="passwordCheck"
              onChange={handlePasswordCheck}
            />
          </label>
          <label>
            <span>이름</span>
            <input type="text" name="name" id="name" onChange={handleName} />
          </label>
          <label>
            <span>휴대폰 번호</span>
            <input type="tel" name="phone" id="phone" onChange={handlePhone} />
          </label>
          <button className="signupButton" onClick={submitSignup}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
