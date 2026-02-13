import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";
import QRCode from "qrcode";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  const url = req.body.url;
  const qrColor = req.body.color || "#000000";

  if (!url) return res.render("index", { qrCode: null });

  QRCode.toDataURL(
    url,
    {
      color: {
        dark: qrColor,
        light: "#00000000",
      },
    },
    (err, imageCode) => {
      if (err) return res.send("Сталася помилка");

      res.render("index", { qrCode: imageCode });
    },
  );
});

app.get("/", (req, res) => {
  res.render("index", { qrCode: null });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
