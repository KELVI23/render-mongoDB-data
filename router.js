//require dependencies
const express = require('express');
const router = new express.Router();

//define API and require relationships controller
const relationshipsController = require('./app/controllers/relationships');
router
    .get("/api/relationships" , relationshipsController.relationships);

    //frontend controller and routes
    const frontendController = require('./app/controllers/frontend');
    router
        .get("/", frontendController.home) //excute function home when address gets requested
        .get("/visualization", frontendController.visualization);

        //export router
        module.exports = router;