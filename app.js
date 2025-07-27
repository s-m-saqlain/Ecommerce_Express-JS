const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

// Middleware
app.use(express.json());

// Routes
// app.use('/api/buyer', require('./routes/buyer.routes'));
// app.use('/api/seller', require('./routes/seller.routes'));
// app.use('/api/admin', require('./routes/admin.routes'));
app.use("/api/auth", require("./routes/auth.routes")); // ✅ Very important line

// Connect DB and start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
