import { ThreadData } from '@/types/board/threads/ThreadData';
import Container from '../Reusable/Container';
import UserInfo from '../Reusable/UserInfo';
import { Link } from 'react-router-dom';
import Title from '../Reusable/Title';
import Content from '../Reusable/Content';
import ThreadBottomActions from './ThreadBottomActions';
import ThreadsTopActions from './ThreadTopActions';

interface ThreadProps {
  threadData: ThreadData;
  name?: string;
  surname?: string;
  nickname: string;
  commentsCount: number;
  //---------------------------------//
  containerClassName?: string;
  userInfoClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export default function Thread(props: ThreadProps) {
  return (
    <Container className={props.containerClassName}>
      <ThreadsTopActions
        nickname={props.nickname}
        threadId={props.threadData.id}
        threadTitle={props.threadData.title}
        threadText={props.threadData.text}
      ></ThreadsTopActions>
      <Link to={'/threads/' + props.threadData.id} className="hover:text-black">
        <UserInfo
          name={props.name}
          surname={props.surname}
          nickname={props.nickname}
          className={props.userInfoClassName}
        />
        <Title
          title={props.threadData.title}
          criationDate={props.threadData.creationDate}
          className={props.titleClassName}
        />
        <Content
          text={props.threadData.text}
          className={props.contentClassName}
        />
      </Link>
      <ThreadBottomActions
        options={props.threadData}
        commentsCount={props.commentsCount}
      />
    </Container>
  );
}
