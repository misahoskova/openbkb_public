const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/index.html');
 });

router.get("/accounting.html", (req, res, next) => {
res.status(200).sendFile('/webserver/app/web/accounting.html');
});

router.get("/pairing.html", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/pairing.html');
  });

// app.get("/index.html", (req, res, next) => {
//   res.status(200).sendFile(path.join(__dirname, 'index.html'));
// });

router.get("/index.css", (req, res, next) => { 
  res.status(200).sendFile('/webserver/app//web/index.css');
});

router.get("/index.html", (req, res, next) => { 
  res.status(200).sendFile('/webserver/app//web/index.html');
});

router.get("/script.js", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/script.js');
});

router.get("/img/jezevcik.png", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/img/jezevcik.png');
});

router.get("/img/plechova-ucetni.png", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/img/plechova-ucetni.png');
});

router.get("/imgfavicon.png", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/img/favicon.png');
});

router.get("/img/plechova-ucetni-rozsirene.png", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/img/plechova-ucetni-rozsirene.png');
});

router.get("/img/h1.png", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/img/h1.png');
});

router.get("/robot_form.html", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/robot_form.html');
});

router.get("/criteria_form.html", (req, res, next) => {
  res.status(200).sendFile('/webserver/app/web/criteria_form.html');
});

module.exports = router;