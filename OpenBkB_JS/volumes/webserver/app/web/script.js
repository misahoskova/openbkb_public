const querys = require("../db/query")

$(document).ready(function() {
  const burgerIcon = document.querySelector('#burger');
  const navbarMenu = document.querySelector('#nav-links');

  burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
  });

  $("#smazat-boty").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    querys.deleteAllBots();
  })
});