import { Container } from 'inversify';
import { CookieHelper } from '../helpers/cookie.helper';
import { HelperTypes } from '../../utils/types/containers/helper.types';
import { ImageLinkHelper } from '../helpers/image-link.helper';

export const helperContainer = new Container({ defaultScope: 'Singleton' });

helperContainer.bind<CookieHelper>(HelperTypes.CookieHelper).to(CookieHelper);
helperContainer.bind<ImageLinkHelper>(HelperTypes.ImageLinkHelper).to(ImageLinkHelper);
