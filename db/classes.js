const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mySchema = new Schema({

    title: String,
    teacherId: {
    
            type: Schema.Types.ObjectId,
            ref: 'User'
        
    },
    students: {
        type: [
            {
                type: Schema.Types.ObjectId,
                 ref: 'User'
            }
        ], default: []
    }

}, { timestamps: true });


const Class = mongoose.model('Class', mySchema);
module.exports = Class