import ThreadUpdate from '@/types/board/threads/ThreadUpdate';
import Action from '../Post/ui/Action';
import { BiComment, BiHeart } from 'react-icons/bi';
import { useUserStore } from '@/app/store/userStore';
import useThreadGetLikes from '@/hooks/likes/useThreadGetLikesCount';
import useLikeThread from '@/hooks/likes/useThreadLike';

interface ThreadBottomActionsProps {
  options: ThreadUpdate;
  commentsCount: number;
}

export default function ThreadBottomActions(props: ThreadBottomActionsProps) {
  const { data: likesCount = 0 } = useThreadGetLikes(props.options.id);
  const { mutateAsync: likeThread } = useLikeThread(props.options.id);

  const user = useUserStore((state) => state.user);

  return (
    <div className="flex items-cente space-x-2">
      {user && (
        <>
          <Action
            type="primary"
            shape="round"
            size="small"
            inner={likesCount}
            icon={<BiHeart className="size-6 mx-[-0.25rem]"></BiHeart>}
            className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
            onClick={async () => {
              await likeThread({ postId: props.options.id, user: user });
            }}
          ></Action>
          <Action
            type="primary"
            shape="round"
            size="small"
            inner={props.commentsCount}
            className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
            icon={<BiComment className="w-6 h-6"></BiComment>}
          ></Action>
        </>
      )}
    </div>
  );
}
