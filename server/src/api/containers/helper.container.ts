import { Container } from 'inversify';
import { CookieHelper } from '../helpers/cookie.helper';
import { HelperTypes } from '../../utils/types/containers/helper.types';

export const helperContainer = new Container({ defaultScope: 'Singleton' });

helperContainer.bind<CookieHelper>(HelperTypes.CookieHelper).to(CookieHelper);
