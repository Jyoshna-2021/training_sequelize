'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('userinfo', {
      userId:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull : false
      },
      lastname: {
        type: DataTypes.STRING
      },
      age: {
        type: DataTypes.INTEGER
      },
      emailId: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      address: DataTypes.STRING,
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userinfo');
  }
};