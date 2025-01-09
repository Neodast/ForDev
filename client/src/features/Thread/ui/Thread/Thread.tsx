import { ThreadData } from '@/@depr/types/board/threads/ThreadData';
import { Link } from 'react-router-dom';
import ThreadBottomActions from './ThreadBottomActions';
import ThreadsTopActions from './ThreadTopActions';
import {
  Container,
  Content,
  Title,
  UserInfo,
} from '../../../../components/Post/ui';

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
          profileInfo={{
            nickname: props.nickname,
            name: props.name,
            surname: props.surname,
          }}
          className={props.userInfoClassName}
        />
        <Title
          title={props.threadData.title}
          creationDate={props.threadData.creationDate}
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
