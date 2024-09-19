const Note = require('../models/noteModel');
const mongoose = require('mongoose');

// get all notes
const getNotes = async (req, res) => {
    const notes = await Note.find({}).sort({ CreatedAt: -1 });
    res.status(200).json(notes);
};

// get single note
const getNote = async (req, res) => {
    const { id } = req.params;

    // Check if ID passed is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such note' });
    }

    const note = await Note.findById(id);

    if (!note) {
        return res.status(404).json({ error: 'No note found' });
    }

    res.status(200).json(note);
};

// create a new note
const createNote = async (req, res) => {
    const { title, contents } = req.body;

    // Adding data to DB
    try {
        const note = await Note.create({ title, contents });
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a note
const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No note found" });
    }

    const note = await Note.findOneAndDelete({ _id: id });

    if (!note) {
        return res.status(400).json({ error: "No note found" });
    }

    res.status(200).json(note);
}

// update a note
const updateNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No note found" });
    }

    const note = await Note.findOneAndUpdate({ _id: id }, { 
        ...req.body
    });

    if (!note) {
        return res.status(400).json({ error: "No note found" });
    }

    res.status(200).json(note);
}

module.exports = {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote
};