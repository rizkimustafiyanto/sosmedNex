"use strict";

const dummyPosts = [
  {
    userId: 1,
    content: "Hello, this is my first post!",
    imageUrl: "https://example.com/image1.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 1,
    content: "This is another post!",
    imageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Tambahkan data dummy lainnya sesuai kebutuhan
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Posts", dummyPosts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
