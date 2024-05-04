const https = require("https");
const functions = require("./functions");

/**
 * The URL for the received invoice API.
 * @type {string}
 */

const serverUrl = "demo.flexibee.eu";
const sufixUrl = "/(stavUhrK is null).json?limit=500&detail=full";
const bankUrl = "/banka/(sparovano eq false and protiUcet is empty).json?limit=500&detail=full";

/**
 * Creates relations data based on matched pairs.
 * @param {Array} matchedPairs - An array of matched pairs.
 * @returns {Object} - The relations data in JSON format.
 */

function createRelations(matchedPairs) {
  var relationsData = [];

  for (var { data, bank } of matchedPairs) {
    relationsData.push({
      id: `code:${bank.kod}`,
      sparovani: {
        uhrazovanaFak: `code:${data.kod}`,
        zbytek: "ignorovat",
      },
    });
  }
 
  const relationsJsonData = {
    winstrom: { "@version": "1.0", banka: relationsData },
  };
  return relationsJsonData;
}

/**
 * Performs the pairing function to match invoices, commitments, claims, and banks.
 * @returns {Promise<void>} A promise that resolves when the pairing function is completed.
 */

pairing = [];
pairing.pairing = async (bot) => {
  try {
    var types = [];
    if (bot.doc_type == "received_invoice") {
      types.push("faktura-prijata");
    }
    else if(bot.doc_type == "issued_invoice"){  
      types.push("faktura-vydana");
    }
    else if(bot.doc_type == "commitment"){
      types.push("zavazek");
    }
    else if(bot.doc_type == "claim"){
      types.push("pohledavka");
    }
    else if(bot.doc_type == "off"){
      types.push("faktura-prijata");
      types.push("faktura-vydana");
      types.push("zavazek");
      types.push("pohledavka");
    }
    
    var banks = [];
    var bankData = await functions.getData(serverUrl, bot.company_name, bankUrl); 
    banks = bankData.winstrom["banka"];
    for (var type of types) {
      var docs = []; 
      var docData = await functions.getData(serverUrl, bot.company_name, "/" + type + sufixUrl);
      docs = docData.winstrom[type];
     

      var matchedPairs = [];
      
      for (var i = 0; i < banks.length; i++) {
        var bank = banks[i];
        if (bank.sparovano === "true" && bank.protiUcet != null) {
          continue;
        }

        for (var j = 0; j < docs.length; j++) {
          var doc = docs[j];
          if (doc.stavUhrK === "stavUhr.uhrazeno") { 
            continue;
          }
            if (functions.matchingCriteria(doc, bank, bot)) {  
              matchedPairs.push({ data: doc, bank });
              banks[i].sparovano = "true";
              docs[j].stavUhrK = "stavUhr.uhrazeno"; 
              break;
            }
        }
      }
      console.log(bot.bot_name, "-" , bot.doc_type, "-" , type, ",", "Matched pairs:" ,matchedPairs.length ,"/"  , docs.length, (matchedPairs.length/docs.length) * 100, "%");
      if(matchedPairs.length != 0){
        var relationsReady = createRelations(matchedPairs);
        await functions.sendData(serverUrl, bot.company_name, "/banka.json", relationsReady);
      }
    } 
  } catch (error) { 
    console.error(error); 
  }
};

module.exports = pairing;