import { BiComment, BiHeart } from 'react-icons/bi';
import Action from '../Reusable/Action';
import PostUpdate from '@/types/board/posts/PostUpdate';
import usePostGetLikes from '@/hooks/likes/usePostGetLikes';
import useLikePost from '@/hooks/likes/usePostLike';
import { useUserStore } from '@/stores/UserStore';
import useCommentAddToPost from '@/hooks/comments/useCommentAddToPost';

interface PostBottomActionsProps {
  options: PostUpdate;
}

export default function PostBottomActions(props: PostBottomActionsProps) {
  const { data: likesCount = 0 } = usePostGetLikes(props.options.id);
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: commentPost} = useCommentAddToPost();

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
          await likePost({ postId: props.options.id, user: user });
        }}
      ></Action>
      <Action
        type="primary"
        shape="round"
        size="small"
        className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
        icon={<BiComment className="w-6 h-6"></BiComment>}
        onClick={async () => {
          await commentPost({text: 'dwdwd', author: user, postId: props.options.id});
        }}
      ></Action>
    </div>
  );
}
