import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import SmallLogo from "./SmallLogo";

const Header = () => {
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
          <Link to="/auth/signin">로그인</Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
