import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./main.css";

const Main = () => {
  return (
    <div className="mainContainer">
      <Header />
      <div className="mainContents">
        <h1>주니어 백엔드 개발자 임재현입니다. 잘부탁드립니다 🙂</h1>
        <div className="designStoreCategoryContainer">
          {mockTemplate.map((el, i) => (
            <Link to={`/store?category=${el.category}`} key={i}>
              <div className="designStoreCategory" key={i}>
                {el.category}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;

const mockTemplate = [
  { category: "카페 & 레스토랑" },
  { category: "뷰티 & 패션" },
  { category: "기업(IT)" },
  { category: "예술" },
  { category: "여행" },
  { category: "이벤트" },
  { category: "이커머스" },
  { category: "전체" },
];
