const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id",
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR(15),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "description",
      autoIncrement: false
    },
    id_project: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_project",
      autoIncrement: false,
      references: {
        key: "id",
        model: "project_model"
      }
    }
  };
  const options = {
    tableName: "activity",
    comment: "",
    indexes: []
  };
  const ActivityModel = sequelize.define("activity_model", attributes, options);
  return ActivityModel;
};