import { parseToken } from "../../util/token/token";
import Users from "../../models/userModel";
import mongoose from "mongoose";
import { SHA256 } from "crypto-js";

export const patchUser = {
  modifyUserName: async (req, res) => {
    console.log("modifyUserName");

    let parsed = parseToken(req.headers.authorization);
    if (parsed) {
      let { _id } = parsed;
      _id = mongoose.Types.ObjectId(_id);
      Users.updateOne({ _id }, { Name: req.body.name }) //중요!! 제약사항이 첫번째 인자로, 바꾸고자 하는 내용이 두번째 인자로 들어간다.
        .then((result) => {
          res.send({ message: "ok" });
        })
        .catch((err) => {
          console.log("err : ", err);
          res.status(500).send({ message: "Server Error" });
        });
    } else {
      res.status(403).send({ message: "Invalid access token" });
    }
  },
  modifyPassword: async (req, res) => {
    console.log("modify Password");

    console.log("req.body : ", req.body);
    let encryptPassword = SHA256(
      req.body.password,
      process.env.CRYPTO_PASSWORD
    ).toString();

    let parsed = parseToken(req.headers.authorization);
    if (parsed) {
      let { _id } = parsed;
      _id = mongoose.Types.ObjectId(_id);
      Users.updateOne({ _id }, { Password: encryptPassword })
        .then((result) => {
          console.log("Success");
          res.send({ message: "ok" });
        })
        .catch((err) => {
          res.status(500).send({ message: "Server Error" });
        });
    } else {
      res.status(403).send({ message: "Invalid User" });
    }
  },
};
