import axios from "axios";
import React, { useEffect, useState } from "react";
import EditBigPicture from "../components/EditBigPicture";
import EditMusic from "../components/EditMusic";
import EditSide from "../components/EditSide";
import "./edit.css";

const Edit = () => {
  const [templateInfo, setTemplateInfo] = useState();
  const [gotTemplateInfo, setGotTemplateInfo] = useState(false);

  const [musicList, setMusicList] = useState();
  const [gotMusicList, setGotMusicList] = useState(false);

  const [showMusicListModal, setShowMusicListModal] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState();

  const [selectedPicture, setSelectedPicture] = useState();
  const [templateOrder, setTemplateOrder] = useState(0);

  const getTemplateInfo = () => {
    const url = new URL(window.location.href);
    console.log("url.search : ", url.search);
    let templateId = url.search.split("=")[1];
    axios
      .get(
        `http://localhost:5000/templates/getOneTemplate?templateId=${templateId}`
      )
      .then((result) => {
        console.log("$$$ : ", result);
        setTemplateInfo(result.data.oneTemplate);
        setSelectedPicture(result.data.oneTemplate.EditData.EditPicture[0]);
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
        setMusicList(result.data.musicList);
        setGotMusicList(true);
        setSelectedMusic(result.data.musicList[0].URL);
      })
      .catch((err) => {
        console.log("Error on get Music List : ", err);
        setGotMusicList(false);
      });
  };

  const handleShowMusicListModal = (e) => {
    setShowMusicListModal(!showMusicListModal);
  };

  const selectMusic = (e) => {
    console.log("select Music : ", e);
    setSelectedMusic(e);
    setShowMusicListModal(false);
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
              <button
                className="musicButton"
                onClick={handleShowMusicListModal}
              >
                🎶 배경음
              </button>
              {showMusicListModal && (
                <EditMusic
                  handleShowMusicListModal={handleShowMusicListModal}
                  musicList={musicList}
                  selectMusic={selectMusic}
                  selectedMusic={selectedMusic}
                />
              )}
            </div>
            <div className="pictureEditArea">
              <EditSide
                editPicture={templateInfo.EditData.EditPicture}
                setSelectedPicture={setSelectedPicture}
                setTemplateOrder={setTemplateOrder}
              />
              <EditBigPicture
                selectedPicture={selectedPicture}
                templateOrder={templateOrder}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
