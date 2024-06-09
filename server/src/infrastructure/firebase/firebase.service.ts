import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytesResumable,
} from 'firebase/storage';

import { storage } from './firebase.config';
import { FirebaseUploadDto } from '../../utils/dtos/firebase/firebase-upload.dto';
import { injectable } from 'inversify';

@injectable()
export class FirebaseService {
  async uploadImage(uploadData: FirebaseUploadDto): Promise<StorageReference> {
    const metadata = {
      contentType: uploadData.image.mimetype,
    };

    const uploadRef = ref(
      storage,
      `${uploadData.endpoint}/${uploadData.imageName}`,
    );
    const snapshot = await uploadBytesResumable(
      uploadRef,
      uploadData.image.buffer,
      metadata,
    );

    return snapshot.ref;
  }

  //TODO PLEASE!!!! DELETE FUNCTION!!!

  async getDownloadUrl(ref: StorageReference): Promise<string> {
    return getDownloadURL(ref);
  }
}