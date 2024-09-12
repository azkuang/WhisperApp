const express = require('express');
const { 
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote } = require('../Controllers/noteController');

const router = express.Router();

// GET all notes
router.get('/', getNotes);

// GET single note
router.get('/:id', getNote);

// POST new notes
router.post('/', createNote);

// DELETE notes
router.delete('/:id', deleteNote);

// UPDATE notes
router.patch('/:id', updateNote);

module.exports = router;