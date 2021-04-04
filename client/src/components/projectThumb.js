import react from "react";
import "./project.css";
import { useHistory } from "react-router-dom";

const ProjectThumb = ({
  id,
  thumbnailPicture,
  title,
  ratio,
  time,
  textLength,
  pages,
}) => {
  const history = useHistory();
  const goToEdit = () => {
    history.push(`/app?templateId=${id}`);
  };
  return (
    <div className="projectThumbContainer">
      <div className="pictureArea">
        <img src={thumbnailPicture} className="thumbNailPicture" />
      </div>
      <div className="descriptionArea">
        <div className="titleArea">{title}</div>
        <div className="concreteDescriptionArea">
          ❐ {ratio} ⏱ {time} 𝐓 {textLength} 📄 {pages}
        </div>
      </div>
      <div className="buttonArea">
        <button className="makeButton" onClick={goToEdit}>
          제작하기
        </button>
      </div>
    </div>
  );
};

export default ProjectThumb;
