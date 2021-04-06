import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import SmallLogo from "./SmallLogo";
import "./common.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

const Header = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = () => {
    axios
      .get("https://jplate-server.ga/users/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((result) => {
        alert("로그아웃 되었습니다.");
        setIsLogin(false);
        localStorage.removeItem("accessToken");
        props.history.push("/");
      })
      .catch((err) => {
        alert("로그아웃 되었습니다.");
        setIsLogin(false);
        localStorage.removeItem("accessToken");
      });
  };

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    console.log("accessToken : ", accessToken);
    if (accessToken) {
      setIsLogin(true);
    }
  }, [isLogin]);
  return (
    <div className="headerContainer">
      <div className="header__logo">
        <SmallLogo />
      </div>
      <div className="header__links">
        <span>
          <Link to="/store">디자인 스토어</Link>
        </span>
        <span>
          {isLogin ? (
            <>
              <span>
                <Link to="/project">나의 프로젝트</Link>
              </span>
              <span>
                <Link to="/account/edit">👤 내정보</Link>
              </span>
              <span>
                <span onClick={handleLogout} className="cursor_pointer">
                  로그아웃
                </span>
              </span>
            </>
          ) : (
            <Link to="/auth/signin">로그인</Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default withRouter(Header);
