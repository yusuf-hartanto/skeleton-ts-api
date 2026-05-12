'use strict';

import { v4 as uuidv4 } from 'uuid';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class ParamGlobal extends Model {
  declare id: string;
  declare param_key: string;
  declare param_value: string;
  declare param_desc: string;
  declare status: number;
  declare created_by: string;
  declare updated_by: string;
}

export function initParamGlobal(sequelize: Sequelize) {
  ParamGlobal.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      param_key: {
        type: DataTypes.STRING(100),
      },
      param_value: {
        type: DataTypes.STRING,
      },
      param_desc: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'ParamGlobal',
      tableName: 'app_param_global',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  ParamGlobal.beforeCreate((app_param_global) => {
    app_param_global?.setDataValue('id', uuidv4());
  });
  return ParamGlobal;
}

export function associateParamGlobal() {}

export default ParamGlobal;
