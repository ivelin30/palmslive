require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.ALLOW_ADDRESS],
  methods: ["GET", "POST"],
  credentials: true,
}));

// Serve static files from the public directory

app.use('/uploads',express.static(path.join(__dirname, 'uploads'), {
  etag: false,
  maxAge: '1w',
}));

app.use(express.static(path.join(__dirname, "build")));


//ROUTERS
const authRouters = require('./routes/auth');
const userRouters = require('./routes/user');
const studioRouters = require('./routes/studio');
const staffRouters = require('./routes/staff');
const materialsRouters = require('./routes/materials');
const inventoryRouters = require('./routes/inventory');

app.use('/api/user', userRouters);
app.use('/api/auth', authRouters);
app.use('/api/studio', studioRouters);
app.use('/api/staff', staffRouters);
app.use('/api/materials', materialsRouters);
app.use('/api/inventory', inventoryRouters);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

//SERVER START
app.listen(process.env.PORT, () => {
  console.log('Server is running!');
});

