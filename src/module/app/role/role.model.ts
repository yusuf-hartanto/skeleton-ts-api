'use strict';

import { v4 as uuidv4 } from 'uuid';
import AppResource from '../resource/resource.model';
import AppRoleMenu from '../role.menu/role.menu.model';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class AppRole extends Model {
  declare role_id: string;
  declare role_name: string;
  declare status: number;
  declare restrict_level_area: number;
  declare created_by: string;
  declare updated_by: string;
}

export function initAppRole(sequelize: Sequelize) {
  AppRole.init(
    {
      role_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      role_name: {
        type: DataTypes.STRING,
        unique: true,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
      restrict_level_area: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      created_by: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'AppRole',
      tableName: 'app_role',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  AppRole.beforeCreate((app_role) => {
    app_role?.setDataValue('role_id', uuidv4());
  });
  return AppRole;
}

export function associateAppRole() {
  AppRole.hasMany(AppResource, { as: 'resource', foreignKey: 'role_id' });
  AppRole.hasMany(AppRoleMenu, { as: 'role_menu', foreignKey: 'role_id' });
}

export default AppRole;
