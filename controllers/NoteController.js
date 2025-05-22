// import { where } from "sequelize";
// import Note from "../models/NoteModel.js";

// export const getNotes = async (req, res) => {
//   try {
//     const response = await Note.findAll();
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const getNoteByID = async (req, res) => {
//   try {
//     const response = await Note.findOne({
//       where: {
//         id: req.params.id
//       }
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const createNote = async (req, res) => {
//   try {
//     await Note.create(req.body);
//     res.status(201).json({ msg: "Note Dibuat" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const updateNote = async (req, res) => {
//   try {
//       await Note.update(req.body, {
//           where: {
//             id: req.params.id
//         }
//     });
//     res.status(201).json({ msg: "Note Di Update" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const deleteNote = async (req, res) => {
//   try {
//       await Note.destroy({
//           where: {
//             id: req.params.id
//         }
//     });
//     res.status(201).json({ msg: "Note Di Hapus" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

import Note from "../models/NoteModel.js";

// ✅ Ambil semua note milik user yang login
export const getNotes = async (req, res) => {
  try {
    const response = await Note.findAll({
      where: {
        userId: req.userId  // Hanya note milik user login
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Ambil 1 note berdasarkan ID dan pastikan milik user login
export const getNoteByID = async (req, res) => {
  try {
    const response = await Note.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!response) return res.status(404).json({ message: "Note tidak ditemukan" });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Buat note baru untuk user login
export const createNote = async (req, res) => {
  try {
    await Note.create({
      ...req.body,
      userId: req.userId  // Pastikan userId diset dari token
    });
    res.status(201).json({ msg: "Note Dibuat" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update note yang hanya milik user login
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!note) return res.status(404).json({ message: "Note tidak ditemukan" });

    await Note.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ msg: "Note Diupdate" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Hapus note yang hanya milik user login
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });

    if (!note) return res.status(404).json({ message: "Note tidak ditemukan" });

    await Note.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ msg: "Note Dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
