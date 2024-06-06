import { NextFunction, Request, Response } from 'express';
import { PostCreateInputDto } from '../../utils/dtos/posts/post-create-input.dto';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject } from 'inversify';
import { PostTypes } from '../../utils/types/containers/post.types';
import { PostService } from '../../core/services/post.service';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import multer from 'multer';
import { PostUpdateInputDto } from '../../utils/dtos/posts/post-update-input.dto';
import { HelperTypes } from '../../utils/types/containers/helper.types';
import { ImageLinkHelper } from '../helpers/image-link.helper';
import { PostDeleteDto } from '../../utils/dtos/posts/post-delete.dto';
import { PostIdDto } from '../../utils/dtos/posts/post-id.dto';
import { SectionTypes } from '../../utils/types/containers/section.types';
import { SectionService } from '../../core/services/section.service';

@controller('/post')
class PostController {
  constructor(
    @inject(PostTypes.PostService) private postService: PostService,
    @inject(HelperTypes.ImageLinkHelper) private imageLinkHelper: ImageLinkHelper,
    @inject(SectionTypes.SectionService) private sectionService: SectionService,
  ) {}

  @httpPost(
    '/create',
    multer({ storage: multer.memoryStorage() }).single('image'),
  )
  public async createPost(
    req: RequestWithBody<PostCreateInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postData = req.body;
      const image = req.file;

      if (!image) {
        throw Error('Image file was not given');
      }

      const imageLink = await this.imageLinkHelper.createLink('posts', image, postData.title)
      const section = await this.sectionService.getSection(postData.sectionTitle);

      const createdPost = await this.postService.createPost({
        ...postData,
        imageLink: imageLink,
        section: section,
      });

      res.json(createdPost).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  @httpPut(
    '/update',
    multer({ storage: multer.memoryStorage() }).single('image'),
  ) //TODO add photot updating
  public async updatePost(
    req: RequestWithBody<PostUpdateInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postData = req.body;
      const image = req.file;

      if(!image) {
        return res.json(await this.postService.updatePost(postData)).status(StatusCodes.SUCCESS);
      }

      const imageLink = await this.imageLinkHelper.createLink('posts', image, postData.title)

      const updatedPost = await this.postService.updatePost({
        ...postData,
        imageLink: imageLink,
      });
      res.json(updatedPost).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpDelete('/delete')
  public async deletePost(
    req: RequestWithBody<PostDeleteDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.body;
      await this.postService.deletePost(postId);
      res.sendStatus(StatusCodes.DELETED);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/all')
  public async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await this.postService.getAllPosts();
      res.json(posts).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/')
  public async getPostById(
    req: RequestWithQuery<PostIdDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.query;
      const post = await this.postService.getPostById(postId);
      res.json(post).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default PostController;
