const express = require('express');
const router = express.Router();
const Point = require('../models/Point');

const getLatLongDiff = require('../utils/utils');

// get all points with details
router.get('/', async (req, res) => {
    try {
        const points = await Point.find();
        res.json(points);
    } catch (err) {
        res.json({ message: err });
    }
});

// get points in :range meters
// eg. http://localhost:3000/point/findInRange/52.394319/16.909855/700
router.get(
    '/findInRange/:latitude/:longitude/:rangeMeters/:type?',
    async (req, res) => {
        try {
            let { latitude, longitude, rangeMeters, type } = req.params;
            let { lat, long, lat_diff, long_diff } = getLatLongDiff(
                latitude,
                longitude,
                rangeMeters
            );

            let condition =
                type == null ? Point.schema.paths.pointType.enumValues : [type];

            const points = await Point.find({
                latitude: { $gte: lat - lat_diff, $lte: lat + lat_diff },
                longitude: {
                    $gte: long - long_diff,
                    $lte: long + long_diff
                },
                pointType: { $in: condition }
            });

            res.json(points);
        } catch (err) {
            res.json({ message: err });
        }
    }
);

// get specific point with details
router.get('/:id', async (req, res) => {
    try {
        const point = await Point.findById(req.params.id);
        res.json(point);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
