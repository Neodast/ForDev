import ThreadUpdate from '@/@depr/types/board/threads/ThreadUpdate';
import Action from '../Post/ui/Action';
import { BiComment, BiHeart } from 'react-icons/bi';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import useThreadGetLikes from '@/@depr/hooks/likes/useThreadGetLikesCount';
import useLikeThread from '@/@depr/hooks/likes/useThreadLike';

type ThreadBottomActionsProps = {
  options: ThreadUpdate;
  commentsCount: number;
};

export function ThreadBottomActions({
  options,
  commentsCount,
}: ThreadBottomActionsProps) {
  const { data: likesCount = 0 } = useThreadGetLikes(options.id);
  const { mutateAsync: likeThread } = useLikeThread(options.id);

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
              await likeThread({ postId: options.id, user: user });
            }}
          ></Action>
          <Action
            type="primary"
            shape="round"
            size="small"
            inner={commentsCount}
            className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
            icon={<BiComment className="w-6 h-6"></BiComment>}
          ></Action>
        </>
      )}
    </div>
  );
}
