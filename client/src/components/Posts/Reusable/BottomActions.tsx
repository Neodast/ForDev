import { BiComment, BiHeart } from 'react-icons/bi';
import Action from './Action';
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
        inner={likesCount}
        onClick={() => {
          setLikesCount(likesCount + 1);
          props.editHandler({ id: props.options.id, likes: likesCount + 1 });
        }}
      >
        <BiHeart className="w-6 h-6 mr-1"></BiHeart>
      </Action>
      <Action inner={0} onClick={() => null}>
        <BiComment className="w-6 h-6 mr-1"></BiComment>
      </Action>
    </div>
  );
}
