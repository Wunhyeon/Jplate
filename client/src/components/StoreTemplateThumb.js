import react from "react";
import "./store.css";

const StoreTemplateThumb = ({
  picture,
  title,
  ratio,
  time,
  textLength,
  category,
  tag,
  pages,
  price,
}) => {
  return (
    <div className="templateThumbContainer">
      <div className="pictureArea">사진영역</div>
      <div className="descriptionArea">
        <h3>${title}타이틀</h3>
        <div className="priceArea">${price}</div>
        <div className="concreteSetting">
          비율,시간,글자수, 사진수, 동영상수
          {/* <video src="./src/cut1.mp4" controls /> */}
          <img src="https://jplate.s3.ap-northeast-2.amazonaws.com/sample1.png" />
          <video
            src="https://jplate.s3.ap-northeast-2.amazonaws.com/template_sample1.mp4"
            controls
          />
        </div>
        <div className="category">카테고리</div>
      </div>
    </div>
  );
};

export default StoreTemplateThumb;
