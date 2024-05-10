import UserSafeDto from '../../utils/dtos/users/UserSafe.dto';
import CommentModel from '../models/CommentModel';

interface ICommentRepository {
  getById(id: number): Promise<CommentModel>;
  getByAuthor(author: UserSafeDto): Promise<CommentModel[]>;
  getAll(): Promise<CommentModel[]>;
  createComment(commentData: CommentModel): Promise<CommentModel>;
  updateComment(id: number, newData: CommentModel): Promise<CommentModel>;
  deleteComment(comment: CommentModel): Promise<void>;
}

export default ICommentRepository;
