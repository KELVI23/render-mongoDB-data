const relationshipsModel = require('../models/relationships');

module.exports = {
    relationships: function(request, response){
        //find relationships
        relationshipsModel.find( function(error, results){
            //if error send response 500
            if(error){
                return response.status(500).send(error);
            } else{
                return response.status(200).send(results);
            }
        });
    }
};