const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
    planTitle: {
        type: String,
        required: ' require plan name',
        required: true
    },
    billingCycle: {
        type: String,
        enum: ["Monthly", "Yearly", "Free Demo"],
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    subscribeButtonText: {
        type: String,
        default:'Subscribe Now'
    },
    isRecomended: {
        type: Boolean,
        default: false
    },
},
{ timestamps: true });

const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);

module.exports = SubscriptionModel;