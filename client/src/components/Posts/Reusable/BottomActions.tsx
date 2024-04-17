import { Heart } from 'lucide-react';
import { BiComment } from 'react-icons/bi';
import Action from './Action';
import { useState } from 'react';
import IPostUpdate from '@/types/board/IPostUpdate';

interface BottomActionsProps {
  likes: number;
  editHandler: (post: IPostUpdate) => void;
}

export default function BottomActions(props: BottomActionsProps) {
  const [likesCount, setLikesCount] = useState(props.likes);
  const [commentsCount, setCommentsCount] = useState(0);

  return (
    <div className="flex items-cente ml-2">
      <Action
        inner={likesCount}
        onClick={() => {
          setLikesCount(likesCount + 1);
          props.editHandler({ likes: likesCount });
        }}
      >
        <Heart className="w-6 h-6 ml-2 mr-1"></Heart>
      </Action>
      <Action
        inner={commentsCount}
        onClick={() => setCommentsCount(commentsCount + 1)}
      >
        <BiComment className="w-6 h-6 ml-2 mr-1"></BiComment>
      </Action>
    </div>
  );
}
