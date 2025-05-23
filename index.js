// import express from "express";
// import cors from "cors";
// import NoteRoute from "./routes/NoteRoute.js";
// import "./models/UserModel.js";


// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(NoteRoute);


// app.listen(5000, () => console.log('Server running on port 5000'));
// import db from "./config/Database.js";
// import Users from "./models/UserModel.js";
// import Notes from "./models/NoteModel.js";

// // Relasi
// Users.hasMany(Notes, { foreignKey: "userId", onDelete: "CASCADE" });
// Notes.belongsTo(Users, { foreignKey: "userId" });

// // Sinkronisasi semua tabel
// (async () => {
//   try {
//     await db.authenticate();
//     console.log("Koneksi database berhasil!");

//     await db.sync({ alter: true });
//     console.log("Semua tabel berhasil disinkronisasi.");
//   } catch (err) {
//     console.error("Gagal konek DB:", err);
//   }
// })();

// export { Users, Notes };

import express from "express";
import cors from "cors";
import route from "./routes/index.js"; // <- import dari routes/index.js
import "./models/index.js"; 
import cookieParser from "cookie-parser";

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(NoteRoute);
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// app.use(cors(corsOptions));
app.use(cors({
  origin: [
    "https://notes-fe-fadhil-dot-f-05-450706.uc.r.appspot.com",
    "http://localhost:3000", // Tambahkan localhost untuk pengembangan lokal
  ],
  credentials: true // ⬅️ WAJIB supaya cookie diterima/dibaca
}));
// app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(route); // pasang semua route

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

