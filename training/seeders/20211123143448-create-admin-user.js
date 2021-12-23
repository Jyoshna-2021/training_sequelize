'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userinfo', [{
        userId: "47f96ec4-2d07-4fd1-8bba-f7681b8a83e6",
         firstname: 'admin',
         emailId: "admin@tringapps.com",
         age: 22,
         phoneNumber: 237637263,
         address: "test",
         createdAt: "2021-11-23 13:28:03",
         updatedAt: "2021-11-23 13:28:03"
       }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
