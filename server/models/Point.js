const mongoose = require('mongoose');

const PointSchema = mongoose.Schema({
    pointType: {
        type: String,
        enum: ['cups', 'batteries', 'electronics'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    description: String,
});

module.exports = mongoose.model('points', PointSchema);
