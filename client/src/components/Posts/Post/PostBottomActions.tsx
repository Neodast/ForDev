import { BiComment, BiHeart } from 'react-icons/bi';
import Action from '../Reusable/Action';
import { useState } from 'react';
import IPostUpdate from '@/types/board/posts/IPostUpdate';
import useEditPost from '@/hooks/posts/useEditPost';

interface PostBottomActionsProps {
  options: IPostUpdate;
}

export default function PostBottomActions(props: PostBottomActionsProps) {
  const [likesCount, setLikesCount] = useState(props.options.likes || 0);

  const {mutateAsync} = useEditPost();

  return (
    <div className="flex items-cente space-x-2">
      <Action
        type="primary"
        shape="round"
        size="small"
        inner={likesCount}
        icon={<BiHeart className="size-6 mx-[-0.25rem]"></BiHeart>}
        className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
        onClick={ async() => {
          setLikesCount((prev) => prev + 1);
          await mutateAsync({ id: props.options.id, likes: likesCount + 1 });
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
