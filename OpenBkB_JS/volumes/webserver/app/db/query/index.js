// Upravená verze funkce s exportem
const db = require("../models");

const Bots = db.bots;
const FicDocs = db.ficdocs;
const Op = db.Sequelize.Op;

var querys = {};

// querys.addTestBot = async () => {

//   const bot = {
//     bot_name: "Alpha",
//     bot_type: "pairing",
//     company_name: "test",
//     fictional_document_number: null,
//     begin_active: "2024-04-01",
//     end_active: "2024-04-02",
//     pair_by_var_sym: true,
//     pair_by_amount: true,
//     rounding_config: "off",
//     rounding: "0",
//     pair_by_currency: false,
//     pair_by_company: true,
//     pair_by_date: true,
//     underhead: null,
//     overhead: null,
//     pair_by_bank_account: false
//   }
//   try {
//     var result = await Bots.create(bot);
//   }
//   catch (err) {
//     throw err;
//   }
// }

querys.addTestBot = async () => {

  const bot = {
    bot_name: "X-Ray",
    bot_type: "pairing",
    company_name: "test",
    doc_type: "received_invoice",
    fictional_document_number: null,
    begin_active: "2020-04-01",
    end_active: "2020-04-20",
    pair_by_var_sym: false,
    pair_by_amount: true,
    rounding_config: "off",
    rounding: "0",
    currency: "CZK",
    pair_by_currency: false,
    pair_by_company: false,
    pair_company_name: null,
    pair_by_date: true,
    underhead: null,
    overhead: 30,
    pair_by_bank_account: false
  }

   try {
    var result = await Bots.create(bot);
  }
  catch (err) {
    throw err;
  }
}

querys.addBot = async (bot) => {
  try {
    var result = await Bots.create(bot);
  }
  catch (err) {
    throw err;
  }
}

querys.updateBot = async (id, bot) => {
  try {
    var result = await Bots.update(bot, {
      where: { bot_id: id }
    });
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.deleteBot = async (id) => {
  try {
    var result = await Bots.destroy({
      where: { bot_id: id }
    });
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.deleteAllBots = async () => {
  try {
    var result = await Bots.destroy({
      where: {},
      truncate: false
    });
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.getAllBots = async () => {
  try {
    var result = await Bots.findAll();
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.getBots = async (conditions) => {
  try {
    var result = await Bots.findAll(conditions);
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.getBotsByCompany = async (company_name) => {
  try {
    var result = await querys.getBots({
      where: {
        company_name: company_name
      }
    });
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.getBotByID = async (id) => {
  try {
    var result = await Bots.findByPk(id);
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.addTestFicDoc = async () => {

  const ficDoc = {
    account_type: "income",
    account_number: 324001,
    amount: 7621.00,
    currency: "CZK",
    var_sym: "2019",
    bank_account: null,
    date: null,
    description: null
  }

   try {
    var result = await FicDocs.create(ficDoc);
  }
  catch (err) {
    throw err;
  }
}

querys.addFicDoc = async (ficDoc) => {
  try {
    var result = await FicDocs.create(ficDoc);
  }
  catch (err) {
    throw err;
  }
}

querys.updateFicDoc = async (id, ficDoc) => {
  try {
    var result = await FicDocs.update(ficDoc, {
      where: { fd_id: id }
    });
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.deleteFicDoc = async (id) => {
  try {
    var result = await FicDocs.destroy({
      where: { fd_id: id }
    });
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.deleteAllFicDoc = async () => {
  try {
    var result = await FicDocs.destroy({
      where: {},
      truncate: false
    });
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.getAllFicDocs = async () => {
  try {
    var result = await FicDocs.findAll();
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.getFicDocs = async (conditions) => {
  try {
    var result = await FicDocs.findAll(conditions);
    return result;
  }
  catch (err) {
    throw err;
  }
}

querys.getFicDocsByAccountNumber = async (account_number) => {
  try {
    var result = await querys.getFicDocs({
      where: {
        account_number: account_number
      }
    });
    return result;
  }
  catch (err) {
    throw err;
  }
}

module.exports = querys;