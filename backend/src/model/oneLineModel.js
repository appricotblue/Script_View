const { mongoose } = require("mongoose");

const OneLineSchema = mongoose.model("oneline", {
    title: {
        type: String,
    },
    oneLiners: [
        {
            location: {
                type: String,
            },
            scene: {
                type: String,
            },
            time: {
                type: String,
            },
            IntOrExt: {
                type: String,
            },
            Action: {
                type: String,
            },
            Character: {
                type: String,
            },
        },
    ],
});

module.exports = OneLineSchema;
