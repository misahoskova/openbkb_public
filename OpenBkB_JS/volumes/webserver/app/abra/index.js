const querys = require("../db/query");
const pairing = require("./pairing");
const db = require("../db/models");
const accounting = require("./accounting");
const Op = db.Sequelize.Op;

abra = {};

abra.run = async (company_name, bank_account, begin_date, end_date) => {
    try {
        const bots = await querys.getBots({
            where: {
                company_name: company_name,
                begin_active: {
                    [Op.gte]: begin_date
                },
                end_active: {
                    [Op.lte]: end_date
                },
                bank_account: bank_account
            }
        });
        for (var bot of bots) {
            if(bot.bot_type === "pairing") {
                await pairing.pairing(bot);
            }
            else if(bot.bot_type === "accounting") {
                await accounting.accounting(bot);
            }
            else {
                console.log("Unknown bot type:", bot.bot_name);
            }
        }
        console.log("Bots finished");
    } catch (err) {
        console.log("Chyba dotazu:", err);
    }
};

module.exports = abra;