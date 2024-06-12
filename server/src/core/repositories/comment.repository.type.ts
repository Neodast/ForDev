import CommentCreateDto from '../../utils/dtos/comment/comment-create.dto';
import { CommentUpdateDto } from '../../utils/dtos/comment/comment-update.dto';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import CommentModel from '../models/comment.model';
import PostModel from '../models/post.model';

type CommentRepository = {
  getById(id: number): Promise<CommentModel>;
  getByAuthor(author: UserSafeDto): Promise<CommentModel[]>;
  getAll(): Promise<CommentModel[]>;
  getCommentsByPost(post: PostModel): Promise<CommentModel[]>;
  createComment(commentData: CommentCreateDto): Promise<CommentModel>;
  updateComment(newData: CommentUpdateDto): Promise<CommentModel>;
  deleteComment(commentId: number): Promise<void>;
};

export default CommentRepository;
