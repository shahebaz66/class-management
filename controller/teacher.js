const db = require('../db/db')

module.exports.getData = async (req, res) => {
    try {
        const user = await db.User.findOne({ _id: req.user._id })
        .populate('classroom myclasses')
        .populate('classroom.students')
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ message: "server error" })
    }
}
const mongoose = require('mongoose');

module.exports.createClass = async (req, res) => {
    try {
        req.body.teacherId = req.user._id
        const newclass = await db.Class.create(req.body);
        req.user.classroom.push(newclass._id);
        req.user.save();
        res.status(200).json({ message: "class created" });
    } catch (e) {
        res.status(500).json({ message: "server error" })
    }
}
module.exports.updateClass = async (req, res) => {
    try {
        const newclass = await db.Class.findByIdAndUpdate(req.body.id,{title:req.body.title});
        res.status(200).json({ message: "class updated" });
    } catch (e) {
        res.status(500).json({ message: "server error" })
    }
}
module.exports.deleteClass = async (req, res) => {
    try {
        const newclass = await db.Class.findByIdAndRemove(req.body.id);
        res.status(200).json({ message: "class removed" });
    } catch (e) {
        res.status(500).json({ message: "server error" })
    }
}

