const stages = require('express').Router();
const db = require('../models');
const { Stage, Event} = db;
const { Op } = require('sequelize');

//READ - Find All Stages
stages.get('/', async (req, res ) => {
    try {
        const foundStages = await Stage.findAll({
            order: [ ['avaiable_start_time', 'ASC']],
            where: {
                name: {  [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        });
        res.status(200).json(foundStages);
    } catch (error) {
        res.status(500).json(error);
    }
})

//READ - FIND SPECIFIC Stage
stages.get('/:name', async(req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: {stage_id: req.params.id},
    
        });
        res.status(200).json(foundStage);
    } catch (err) {
        res.status(500).json(err);
    }
})

//CREATE
stages.post('/', async(req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Successfully inserted a new Stage',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(err);
    }
});

//UPDATE
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {stage_id: req.params.id}
        });
        res.status(200).json({
            message: `Succesfully ${updatedStages} Stage(s)`,
            data: updatedStages
        })
    } catch (error) {
        res.status(500).json(err);
    }
});

stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: { band_id: req.params.id}
        });
        res.status(200).json({
            message: `Succesfully ${deletedStages} band(s)`
        })
    } catch (error) {
        res.status(500).json(err);
    }
})


module.exports = stages