import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";
import QRCode from "qrcode";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  const userUrl = req.body.url;
  const qrColor = req.body.color || "#000000";

  QRCode.toDataURL(
    userUrl,
    {
      color: {
        dark: qrColor, 
        light: "#ffffff", 
      },
    },
    (err, imageCode) => {
      if (err) {
        res.send("Сталася помилка");
        return;
      }
      res.send(`
    <!DOCTYPE html>
      <html>
      <head>
        <title>QR Code Ready</title>
        <link rel="stylesheet" href="/style.css"> </head>
      <body>
        <div class="container"> <h1>Ваш QR готовий!</h1>
          
          <img src="${imageCode}" alt="QR Code" style="width: 200px; margin: 20px 0;">
          
          <br>
          
          <a href="/">
            <button>Створити ще один</button>
          </a>
        </div>
      </body>
      </html>
    `);
    },
  );
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
