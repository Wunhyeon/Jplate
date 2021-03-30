import react from "react";
import { Link } from "react-router-dom";
import BigLogo from "../components/BigLogo";
import "./signin.css";

const Signin = () => {
  return (
    <div className="signinContainer">
      <div className="contents">
        <BigLogo />
        <input type="text" name="id" placeholder="아이디를 입력해주세요" />
        <br />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <br />
        <button className="signinButton">로그인</button>
        <div className="optional">
          <Link to="/auth/signup">회원가입</Link>
          <Link to="*">이메일 찾기</Link>
          <Link to="*">비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
