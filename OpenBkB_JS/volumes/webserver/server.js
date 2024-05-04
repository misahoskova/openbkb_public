const http = require("http");
const app = require("./app/app.js");
const db = require("./app/db/models");
const querys = require("./app/db/query");
const abra = require("./app/abra");


async function main() {
  try {
    await db.sequelize.sync();
    console.log("Database connected");

    await restart();

  
    await abra.run("test", "296468138/0300", "2018-04-01", "2024-04-21");
 


    const port = process.env.PORT || 8080;
    const server = http.createServer(app);
    server.listen(port);
  
  } catch (error) {
    console.log("Error: ", error);
  }
}

var ficDocVedeniU = {
  fd_id: 1,
  account_number: 548001,
  currency: "CZK",
  var_sym: null,
  buc: null,
  smer_kod: null,
  date: "0001-01-01",
  description: "Za vedení účtu, výpi"
}

var botVedeniU = {
  bot_name: "Vedeni uctu",
  bot_type: "accounting",
  company_name: "test",
  bank_account: "296468138/0300",
  move_type: "off",
  doc_type: "off", 
  fictional_document_number: 1,
  begin_active: "2020-04-01",
  end_active: "2024-04-21",
  pair_by_var_sym: false,
  pair_by_amount: false,
  rounding_config: "off",
  rounding: 0,
  currency: "CZK",
  pair_by_currency: false,
  pair_by_company: false,
  pair_company_name: null,
  pair_by_date: false,
  pair_by_due_date: false,
  underhead: 0,
  overhead: 0,
  pair_by_bank_account: false,
  pair_by_description: true
}

var uroky = {
  fd_id: 2,
  account_number: 648001,
  currency: "CZK",
  buc: null,
  smer_kod: null,
  var_sym: null, 
  date: "0001-01-01",
  description: "Zúčtování kladných ú"
}

var botUroky = {
  bot_name: "uroky",
  bot_type: "accounting",
  company_name: "test",
  bank_account: "296468138/0300",
  move_type: "off",
  doc_type: "off",
  fictional_document_number: 2,
  begin_active: "2020-04-01",
  end_active: "2024-04-21",
  pair_by_amount: false,
  rounding_config: "off",
  rounding: 0,
  currency: "CZK",
  pair_by_currency: false,
  pair_by_company: false,
  pair_company_name: null,
  pair_by_date: false,
  pair_by_due_date: false,
  underhead: 0,
  overhead: 0,
  pair_by_bank_account: false,
  pair_by_var_sym: false,
  pair_by_description: true
}

var fdocPrikaz = {
  fd_id: 3,
  account_number: 325001,
  currency: "CZK",
  buc: "7770227",
  smer_kod: "code:0100",
  var_sym: null, 
  date: "0001-01-01",
  description: null,
  amount: 190
}

var botPrikaz = {
  bot_name: "Prikaz",
  bot_type: "accounting",
  company_name: "test",
  bank_account: "296468138/0300",
  move_type: "off",
  doc_type: "off",
  fictional_document_number: 3,
  begin_active: "2020-04-01",
  end_active: "2024-04-20",
  pair_by_var_sym: false,
  pair_by_amount: true,
  rounding_config: "off",
  rounding: 0,
  currency: "CZK",
  pair_by_currency: false,
  pair_by_company: false,
  pair_company_name: null,
  pair_by_date: false,
  pair_by_due_date: false,
  underhead: 0,
  overhead: 14,
  pair_by_bank_account: true,
  pair_by_description: false
}

var fdocPijemEko = {
  fd_id: 4,
  account_number: 324001,
  currency: "CZK",
  buc: "263641272",
  smer_kod: "code:0300",
  var_sym: "64832694", 
  date: "0001-01-01",
  description: null,
  amount: null
}

var botPrijemEko = {
  bot_name: "Prijem Ekonom",
  bot_type: "accounting",
  company_name: "test",
  bank_account: "296468138/0300",
  move_type: "off",
  doc_type: "off",
  fictional_document_number: 4,
  begin_active: "2020-04-01",
  end_active: "2024-04-20",
  pair_by_var_sym: true,
  pair_by_amount: false,
  rounding_config: "off",
  rounding: 0,
  currency: "CZK",
  pair_by_currency: false,
  pair_by_company: false,
  pair_company_name: null,
  pair_by_date: false,
  pair_by_due_date: false,
  underhead: 0,
  overhead: 0,
  pair_by_bank_account: true,
  pair_by_description: false
}

var fdocPijemEPou = {
  fd_id: 5,
  account_number: 324001,
  currency: "CZK",
  buc: "1510700001",
  smer_kod: "code:0300",
  var_sym: "2019", 
  date: "0001-01-01",
  description: null,
  amount: null
}

var botPrijemPou = {
  bot_name: "Prijem Poupova",
  bot_type: "accounting",
  company_name: "test",
  bank_account: "296468138/0300",
  move_type: "off",
  doc_type: "off",
  fictional_document_number: 5,
  begin_active: "2020-04-01",
  end_active: "2024-04-20",
  pair_by_var_sym: true,
  pair_by_amount: false,
  rounding_config: "off",
  rounding: 0,
  currency: "CZK",
  pair_by_currency: false,
  pair_by_company: false,
  pair_company_name: null,
  pair_by_date: false,
  pair_by_due_date: false,
  underhead: 0,
  overhead: 0,
  pair_by_bank_account: true,
  pair_by_description: false
}

async function restart() {
  await querys.deleteAllFicDoc();
  await querys.deleteAllBots();

  
  await querys.addFicDoc(ficDocVedeniU);
  await querys.addFicDoc(uroky);
  await querys.addFicDoc(fdocPrikaz);
  await querys.addFicDoc(fdocPijemEko);
  await querys.addFicDoc(fdocPijemEPou);
  await querys.addBot(botVedeniU);
  await querys.addBot(botUroky);
  await querys.addBot(botPrikaz);
  await querys.addBot(botPrijemEko);
  await querys.addBot(botPrijemPou);
}
 
main();
