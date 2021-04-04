import React, { useState } from "react";
import "./edit.css";

const EditMusic = ({
  handleShowMusicListModal,
  musicList,
  selectMusic,
  selectedMusic,
}) => {
  const [choosetMusic, setChooseMusic] = useState(selectedMusic);
  console.log("selectedMusic : ", selectedMusic);
  return (
    <div
      className="editMusicContainer"
      onClick={() => handleShowMusicListModal()}
    >
      <div className="editMusicContents" onClick={(e) => e.stopPropagation()}>
        <span className="backgroundTitle">배경음</span>
        {musicList.map((el, i) => (
          <div className="musicDiv" key={i}>
            {el.Title}
            <input
              type="radio"
              name="musicSelect"
              value={el.URL}
              className="musicRadio"
              checked={choosetMusic === el.URL}
              onChange={() => setChooseMusic(el.URL)}
            />
            <audio src={el.URL} controls />
          </div>
        ))}
        <br />
        <button
          className="musicSelectButton"
          onClick={() => selectMusic(choosetMusic)}
        >
          선택하기
        </button>
      </div>
    </div>
  );
};

export default EditMusic;
