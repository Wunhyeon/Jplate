import Users from "../../models/userModel";
import { SHA256 } from "crypto-js";
import { createToken } from "../../util/token/token";

export const postUser = {
  signup: async (req, res) => {
    console.log("user signup : req.body : ", req.body);

    const { email, password, name, phone } = req.body;
    //비밀번호 해싱
    const encryptPassword = SHA256(
      password,
      process.env.CRYPTO_PASSWORD
    ).toString();

    try {
      await Users.create({
        Email: email,
        Password: encryptPassword,
        Name: name,
        Phone: phone,
      });
      res.send({ message: "ok" });
    } catch (err) {
      console.log("Err in Signup - DB : ", err.code);
      //!이메일 중복검사 : Schema에 unique로 설정한 칼럼이 중복되면 insert할 때 에러 코드를 반환해주고 그 에러코드를 통해 어떤게 중복됬는지 알 수 있다.
      if (err.keyPattern.Email) {
        console.log("Duplicate Email");
        res.status(409).send({ message: "Duplicate email" });
      } else if (err.keyPattern.Phone) {
        console.log("Duplicate Phone");
        res.status(409).send({ message: "Duplicate Phone" });
      } else {
        res.status(500).send({ message: "Server Error" });
      }
    }
  },
  signin: async (req, res) => {
    console.log("user signin : req.body : ", req.body);
    const { email, password } = req.body;

    const encryptPassword = SHA256(
      password,
      process.env.CRYPTO_PASSWORD
    ).toString();

    try {
      let userInfo = await Users.findOne({
        Email: email,
        Password: encryptPassword,
      });

      if (userInfo) {
        const { _id, Email, Name } = userInfo;
        let tokenInfoObj = {
          _id,
          Email,
          Name,
          iat: Math.floor(Date.now() / 1000) + 60 * 60,
        };
        const accessToken = createToken(tokenInfoObj);
        res.send({ accessToken, message: "ok" });
      } else {
        res.status(403).send({ message: "Invalid User" });
      }
    } catch (err) {
      res.status(500).send("Server Error");
    }
  },
};
