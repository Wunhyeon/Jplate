import react, { useState } from "react";
import "./edit.css";

const EditVideo = ({
  handleShowVideoModal,
  videoList,
  templateOrder,
  editForm,
  setEditForm,
}) => {
  const handleEditVideo = (e) => {
    let temp = { ...editForm };
    temp.selectedVideo[templateOrder] = e.target.value;
    console.log("templateOrder : ", templateOrder);
    console.log("tmp : ", temp);
    setEditForm({ ...temp });
  };
  return (
    <div className="editVideoContainer" onClick={() => handleShowVideoModal()}>
      <div
        className="editVideoContentsContainer"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>{templateOrder + 1} 번째 비디오선택</h1>
        <div className="editVideoContents" onClick={(e) => e.stopPropagation()}>
          {videoList.map((el, i) => (
            <div className="sampleVideoContainer" key={i}>
              <video src={el.URL} controls className="sampleVideo" />
              <input
                type="radio"
                className="sampleVideoRadio"
                checked={el.URL === editForm.selectedVideo[templateOrder]}
                onChange={handleEditVideo}
                value={el.URL}
              />
              {el.Title}
            </div>
          ))}
        </div>
        <div className="selectVideoTextArea">
          <input
            type="text"
            placeholder="영어만 입력해주세요"
            className="sampleTextInput"
            value={editForm.selectedText[templateOrder]}
            onChange={(e) => {
              let temp = { ...editForm };
              temp.selectedText[templateOrder] = e.target.value;
              setEditForm({ ...temp });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditVideo;
