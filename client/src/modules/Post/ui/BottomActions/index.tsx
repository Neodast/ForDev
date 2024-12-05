import { BiComment, BiHeart } from 'react-icons/bi';
import Action from '../../../../components/Post/ui/Action';
import PostUpdate from '@/types/board/posts/PostUpdate';
import usePostGetLikesCount from '@/hooks/likes/usePostGetLikesCount';
import useLikePost from '@/hooks/likes/usePostLike';
import { useUserStore } from '@/app/store/userStore';

interface PostBottomActionsProps {
  options: PostUpdate;
  commentsCount: number;
}

export default function PostBottomActions(props: PostBottomActionsProps) {
  const { data: likesCount = 0 } = usePostGetLikesCount(props.options.id);
  const { mutateAsync: likePost } = useLikePost(props.options.id);

  const user = useUserStore((state) => state.user);

  return (
    <div className="flex items-center space-x-2">
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
              await likePost({ postId: props.options.id, user: user });
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
