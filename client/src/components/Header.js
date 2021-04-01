import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import SmallLogo from "./SmallLogo";
import "./common.css";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

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
                <Link to="/account/edit">👤 내정보</Link>
              </span>
              <span>
                <Link to="*">로그아웃</Link>
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

export default Header;
