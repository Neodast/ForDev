import PostStat from '@/@depr/types/board/posts/PostsStat';
import PageActions from './PageActions';
import PageInfo from './PageInfo';
import PageOptions from './PageOptions';
import { useUserStore } from '@/shared/models/stores/user/user.store';

interface RightMenuBarProps {
  filters: string[];
  text: string;
  title: string;
  actionTitle: string;
  form: React.ReactNode;
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
