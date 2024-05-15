import { BiComment, BiHeart } from 'react-icons/bi';
import Action from '../Reusable/Action';
import PostUpdate from '@/types/board/posts/PostUpdate';
import useGetPostLikes from '@/hooks/likes/useGetPostLikes';
import useLikePost from '@/hooks/likes/usePostLike';
import { useUserStore } from '@/stores/UserStore';

interface PostBottomActionsProps {
  options: PostUpdate;
}

export default function PostBottomActions(props: PostBottomActionsProps) {
  const { data: likesCount = 0 } = useGetPostLikes(props.options.id);
  const {mutateAsync} = useLikePost();

  const user = useUserStore((state) => state.user);

  return (
    <div className="flex items-cente space-x-2">
      <Action
        type="primary"
        shape="round"
        size="small"
        inner={likesCount}
        icon={<BiHeart className="size-6 mx-[-0.25rem]"></BiHeart>}
        className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
        onClick={async () => {
          await mutateAsync({postId: props.options.id, user: user});
        }}
      ></Action>
      <Action
        type="primary"
        shape="round"
        size="small"
        className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
        icon={<BiComment className="w-6 h-6"></BiComment>}
        onClick={() => null}
      ></Action>
    </div>
  );
}
