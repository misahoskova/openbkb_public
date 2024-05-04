module.exports = (sequelize, Sequelize) => {
  const FicDoc = sequelize.define("fictional_document", {
    fd_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    account_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    amount: {
      type: Sequelize.REAL,
      allowNull: true
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: true
    },
    var_sym: {
      type: Sequelize.STRING,
      allowNull: true
    },
    iban: {
      type: Sequelize.STRING,
      allowNull: true
    },
    buc: {
      type: Sequelize.STRING,
      allowNull: true
    },
    smer_kod: {
      type: Sequelize.STRING,
      allowNull: true
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    company: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return FicDoc;
}