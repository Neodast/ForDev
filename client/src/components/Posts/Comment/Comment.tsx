import User from '@/types/models/User';
import Container from '../Reusable/Container';
import Content from '../Reusable/Content';
import UserInfo from '../Reusable/UserInfo';
import Like from '@/types/models/Like';

interface CommentProps {
  author: User;
  text: string;
  likes?: Like[];
  className?: string;
}

export default function Comment(props: CommentProps) {
  return (
    <Container className={props.className}>
      <UserInfo nickname={props.author.nickname} />
      <Content text={props.text} />
    </Container>
  );
}
