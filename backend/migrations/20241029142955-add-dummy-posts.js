"use strict";

const dummyPosts = [
  {
    userId: 1,
    content: "Hello, this is my first post!",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/54/6c/26/546c26bd-38da-2141-e1e4-64c03364a8eb/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/1200x630wa.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 1,
    content: "IM DEADPOOL!",
    imageUrl:
      "https://www.greenscene.co.id/wp-content/uploads/2023/02/dead-3.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Posts", dummyPosts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
