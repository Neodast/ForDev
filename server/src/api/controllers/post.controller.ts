import { NextFunction, Response } from 'express';
import { PostCreateInputDto } from '../../utils/dtos/post/post-create-input.dto';
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
import { PostUpdateInputDto } from '../../utils/dtos/post/post-update-input.dto';
import { HelperTypes } from '../../utils/types/containers/helper.types';
import { ImageLinkHelper } from '../helpers/image-link.helper';
import { PostDeleteDto } from '../../utils/dtos/post/post-delete.dto';
import { PostGetByIdDto } from '../../utils/dtos/post/post-get-by-id.dto';
import { SectionTypes } from '../../utils/types/containers/section.types';
import { SectionService } from '../../core/services/section.service';
import { PostGetAllDto } from '../../utils/dtos/post/post-get-all.dto';
import { PostGetAllBySectionDto } from '../../utils/dtos/post/post-get-all-by-section.dto';
import { PostGetAllByAuthorDto } from '../../utils/dtos/post/post-get-all-by-author.dto';

@controller('/post')
class PostController {
  constructor(
    @inject(PostTypes.PostService) private postService: PostService,
    @inject(HelperTypes.ImageLinkHelper)
    private imageLinkHelper: ImageLinkHelper,
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

      const imageLink = await this.imageLinkHelper.createLink(
        'posts',
        image,
        postData.title,
      );
      const section = await this.sectionService.getSection(
        postData.sectionTitle,
      );

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
  )
  public async updatePost(
    req: RequestWithBody<PostUpdateInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postUpdateData = req.body;
      const image = req.file;

      if (!image) {
        return res
          .json(await this.postService.updatePost(postUpdateData))
          .status(StatusCodes.SUCCESS);
      }

      const imageLink = await this.imageLinkHelper.createLink(
        'posts',
        image,
        postUpdateData.title,
      );

      const updatedPost = await this.postService.updatePost({
        ...postUpdateData,
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
  public async getAllPosts(
    req: RequestWithQuery<PostGetAllDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const options = req.query;
      const posts = await this.postService.getPosts(options);
      res.json(posts).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/allBySection')
  public async getPostsBySection(
    req: RequestWithQuery<PostGetAllBySectionDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const options = req.query;
      const posts = await this.postService.getPosts({
        where: { section: { title: options.sectionTitle } },
        ...options,
      });
      res.json(posts).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/allByAuthor')
  public async getPostsByAuthor(
    req: RequestWithQuery<PostGetAllByAuthorDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const options = req.query;
      const posts = await this.postService.getPosts({
        where: { author: { id: options.authorId } },
        ...options,
      });
      res.json(posts).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/')
  public async getPostById(
    req: RequestWithQuery<PostGetByIdDto>,
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
