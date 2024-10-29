"use strict";

const bcrypt = require("bcrypt");

const dummyUsers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: await bcrypt.hash("password123", 10), // Meng-hash password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: await bcrypt.hash("password456", 10), // Meng-hash password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", dummyUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
