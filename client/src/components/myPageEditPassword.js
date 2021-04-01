import axios from "axios";
import react, { useState } from "react";

const MyPageEditPassword = ({ email }) => {
  const [password, setPassword] = useState("");

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEditSubmit = () => {
    axios
      .patch(
        "http://localhost:5000/users/modifypassword",
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((result) => {
        console.log("Success modify password");
        alert("비밀번호가 변경되었습니다.");
        setPassword("");
      })
      .catch((err) => {
        console.log("Error in modify password");
        alert("비밀번호를 변경하는데 오류가 발생했습니다.");
        setPassword("");
      });
  };

  return (
    <div className="myPageEditPassword">
      <h1>비밀번호 변경</h1>
      <div className="userInfoContainer">
        <div className="emailContainer">
          이메일
          <br />
          {email}
        </div>
        <div className="passwordContainer">
          변경 비밀번호
          <br />
          <input
            type="password"
            className="passwordInput"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="submitContainer">
          <button className="editSubmitButton" onClick={handleEditSubmit}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageEditPassword;
