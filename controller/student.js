const db = require('../db/db')

module.exports.getData = async (req, res) => {
    const allclasses = await db.Class.find().populate('teacherId', 'name');
    res.send(allclasses)
}

module.exports.joinclass = async (req, res) => {
    try {
        req.user.myclasses.push(req.body.classid);
        req.user.save();
        const classfound = await db.Class.findOne({ id: req.body.classid });
        classfound.students.push(req.user.id);
        res.status(200).json({ message: "added to class" })

    } catch (e) {
        res.status(500).json({ message: "error occured" })
    }
}
module.exports.leaveclass = async (req, res) => {
    try {
        const arr = req.user.myclasses.filter(i => i != req.body.classid)
        req.user.myclasses = arr;
        req.user.save();
        await db.Class.findByIdAndUpdate(
            req.body.classid,
            {
                $pull: {
                    students: {
                        $in: [req.user._id]
                    }
                }
            });
        
        res.status(200).json({ message: "removed from class" })

    } catch (e) {
        res.status(500).json({ message: "error occured" })
    }
}
module.exports.getmyclasses = async (req, res) => {
    try {
        const user=await db.User.findOne({_id:req.user.id}).populate('myclasses')
        res.status(200).json({myclasses:user.myclasses })

    } catch (e) {
        res.status(500).json({ message: "error occured" })
    }
}
