import CommentCreateDto from '../../utils/dtos/comment/comment-create.dto';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import CommentModel from '../models/comment.model';
import PostModel from '../models/post.model';

type CommentRepository = {
  getById(id: number): Promise<CommentModel>;
  getByAuthor(author: UserSafeDto): Promise<CommentModel[]>;
  getAll(): Promise<CommentModel[]>;
  getCommentsByPost(post: PostModel): Promise<CommentModel[]>;
  createComment(commentData: CommentCreateDto): Promise<CommentModel>;
  updateComment(id: number, newData: CommentModel): Promise<CommentModel>;
  deleteComment(comment: CommentModel): Promise<void>;
};

export default CommentRepository;
