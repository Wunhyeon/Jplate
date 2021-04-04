import axios from "axios";
import React, { useEffect, useState } from "react";
import "./edit.css";

const Edit = () => {
  const [templateInfo, setTemplateInfo] = useState();
  const [gotTemplateInfo, setGotTemplateInfo] = useState(false);

  const [musicList, setMusicList] = useState();
  const [gotMusicList, setGotMusicList] = useState(false);

  const getTemplateInfo = () => {
    const url = new URL(window.location.href);
    console.log("url.search : ", url.search);
    let templateId = url.search.split("=")[1];
    axios
      .get(
        `http://localhost:5000/templates/getOneTemplate?templateId=${templateId}`
      )
      .then((result) => {
        setTemplateInfo(result.data.oneTemplate);
        setGotTemplateInfo(true);
      })
      .catch((err) => {
        console.log("err : ", err);
        setGotTemplateInfo(false);
      });
  };

  const getMusicList = () => {
    axios
      .get("http://localhost:5000/edits/getMusicList")
      .then((result) => {
        console.log("$$$result : ", result);
        setMusicList(result.data.musicList);
        setGotMusicList(true);
      })
      .catch((err) => {
        console.log("Error on get Music List : ", err);
        setGotMusicList(false);
      });
  };

  useEffect(() => {
    if (!templateInfo) {
      getTemplateInfo();
    }
    if (!musicList) {
      getMusicList();
    }
  }, [gotTemplateInfo, gotMusicList]);

  return (
    <div className="editContainer">
      {templateInfo && gotTemplateInfo && (
        <div className="editContents">
          <div className="descriptionArea">
            <div className="concreteArea">
              ❐ {templateInfo.Ratio} ⏱ {templateInfo.Time} 𝐓{" "}
              {templateInfo.TextLength} 📄 {templateInfo.Pages}
            </div>
            <div className="titleArea">{templateInfo.Title}</div>
          </div>
          <hr />
          <div className="editArea">
            <div className="optionArea">
              <button className="musicButton">🎶 배경음</button>
            </div>
            <div className="pictureEditArea">사진</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
