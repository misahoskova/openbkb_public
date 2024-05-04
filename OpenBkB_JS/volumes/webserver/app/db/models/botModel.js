module.exports = (sequelize, Sequelize) => {
  const Bot = sequelize.define("bot", {
    bot_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bot_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    bot_type: {
      type: Sequelize.ENUM("pairing", "accounting"),
      allowNull: false
    },
    company_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bank_account: {
      type: Sequelize.STRING,
      allowNull: false
    },
    move_type: {
      type: Sequelize.ENUM("income", "outlay", "off"),
      allowNull: false
    },
    doc_type: {
      type: Sequelize.ENUM("issued_invoice", "received_invoice", "commitment", "claim", "off"),
      allowNull: false
    },
    fictional_document_number: {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true
    },
    begin_active: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    end_active: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    pair_by_var_sym: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    pair_by_amount: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    rounding_config: {
      type: Sequelize.ENUM("off", "up", "down", "mathematical"),
      allowNull: false
    },
    rounding: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pair_by_company: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    pair_company_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pair_by_date: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    pair_by_due_date : {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    underhead: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    overhead: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    pair_by_bank_account: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    pair_by_description: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  return Bot;
}