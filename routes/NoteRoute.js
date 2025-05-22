// import  express  from "express";
// import { getNotes,
//         getNoteByID,
//         createNote,
//         updateNote,
//         deleteNote}
//         from "../controllers/NoteController.js";

// const router = express.Router();

// router.get('/notes',getNotes);
// router.get('/notes/:id',getNoteByID);
// router.post('/notes',createNote);
// router.patch('/notes/:id',updateNote);
// router.delete('/notes/:id',deleteNote);


// export default router;

import express from "express";
import { getNotes, getNoteByID, createNote, updateNote, deleteNote } from "../controllers/NoteController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/notes', verifyToken, getNotes);
router.get('/notes/:id', verifyToken, getNoteByID);
router.post('/notes', verifyToken, createNote);
router.patch('/notes/:id', verifyToken, updateNote);
router.delete('/notes/:id', verifyToken, deleteNote);

export default router;
