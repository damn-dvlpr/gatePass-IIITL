const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const saltRounds = 10;
var userSchema = new mongoose.Schema({                        //for maintaining every student's database
    name: String,
    phone: Number,
    password: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        unique: true,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    outPassInformation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Outpass"
        }
    ]
});

userSchema.pre("save", function (next) {                   //before saving password, hashing it
    var user = this;
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

module.exports = mongoose.model('User', userSchema);