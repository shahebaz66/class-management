const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mySchema = new Schema({

    name: { type: String, required: true },
    mobile: { type: String, unique: true },
    password: String,
    type: { type: String, enum: ['teacher', 'student'] },
    classroom: {
        type: [{
                type: Schema.Types.ObjectId, 
                ref: 'Class'
            
        }], default: []
    },
    myclasses: {
        type: [{
                type: Schema.Types.ObjectId, 
                ref: 'Class'
        }], default: []
    }
}, { timestamps: true });


const User = mongoose.model('User', mySchema);
module.exports = User