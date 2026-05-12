'use strict';

import { Sequelize, Model } from 'sequelize';
import { helper } from '../../helpers/helper';
import { initAppOtp } from '../auth/otp.model';
import { initAppMenu } from '../app/menu/menu.model';
import { getUserLogin } from '../../context/userContext';
import { initAppRole, associateAppRole } from '../app/role/role.model';
import { initParamGlobal } from '../app/param.global/param.global.model';
import { initAreaRegency, associateAreaRegency } from '../area/regencies.model';
import {
  initAreaDistrict,
  associateAreaDistrict,
} from '../area/districts.model';
import {
  initAreaSubDistrict,
  associateAreaSubDistrict,
} from '../area/subdistricts.model';
import {
  initAreaProvince,
  associateAreaProvince,
} from '../area/provinces.model';
import {
  initAppRoleMenu,
  associateAppRoleMenu,
} from '../app/role.menu/role.menu.model';
import {
  initAppResourceModel,
  associateAppResource,
} from '../app/resource/resource.model';
import ActivityLog, {
  initActivityLog,
  associateActivityLog,
} from '../global/activity.log.model';

export function initializeModels(sequelize: Sequelize) {
  // initialize
  initAppOtp(sequelize);
  initAppRole(sequelize);
  initAppMenu(sequelize);
  initParamGlobal(sequelize);
  initAppRoleMenu(sequelize);
  initAreaRegency(sequelize);
  initAreaProvince(sequelize);
  initAreaDistrict(sequelize);
  initAreaSubDistrict(sequelize);
  initAppResourceModel(sequelize);

  // associate
  associateAppRole();
  associateAppRoleMenu();
  associateAppResource();
  associateAreaRegency();
  associateAreaProvince();
  associateAreaDistrict();
  associateAreaSubDistrict();

  addGlobalActivityHooks(sequelize);
}

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  const createdAtDb = values.created_at;
  const updatedAtDb = values.updated_at;

  values.created_at = createdAtDb ? helper.dateFormat(createdAtDb) : null;

  if (updatedAtDb) {
    values.updated_at = helper.dateFormat(updatedAtDb);
  } else {
    values.updated_at = createdAtDb ? helper.dateFormat(createdAtDb) : null;
  }
  return values;
};

function addGlobalActivityHooks(sequelize: Sequelize) {
  sequelize.addHook('beforeUpdate', (instance: any) => {
    if (instance?.constructor.tableName === 'activity_logs') return;
    instance._previousDataValuesSnapshot = { ...instance?._previousDataValues };
  });

  sequelize.addHook('afterUpdate', async (instance: any) => {
    if (instance?.constructor.tableName === 'activity_logs') return;
    await ActivityLog.create({
      table_name: instance?.constructor.tableName,
      record_id: getPrimaryKey(instance),
      action: 'UPDATE',
      username: getUserLogin(),
      before_data: instance?._previousDataValuesSnapshot,
      after_data: instance?.get(),
    });
  });

  sequelize.addHook('afterCreate', async (instance: any) => {
    if (instance?.constructor.tableName === 'activity_logs') return;
    await ActivityLog.create({
      table_name: instance?.constructor.tableName,
      record_id: getPrimaryKey(instance),
      action: 'CREATE',
      username: getUserLogin(),
      before_data: null,
      after_data: instance?.get(),
    });
  });

  sequelize.addHook('afterDestroy', async (instance: any) => {
    if (instance?.constructor.tableName === 'activity_logs') return;
    await ActivityLog.create({
      table_name: instance?.constructor.tableName,
      record_id: getPrimaryKey(instance),
      action: 'DELETE',
      username: getUserLogin(),
      before_data: instance?.get(),
      after_data: null,
    });
  });
}

function getPrimaryKey(instance: any) {
  const pkFields: string[] = instance.constructor.primaryKeyAttributes || [];

  if (pkFields.length === 0) return null;

  if (pkFields.length === 1) {
    return instance.get(pkFields[0]);
  }

  return pkFields.reduce((acc: any, key: string) => {
    acc[key] = instance.get(key);
    return acc;
  }, {});
}