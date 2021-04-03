import react from "react";
import "./store.css";
const StroeCategory = () => {
  return (
    <div className="storeCategoryContainer">
      <h1>디자인 스토어</h1>
      <div className="storeCategoryContents">
        <div className="ratio category">
          <span className="categoryTitle">비율</span>
          <span className="categoryContents">
            <span>
              <input type="checkbox" className="categoryCheckbox" value="all" />
              전체
            </span>
            {mockRatio.map((el, i) => (
              <span key={i}>
                <input
                  type="checkbox"
                  className="categoryCheckbox"
                  value={el}
                />
                {el}
              </span>
            ))}
          </span>
        </div>
        <div className="commerce category">
          <span className="categoryTitle">카테고리</span>
          <span className="categoryContents">
            <span>
              <input type="checkbox" className="categoryCheckbox" value="all" />
              전체
            </span>
            {mockCategory.map((el, i) => (
              <span key={i}>
                <input
                  type="checkbox"
                  className="categoryCheckbox"
                  value={el}
                />
                {el}
              </span>
            ))}
          </span>
        </div>
        <div className="commerce category">
          <span className="categoryTitle">스타일</span>
          <span className="categoryContents">
            <span>
              <input type="checkbox" className="categoryCheckbox" value="all" />
              전체
            </span>
            {mockStyle.map((el, i) => (
              <span key={i}>
                <input
                  type="checkbox"
                  className="categoryCheckbox"
                  value={el}
                />
                {el}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StroeCategory;

// 비율 전체 1:1 9:16 16:9 4:5
// 카테고리 전체 카페&레스토랑 뷰티&패션 기업(IT) 자기소개 팀 레포트
// 스타일 전체 따뜻한 차가운 감성적인 차분한 화려한
const mockRatio = ["1:1", "9:16", "16:9", "4:5"];
const mockCategory = [
  "카페&레스토랑",
  "뷰티&패션",
  "기업(IT)",
  "자기소개",
  "팀 레포트",
];
const mockStyle = ["따뜻한", "차가운", "감성적인", "차분한", "화려한"];
