import { inject, injectable } from 'inversify';
import { FirebaseTypes } from '../../utils/types/containers/firebase.types';
import { FirebaseService } from '../../infrastructure/firebase/firebase.service';

@injectable()
export class ImageLinkHelper {
  constructor(
    @inject(FirebaseTypes.FirebaseService)
    private firebaseService: FirebaseService,
  ) {}

  public async createLink(
    endpoint: string,
    image: Express.Multer.File,
    data?: string,
  ): Promise<string> {
    const imageRef = await this.firebaseService.uploadImage({
      image: image,
      imageName: data + '-' + Math.floor(Math.random() * 100000000),
      endpoint: endpoint,
    });
    return this.firebaseService.getDownloadUrl(imageRef);
  }
}
