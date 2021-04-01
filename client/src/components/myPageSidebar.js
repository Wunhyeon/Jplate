import react from "react";
import { Link } from "react-router-dom";
import "./myPage.css";

const MyPageSidebar = ({ name, setContent }) => {
  const handleContent = () => {
    console.log("clicked");
  };

  return (
    <div className="myPageSidebarContainer">
      <h1>환영합니다,{name}</h1>
      <div className="myPageSidebarContents">
        <div
          onClick={() => {
            setContent(1);
          }}
        >
          <h2>마이 페이지</h2>
        </div>
        <div
          onClick={() => {
            setContent(1);
          }}
        >
          회원정보 수정
        </div>
        <div
          onClick={() => {
            setContent(2);
          }}
        >
          비밀번호 변경
        </div>
        <div
          onClick={() => {
            setContent(3);
          }}
        >
          쿠폰
        </div>
        <div
          onClick={() => {
            setContent(4);
          }}
        >
          찜하기
        </div>
        <div
          onClick={() => {
            setContent(5);
          }}
        >
          결제내역
        </div>
      </div>
    </div>
  );
};

export default MyPageSidebar;
