import express from "express";
import Flight from "../models/Flight.js";
import authToken from "../middleware/auth.js";


const router = express.Router();

// @route   GET /api/flights
// @desc    GET all flights
// @access  private
router.get('/', authToken, async (req, res) => {
    try {
        const flights = await Flight.find();
        console.log(flights);
        res.json(flights);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    }
});


// @route   POST api/flights
// @desc    GET flights based on filters provided in req.body
// @access  private
router.post('/search', authToken, async (req, res) => {
    try {
        console.log("Entered try");
        let q = {};
        q['$and'] = []
        console.log(req.body);

        if(req.body === null || Object.keys(req.body).length === 0) {
            console.log('Entered body null or empty');
            res.status(400).json('Provide at least one filter');
            return;
        }

        if(req.body.origin) {
            console.log("Origin not null");
            q['$and'].push({source: req.body.source});
        }

        if(req.body.destination) {
            console.log("Destination not null");
            q['$and'].push({destination: req.body.destination});
        }

        if(req.body.departureDateTime) {
            console.log("Departure Date Time not null");
            q['$and'].push({departureDateTime: req.body.departureDateTime});
        }

        if(req.body.arrivalDateTime) {
            console.log("Arrival Date Time not null");
            q['$and'].push({arrivalDateTime: req.body.arrivalDateTime});
        }

        if(req.body.flightNo) {
            console.log("Flight No not null");
            q['$and'].push({flightNo: req.body.flightNo});
        }

        if(req.body.name && req.body.name.length > 0) {
            console.log("Name array not null");
            q['$and'].push({name: {$in: req.body.name}});
        }

        if(req.body.lessThanPrice && req.body.greaterThanPrice) {
            console.log("Price range not null");
            if(lessThanPrice <= greaterThanPrice) {
                res.json("Error. Price range is invalid");
            }
            q['$and'].push({$range: [req.body.lessThanPrice, req.body.greaterThanPrice]});
        }

        else if(req.body.lessThanPrice) {
            console.log("Less than price not null");
            q['$and'].push({$lte: req.body.lessThanPrice});
        }

        else if(req.body.greaterThanPrice) {
            console.log("Greater than price not null");
            q['$and'].push({$gte: req.body.greaterThanPrice});
        }

        const flights = await Flight.find(q);

        console.log(flights);

        res.json(flights);

    } catch (err) {
        console.log("Entered catch");
        console.log(err.message);
    }
});


router.post('/insert', authToken, async (req, res) => {
    try {
        await Flight.insertMany(req.body);
        res.json('Inserted');
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
});

export default router;
