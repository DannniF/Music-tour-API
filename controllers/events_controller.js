const events = require('express').Router();
const db = require('../models');
const { Event } = db;

//READ - Find All Events
events.get('/', async (req, res ) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ ['avaiable_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name}%}`}
            }
        });
        res.status(200).json(foundEvents);
    } catch (error) {
        res.status(500).json(error);
    }
})

//READ - FIND SPECIFIC Event
events.get('/:id', async(req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {event_id: req.params.id}
        });
        res.status(200).json(foundEvent);
    } catch (err) {
        res.status(500).json(err);
    }
})

//CREATE
events.post('/', async(req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(err);
    }
});

//UPDATE
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {event_id: req.params.id}
        });
        res.status(200).json({
            message: `Succesfully ${updatedEvents} event(s)`,
            data: updatedEvents
        })
    } catch (error) {
        res.status(500).json(err);
    }
});

events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: { band_id: req.params.id}
        });
        res.status(200).json({
            message: `Succesfully ${deletedEvents} band(s)`
        })
    } catch (error) {
        res.status(500).json(err);
    }
})


module.exports = events