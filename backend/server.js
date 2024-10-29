const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Mengizinkan permintaan dari berbagai sumber
app.use(bodyParser.json()); // Untuk parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // Untuk parsing application/x-www-form-urlencoded

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/posts", likeRoutes);
app.use("/api/auth", authRoutes);

// Sync database and start server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    return sequelize.sync(); // Meng-sinkronisasi model dengan database
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
