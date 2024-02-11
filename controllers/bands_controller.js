//DEPENDENCIES
const bands = require('express').Router();
const db = require('../models');
const { Band, MeetGreet, Event, SetTime } = db;
const { Op } = require('sequelize');
const meet_greet = require('../models/meet_greet');

//READ- FIND ALL BANDS
bands.get('/', async (req, res) => {
  try {
      const foundBands = await Band.findAll({
        order: [ [ 'available_start_time', 'ASC'] ],
        where: {
          name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
        }
      })
      res.status(200).json(foundBands)
  } catch (error) {
      res.status(500).json(error)
  }
})

// READ - FIND SPECIFIC BAND
bands.get('/:name', async (req, res) => {
  try {
      const foundBand = await Band.findOne({
          where: { name: req.params.name },
          include: [
              {
                  model: MeetGreet,
                  as: 'meet_greet',
                  include: {
                      model: Event,
                      as: 'event',
                      where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                  }
              },
              {
                  model: SetTime,
                  as: 'set_times',
                  include: {
                      model: Event,
                      as: 'event',
                      where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                  }
              }
          ]
      })
      res.status(200).json(foundBand)
  } catch (error) {
      res.status(500).json(error)
  }
})

  //CREATE 
  bands.post('/', async (req, res) => {
    try {
      const newBand = await Band.create(req.body);
      res.status(200).json({
        message: 'Successfully inserted a new band',
        data: newBand
      })
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATE
  // UPDATE - Update a Band
bands.put('/:id', async (req, res) => {
    try {
      const updatedBands = await Band.update(req.body, {
        where: { band_id: req.params.id }
      });
      res.status(200).json({
        message: `Successfully ${updatedBands} band(s)`,
        data: updatedBands
      })
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE 
  // DELETE - Delete a Band
bands.delete('/:id', async (req, res) => {
    try {
      const deletedBands = await Band.destroy({
        where: { band_id: req.params.id }
      });
      res.status(200).json({
        message: `Successfully ${deletedBands} band(s)`
      })
    } catch (err) {
      res.status(500).json(err);
    }
  });

//EXPORT
module.exports = bands;
