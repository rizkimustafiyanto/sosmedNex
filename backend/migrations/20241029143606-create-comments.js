"use strict";

const dummyComments = [
  {
    postId: 1,
    userId: 1,
    content: "This is a great post!",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    postId: 1,
    userId: 2,
    content: "I totally agree with you!",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    postId: 2,
    userId: 1,
    content: "Thanks for sharing!",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Comments", dummyComments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
