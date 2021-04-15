const mongoose = require('mongoose');

var records = new mongoose.Schema({
    key: { type: String },
    value: { type: String },
    counts: { type: Array },
    createdAt:{ type: Date, default: Date.now},
    startDate:{ type: Date, default: Date.now},
    endDate: {type: Date, default: Date.now},
});

var ttcontent = mongoose.model('record', records);
module.exports = ttcontent;
