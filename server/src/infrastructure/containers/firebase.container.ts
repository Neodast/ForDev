import { Container } from 'inversify';
import { FirebaseService } from '../firebase/firebase.service';
import { FirebaseTypes } from '../../utils/types/containers/firebase.types';

export const firebaseContainer = new Container();

firebaseContainer
  .bind<FirebaseService>(FirebaseTypes.FirebaseService)
  .to(FirebaseService);
