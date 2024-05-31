import { Container } from 'inversify';
import { DataTypes } from '../../utils/types/containers/database.types';
import { dataSource } from '../../utils/types/data-source.type';
import { pgDataSource } from '../appDataSourse';

export const dataSourceContainer = new Container({ defaultScope: 'Singleton' });

dataSourceContainer.bind<dataSource>(DataTypes.DataSource).toConstantValue(pgDataSource);
