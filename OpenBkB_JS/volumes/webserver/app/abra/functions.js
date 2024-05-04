const https = require("https");
var functions = [];
const username = "username";
const password = "password";

functions.compareBankAcounts =  (iban1, bankAcount1, iban2, bankAcount2 ) => {
  if((iban1 === ""|| iban1 === null) && (iban2 === "" || iban2 === null) ){

    return bankAcount1 === bankAcount2;
  }
  else if(iban1 === "" || iban1 === null){
    var bankCode = iban2.slice(4, 8);
    var bankAccountPrefix = parseInt(iban2.slice(8, 14));
    var bankAccountNumber = parseInt(iban2.slice(14, 24));
    var localBankAcount = "";
    if(bankAccountPrefix === 0){
      (localBankAcount) = (bankAccountNumber) + "/" + bankCode;
    }
    else{
      localBankAcount = bankAccountPrefix + "-" + bankAccountNumber + "/" + bankCode;
    }
    return localBankAcount === bankAcount1;
  }
  else if(iban2 === "" || iban2 === null){
    var bankCode = iban1.slice(4, 8);
    var bankAccountPrefix = parseInt(iban1.slice(8, 14));
    var bankAccountNumber = parseInt(iban1.slice(14, 24)); 
    var localBankAcount = "";
    if(bankAccountPrefix === 0){
      localBankAcount = bankAccountNumber + "/" + bankCode;
    }
    else{
      localBankAcount = bankAccountPrefix + "-" + bankAccountNumber + "/" + bankCode;
    }
    return localBankAcount === bankAcount2;
  }
  else{
      return iban1 === iban2;
  }
};

functions.matchingCriteria = (data, bank, bot) => {
  var index = bot.rounding;
  var sumCelkem = 0;
  var bankSumCelkem = 0;

  var datVyst = new Date(data.datVyst.slice(0, 10));
  var datSplat = new Date(data.datSplat.slice(0, 10));
  if(!bot.pair_by_due_date){
    datSplat = new Date(data.datVyst.slice(0, 10));
  }
  datSplat.setDate(datSplat.getDate() + bot.overhead);
  datVyst.setDate(datVyst.getDate() - bot.underhead); 
 
  var datPlad = new Date(bank.datVyst.slice(0, 10));

  if(bot.rounding_config === "mathematical"){
    sumCelkem = ((parseFloat(data.sumCelkem)/ 10**index).toFixed(2 ) * 10**index).toFixed(2);
    bankSumCelkem = ((parseFloat(bank.sumCelkem)/ 10**index).toFixed(2 ) * 10**index).toFixed(2);
  }
  else if(bot.rounding_config === "up"){
    sumCelkem = Math.ceil(parseFloat(data.sumCelkem) / 10**index) * 10**index;
    bankSumCelkem = Math.ceil(parseFloat(bank.sumCelkem) / 10**index) * 10**index;
  }
  else if(bot.rounding_config === "down"){
    sumCelkem = Math.floor(parseFloat(data.sumCelkem) / 10**index) * 10**index;
    bankSumCelkem = Math.floor(parseFloat(bank.sumCelkem) / 10**index) * 10**index;
  }
  else if(bot.rounding_config === "off"){
    sumCelkem = data.sumCelkem;
    bankSumCelkem = bank.sumCelkem; 
  }
  else{
    return false;
  }

  var bankAcount = ""
  if(bank.buc != "" && bank.smerKod != "" && bank.buc != null && bank.smerKod != null){
    bankAcount = bank.buc + "/" + bank.smerKod.slice(5,9);
  }

  var dataAcount = "";
  if(data.buc != "" && data.smerKod != "" && data.buc != null && data.smerKod != null){
    dataAcount = data.buc + "/" + data.smerKod.slice(5,9);
  }
  var result =  (
    (bank.typPohybuK === "typPohybu.prijem"                                                                                                             || !(bot.move_type === "income")) &&
    (bank.typPohybuK === "typPohybu.vydej"                                                                                                              || !(bot.move_type === "outlay") ) &&
    (((data.varSym === bank.varSym)  &&  (data.varSym != null && data.varSym != "") && (bank.varSym != null && bank.varSym != ""))                      || !bot.pair_by_var_sym) &&
    (((data.nazFirmy === bank.nazFirmy)  &&  (data.nazFirmy != null && data.nazFirmy != "") && (bank.nazFirmy != null && bank.nazFirmy != ""))          || !bot.pair_by_company) &&
    ((functions.compareBankAcounts(data.iban, dataAcount, bank.iban, bankAcount))                                                                       || !bot.pair_by_bank_account) &&
    ((parseFloat(sumCelkem) === parseFloat(bankSumCelkem) && sumCelkem != 0 && bankSumCelkem != 0)                                                                              || !bot.pair_by_amount) &&
    (data.mena === bank.mena                                                                                                                            || !bot.pair_by_currency) &&
    ((datPlad >= datVyst && datPlad <= datSplat)                                                                                                        || !(bot.pair_by_date)) &&
    ((data.popis === bank.popis && data.popis != null && data.popis != "")                                                                              || !bot.pair_by_description)
  );
  return result;
};

async function getResponse(url, options) {
  const response = await new Promise((resolve, reject) => {
    https
      .get(url, options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
  return JSON.parse(response);
};

async function postResponse(options, body) {
  const response = await new Promise((resolve, reject) => {
    const req = https
      .request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });

    req.write(body, "utf8");
    req.end();
  });
  return JSON.parse(response);
};

functions.getData = async (hostname, company, path) =>{
  try {
    const options = {
      auth: `${username}:${password}`,
    };

    var url = "https://" + hostname + "/c/" + company  + path;
    var data = await getResponse(url, options);
    return data;
  } catch (error) {
    console.error("Error getting data:", error);
  }
};

functions.sendData = async (hostname, company, path, jsonData) =>  {
  try {
    var options = {
      hostname: hostname,
      port: 443,
      path: "/c/" + company + path,
      method: "POST",
      auth: `${username}:${password}`,
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
        "Content-Length": JSON.stringify(jsonData).length,
        Accept: "*/*",
        "User-Agent": "PostmanRuntime/7.36.3",
      },
    };

    var response = await postResponse(options, JSON.stringify(jsonData));
    console.log("send:", response.winstrom.success);
  } catch (error) { 
    console.error("Error sending data:", error);
  }
};

module.exports = functions;