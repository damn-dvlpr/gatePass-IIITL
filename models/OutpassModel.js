const mongoose=require("mongoose");

var outpassSchema = new mongoose.Schema({                          //for everytime he goes out
    outTime: {
        type: Date,
        default: Date.now()
    },
    reason: String,
    inTime: {
        type: Date,
    },
});
module.exports = mongoose.model('Outpass', outpassSchema);
