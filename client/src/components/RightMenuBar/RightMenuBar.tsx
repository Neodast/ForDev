import PostStat from '@/types/board/posts/PostsStat';
import PageActions from './PageActions';
import PageInfo from './PageInfo';
import PageOptions from './PageOptions';
import { useUserStore } from '@/app/store/userStore';

interface RightMenuBarProps {
  filters: string[];
  text: string;
  title: string;
  actionTitle: string;
  form: JSX.Element;
}

export default function RightMenuBar(props: RightMenuBarProps) {
  const isAuth = useUserStore((state) => state.isAuth);
  return (
    <div className="fixed right-0 top-0 h-96 w-[19rem] p-4 pt-20 ">
      {isAuth && (
        <PageActions
          actionTitle={props.actionTitle}
          form={props.form}
        ></PageActions>
      )}
      <PageInfo title={props.title} text={props.text}></PageInfo>
      <PageOptions filters={props.filters}></PageOptions>
    </div>
  );
}
