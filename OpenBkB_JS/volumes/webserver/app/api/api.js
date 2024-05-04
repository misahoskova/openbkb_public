const express = require('express');
const router = express.Router();
const abra = require('../abra/index');

 router.get("/run", async (req, res, next) => {
  try {
    await abra.run("test", "296468138/0300", "2018-04-01", "2024-04-21");
    res.status(200).send("Funkce úspěšně spuštěna.");
  } catch (error) {
    console.error("Chyba při spouštění funkce abra.run:", error);
    res.status(500).send("Chyba při spouštění funkce.");
  }
 });

module.exports = router;