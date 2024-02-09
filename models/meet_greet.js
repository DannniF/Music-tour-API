'use strict';
const {
  Model, foreignKey
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meet_greet extends Model {

    static associate({ Band, Event}) {
      //band relation
      meet_greet.belongsTo(Band,{
         foreignKey: 'band_id',
        as: 'band'
      })
       
      meet_greet.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      })
    }
  }
  meet_greet.init({
    set_time_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    stage_id: DataTypes.INTEGER,
    band_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meet_greet',
  });
  return meet_greet;
};