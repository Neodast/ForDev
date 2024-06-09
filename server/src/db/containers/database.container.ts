import { Container } from 'inversify';
import { DataTypes } from '../../utils/types/containers/database.types';
import { dataSource } from '../../utils/types/data-source.type';
import { pgDataSource } from '../db.config';

export const databaseContainer = new Container({ defaultScope: 'Singleton' });

databaseContainer
  .bind<dataSource>(DataTypes.DataSource)
  .toConstantValue(pgDataSource);
