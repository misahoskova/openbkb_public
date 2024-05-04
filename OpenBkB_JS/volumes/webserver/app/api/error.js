const express = require('express');
const router = express.Router();


router.get("*", (req, res, next) => {
  res.status(404).sendFile('/webserver/app/web/e404.html');
});

router.post("*", (req, res, next) => {
  res.status(404).send("Error 404 Not found");
});

module.exports = router;