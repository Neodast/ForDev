import User from '@/@depr/types/models/User';
import Like from '@/@depr/types/models/Like';
import CommentTopActions from './CommentTopActions';
import { Container, Content, UserInfo } from '../../../../components/Post/ui';

interface CommentProps {
  id: number;
  author: User;
  text: string;
  likes?: Like[];
  className?: string;
  postId: number;
}

export default function Comment(props: CommentProps) {
  return (
    <Container className={props.className}>
      <CommentTopActions
        commentText={props.text}
        commentId={props.id}
        nickname={props.author.nickname}
        postId={props.postId}
      />
      <UserInfo profileInfo={{ nickname: props.author.nickname }} />
      <Content text={props.text} />
    </Container>
  );
}
