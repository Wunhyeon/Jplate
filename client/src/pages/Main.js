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
            <Link to={`/store?category=${el.category}`}>
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
  { category: 1 },
  { category: 2 },
  { category: 3 },
  { category: 4 },
  { category: 5 },
  { category: 6 },
  { category: 7 },
  { category: 8 },
];
