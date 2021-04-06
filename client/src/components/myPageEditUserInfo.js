import axios from "axios";
import react, { useState } from "react";

const MyPageEditUserInfo = ({ email, phone, name, setName, setContent }) => {
  const handleEditName = (e) => {
    setName(e.target.value);
  };

  const handleSubmitEditName = () => {
    axios
      .patch(
        "http://localhost:5000/users/modifyname",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((result) => {
        alert("이름이 수정되었습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Err in update name : ", err);
        alert("오류가 발생하여 이름을 수정하지 못했습니다");
      });
  };
  return (
    <div className="myPageEditUserInfoContainer">
      <h1>회원정보 수정</h1>
      <div className="userInfoContainer">
        <div className="emailContainer">
          이메일
          <br />
          {email}
        </div>
        <div className="phoneContainer">
          휴대폰 번호
          <br />
          {phone}
        </div>
        <div className="passwordContainer">
          비밀번호
          <br />
          <button onClick={() => setContent(2)} className="modifyPassBtn">
            비밀번호 변경
          </button>
        </div>
        <div className="nameContainer">
          이름
          <br />
          <input
            type="text"
            value={name}
            className="nameInput"
            onChange={handleEditName}
          />
        </div>
        <div className="submitContainer">
          <button onClick={handleSubmitEditName} className="editSubmitButton">
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageEditUserInfo;
