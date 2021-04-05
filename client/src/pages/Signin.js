import react, { useState } from "react";
import { Link } from "react-router-dom";
import BigLogo from "../components/BigLogo";
import "./signin.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Signin = (props) => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEamil(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post(
        "https://jplate-server.ga/users/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log("Success Login");
        localStorage.setItem("accessToken", result.data.accessToken);
        props.history.push("/");
      })
      .catch((err) => {
        // console.log("Err in Login : ", err.response);
        alert("아이디와 비밀번호를 확인해주세요");
        setEamil("");
        setPassword("");
      });
  };

  return (
    <div className="signinContainer">
      <div className="contents">
        <BigLogo />
        <input
          type="text"
          name="id"
          placeholder="아이디를 입력해주세요"
          onChange={handleEmail}
          value={email}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={handlePassword}
          value={password}
        />
        <br />
        <button className="signinButton" onClick={handleSubmit}>
          로그인
        </button>
        <div className="optional">
          <Link to="/auth/signup">회원가입</Link>
          <Link to="*">이메일 찾기</Link>
          <Link to="*">비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Signin);
