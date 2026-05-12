'use strict';

import { dataarea } from '../data/area';
import Config from '../../config/parameter';
import { initializeDatabase } from '../connection';
import { QueryInterface, Sequelize } from 'sequelize';
import ModelRegency from '../../module/area/regencies.model';
import ModelProvince from '../../module/area/provinces.model';
import ModelDistrict from '../../module/area/districts.model';
import ModelSubDistrict from '../../module/area/subdistricts.model';
import { initializeModels } from '../../module/models/models.index';

type Migration = (
  queryInterface: QueryInterface,
  sequelize: Sequelize
) => Promise<void>;
export const up: Migration = async (queryInterface: QueryInterface) => {
  const dataConfig = await Config.initialize();
  const sequelize = await initializeDatabase(dataConfig?.database);
  initializeModels(sequelize);

  const transaction = await queryInterface.sequelize.transaction();
  try {
    const provinces = dataarea.provinces();
    console.log(`Load provinces: ${provinces.length}`);
    await ModelProvince.bulkCreate(provinces, {
      conflictAttributes: ['id'],
      updateOnDuplicate: [
        'name',
        'updated_at'
      ],
      transaction,
    });

    const regencies = dataarea.regencies();
    console.log(`Load regencies: ${regencies.length}`);
    await ModelRegency.bulkCreate(provinces, {
      conflictAttributes: ['id'],
      updateOnDuplicate: [
        'area_province_id',
        'name',
        'updated_at'
      ],
      transaction,
    });

    const districts = dataarea.districts();
    console.log(`Load districts: ${districts.length}`);
    await ModelDistrict.bulkCreate(provinces, {
      conflictAttributes: ['id'],
      updateOnDuplicate: [
        'area_province_id',
        'area_regencies_id',
        'name',
        'updated_at'
      ],
      transaction,
    });

    const subdistricts = dataarea.subdistricts();
    console.log(`Load subdistricts: ${subdistricts.length}`);
    await ModelSubDistrict.bulkCreate(provinces, {
      conflictAttributes: ['id'],
      updateOnDuplicate: [
        'area_province_id',
        'area_regencies_id',
        'area_district_id',
        'name',
        'updated_at'
      ],
      transaction,
    });

    await transaction.commit();
    console.log('DONE');
  } catch (err) {
    console.error('ERROR — rollback');
    await transaction.rollback();
    throw err;
  }
};

export const down: Migration = async (queryInterface: QueryInterface) => {
  const dataConfig = await Config.initialize();
  const sequelize = await initializeDatabase(dataConfig?.database);
  initializeModels(sequelize);

  await ModelProvince.sequelize?.query(`TRUNCATE "area_provinces" CASCADE`);
  await ModelRegency.sequelize?.query(`TRUNCATE "area_regencies" CASCADE`);
  await ModelDistrict.sequelize?.query(`TRUNCATE "area_districts" CASCADE`);
  await ModelSubDistrict.sequelize?.query(
    `TRUNCATE "area_sub_districts" CASCADE`
  );
};
