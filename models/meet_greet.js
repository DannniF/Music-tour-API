'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meet_greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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