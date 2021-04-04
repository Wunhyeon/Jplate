import react, { useState } from "react";
import "./store.css";
import StoreTemplateModal from "./StoreTemplateModal";

const StoreTemplateThumb = ({
  id,
  thumbnailPicture,
  sampleVideo,
  time,
  textLength,
  category,
  tag,
  pages,
  price,
  title,
  ratio,
  description,
}) => {
  const [modalOn, setModalOn] = useState(false);

  const handleModalOn = (e) => {
    setModalOn(!modalOn);
  };
  return (
    <>
      <div className="templateThumbContainer" onClick={handleModalOn}>
        <div className="pictureArea">
          <img src={thumbnailPicture} className="thumbnailPicture" />
        </div>
        <div className="descriptionArea">
          <h3>{title}</h3>
          <div className="priceArea">{price}원</div>
          <div className="concreteSetting">
            ❐ {ratio} ⏱ {time} 𝐓 {textLength} 📄 {pages}
          </div>
          <div className="tag">{tag}</div>
        </div>
      </div>
      {modalOn && (
        <StoreTemplateModal
          handleModalOn={handleModalOn}
          sampleVideo={sampleVideo}
          id={id}
          time={time}
          textLength={textLength}
          category={category}
          tag={tag}
          pages={pages}
          price={price}
          title={title}
          ratio={ratio}
          description={description}
        />
      )}
    </>
  );
};

export default StoreTemplateThumb;
