const mongoose = require('mongoose');

const relationshipsModel = mongoose.model('relationships', {
    //require all fields of the data

    _id: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    
    name: {
        type: String,
        require: true
    },
    dose: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    cost: {
        type: String,
        require: true
    }
});

module.exports = relationshipsModel;