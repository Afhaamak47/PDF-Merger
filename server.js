import express from "express";
import path from "path";
import multer from "multer";
import mergepdf from "./testpdf.js";

const upload = multer({ dest: "uploads/" });
const app = express();
const port = 3000;

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "templates/index.html"));
});

app.post("/merge", upload.array("PDFs", 2), async (req, res, next) => {
  console.log(req.files);
  let d = await mergepdf(
    path.join(path.resolve(), req.files[0].path),
    path.join(path.resolve(), req.files[1].path)
  );
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
  //   res.send({ data: req.files });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
