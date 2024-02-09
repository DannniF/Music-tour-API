'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {

    static associate({ meet_greet, Set_Time }) {
      //meet and greets for Band
      //chose Band.hasMany cause this is  a one to many relationship
      Band.hasMany(meet_greet, {
        foreignKey: 'band_id',
        as: 'meet_greets'
      });

      Band.hasMany(Set_Time, {
        foreignKey: 'band_id',
        as: 'set_times'
      });
    }
  }
  Band.init({
    band_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    available_start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
    timestamps: false,
  });
  return Band;
};