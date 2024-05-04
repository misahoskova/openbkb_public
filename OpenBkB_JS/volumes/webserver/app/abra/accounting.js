
const querys = require("../db/query");
const functions = require("./functions");


const serverUrl = "demo.flexibee.eu";
const bankUrl = "/banka/(sparovano eq false and protiUcet is empty).json?limit=500&detail=full";


/**
* Creates accounting data based on the provided accounting items, bot, and fdoc.
* @param {Array} accountingItems - The array of accounting items.
* @param {Object} bot - The bot object.
* @param {Object} fdoc - The fdoc object.
* @returns {Object} - The relationsJsonData object containing the accounting data.
*/

function createAccounting(accountingItems, bot, fdoc) {
  var accountingData = [];

  for (var item of accountingItems) {
    if ((bot.move_type === "income" && item.typPohybu === "typPohybu.prijem") ||
          (bot.move_type === "outlay" && item.typPohybu === "typPohybu.vydaj") ||
          (bot.move_type === "off")) {
      accountingData.push({
        "id": item.id,
        "kod": item.kod,
        "primUcet": item.primUcet,
        "protiUcet": `code:${fdoc.account_number}`,
        "zuctovano": "true"
      });
    }
  }
  var relationsJsonData = {
    winstrom: { "@version": "1.0", banka: accountingData },
  };
  return relationsJsonData;
};

/**
* Represents the fictional document retrieved from the database.
* @typedef {Object} FicDoc
* @property {number} fd_id - The ID of the fictional document.
* @property {string} fd_name - The name of the fictional document.
* @property {string} fd_description - The description of the fictional document.
* ...
*/

/**
* Retrieves the fictional document from the database based on the given criteria.
* @param {Object} criteria - The criteria to filter the fictional document.
* @param {number} criteria.fd_id - The ID of the fictional document to retrieve.
* @returns {Promise<FicDoc>} A promise that resolves to the fictional document.
*/

accounting = [];
accounting.accounting = async (bot) => {

  var bankData = await functions.getData(serverUrl, bot.company_name, bankUrl);
  var banks = bankData.winstrom["banka"];

  try {
    const ficdoc = await querys.getFicDocs({
      where: {
        fd_id: bot.fictional_document_number
      }
    });
    
    var doc = {};
    doc.varSym = ficdoc[0].var_sym;
    doc.mena = ficdoc[0].currency;
    doc.sumCelkem = ficdoc[0].amount;
    doc.nazFirmy = ficdoc[0].company;
    doc.iban = ficdoc[0].iban;
    doc.datVyst = ficdoc[0].date;
    doc.datSplat = ficdoc[0].date;
    doc.buc = ficdoc[0].buc;
    doc.smerKod = ficdoc[0].smer_kod;
    doc.kod = "fictional";
    doc.popis = ficdoc[0].description;

    var matchedPairs = []
    for (var bank of banks) {
      if (bank.sparovano === "true" && bank.protiUcet != null) {
        continue;
      }
      if(functions.matchingCriteria(doc, bank, bot)) {
        matchedPairs.push(bank);
        continue;
      }
    }
    console.log(bot.bot_name, "-" , bot.doc_type, ",", "Matched pairs:" ,matchedPairs.length ,"/"  , banks.length, (matchedPairs.length/banks.length) * 100, "%");
    if(matchedPairs.length != 0){
      var relationsReady = createAccounting(matchedPairs, bot, ficdoc[0]);
      await functions.sendData(serverUrl, bot.company_name, "/banka.json", relationsReady);
    }
  }
  catch (error) {
    throw error;
  }
};

module.exports = accounting;