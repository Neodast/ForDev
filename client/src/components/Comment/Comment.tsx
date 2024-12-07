import User from '@/types/models/User';
import Container from '../Post/ui/Container';
import Content from '../Reusable/Content';
import UserInfo from '../Post/ui/UserInfo';
import Like from '@/types/models/Like';
import CommentTopActions from './CommentTopActions';

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
      <UserInfo nickname={props.author.nickname} />
      <Content text={props.text} />
    </Container>
  );
}
