import { BiComment, BiHeart } from 'react-icons/bi';
import Action from '../Reusable/Action';
import { useState } from 'react';
import IPostUpdate from '@/types/board/posts/IPostUpdate';

interface BottomActionsProps {
  options: IPostUpdate;
  editHandler: (post: IPostUpdate) => void;
}

export default function BottomActions(props: BottomActionsProps) {
  const [likesCount, setLikesCount] = useState(props.options.likes || 0);

  return (
    <div className="flex items-cente space-x-2">
      <Action
        type="primary"
        shape="round"
        size="small"
        inner={likesCount}
        icon={<BiHeart className="w-6 h-6 mr-1"></BiHeart>}
        className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
        onClick={async () => {
          setLikesCount(likesCount + 1);
          props.editHandler({ id: props.options.id, likes: likesCount + 1 });
        }}
      ></Action>
      <Action
        type="primary"
        shape="round"
        size="small"
        inner={0}
        className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
        icon={<BiComment className="w-6 h-6 mr-1"></BiComment>}
        onClick={() => null}
      ></Action>
    </div>
  );
}
