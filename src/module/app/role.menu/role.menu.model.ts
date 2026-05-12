'use strict';

import { v4 as uuidv4 } from 'uuid';
import AppMenu from '../menu/menu.model';
import { DataTypes, Model, Sequelize } from 'sequelize';

export class AppRoleMenu extends Model {
  declare role_menu_id: string;
  declare role_id: string;
  declare menu_id: string;
  declare create: number;
  declare edit: number;
  declare delete: number;
  declare import: number;
  declare export: number;
  declare status: number;
  declare created_by: string;
  declare updated_by: string;
}

export function initAppRoleMenu(sequelize: Sequelize) {
  AppRoleMenu.init(
    {
      role_menu_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      role_id: {
        type: DataTypes.STRING,
        unique: true,
      },
      menu_id: {
        type: DataTypes.STRING,
        unique: true,
      },
      view: {
        type: DataTypes.TINYINT,
      },
      create: {
        type: DataTypes.TINYINT,
      },
      edit: {
        type: DataTypes.TINYINT,
      },
      delete: {
        type: DataTypes.TINYINT,
      },
      import: {
        type: DataTypes.TINYINT,
      },
      export: {
        type: DataTypes.TINYINT,
      },
      status: {
        type: DataTypes.TINYINT,
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
      modelName: 'AppRoleMenu',
      tableName: 'app_role_menu',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  AppRoleMenu.beforeCreate((app_role_menu) => {
    app_role_menu?.setDataValue('role_menu_id', uuidv4());
  });
  return AppRoleMenu;
}

export function associateAppRoleMenu() {
  AppRoleMenu.belongsTo(AppMenu, { as: 'menu', foreignKey: 'menu_id' });
}

export default AppRoleMenu;
