import Templates from "../../models/templateModel";

export const getTemplate = {
  getAllTemplate: async (req, res) => {
    console.log("get All Template!");
    let templateList = await Templates.find();
    console.log(templateList);
    res.send({ message: "ok" });
  },
};
