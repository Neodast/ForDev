import { inject, injectable } from 'inversify';
import PostCreateDto from '../../utils/dtos/posts/post-create.dto';
import PostInputDto from '../../utils/dtos/posts/post-input.dto';
import PostModel from '../models/post.model';
import PostRepository from '../repositories/post.repository.type';
import { PostTypes } from '../../utils/types/containers/post.types';
import { SectionTypes } from '../../utils/types/containers/section.types';
import { SectionService } from './section.service';
import { FirebaseTypes } from '../../utils/types/containers/firebase.types';
import { FirebaseService } from '../../infrastructure/firebase/firebase.service';

@injectable()
export class PostService {
  constructor(
    @inject(PostTypes.PostRepository) private postRepository: PostRepository,
    @inject(SectionTypes.SectionService) private sectionService: SectionService,
    @inject(FirebaseTypes.FirebaseService)
    private firebaseService: FirebaseService,
  ) {}

  public async createPost(postData: PostInputDto): Promise<PostModel> {
    const section = await this.sectionService.getSection(postData.sectionTitle);

    const imageRef = await this.firebaseService.uploadImage({
      image: postData.image,
      imageName: postData.title + '-' + Math.floor(Math.random() * 100000000),
      endpoint: 'posts',
    });
    const imageLink = await this.firebaseService.getDownloadUrl(imageRef);
    const postCreateData: PostCreateDto = {
      section: section,
      imageLink: imageLink,
      ...postData,
    };

    return this.postRepository.createPost(postCreateData);
  }

  public async updatePost(post: PostModel): Promise<PostModel> {
    return this.postRepository.updatePost(post.id, post);
  }

  public async deletePost(postId: number): Promise<void> {
    const dbPost = await this.postRepository.getById(postId);
    return this.postRepository.deletePost(dbPost);
  }

  public async getAllPosts(): Promise<PostModel[]> {
    return this.postRepository.getAll();
  }

  public async getPostById(postId: number): Promise<PostModel> {
    return this.postRepository.getById(postId);
  }
}
