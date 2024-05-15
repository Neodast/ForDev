import CommentCreateDto from '../../utils/dtos/comment/CommentCreate.dto';
import UserSafeDto from '../../utils/dtos/users/UserSafe.dto';
import CommentModel from '../models/CommentModel';
import PostModel from '../models/PostModel';

type CommentRepository = {
  getById(id: number): Promise<CommentModel>;
  getByAuthor(author: UserSafeDto): Promise<CommentModel[]>;
  getAll(): Promise<CommentModel[]>;
  getCommentsByPost(post: PostModel) : Promise<CommentModel[]>;
  createComment(commentData: CommentCreateDto): Promise<CommentModel>;
  updateComment(id: number, newData: CommentModel): Promise<CommentModel>;
  deleteComment(comment: CommentModel): Promise<void>;
};

export default CommentRepository;
