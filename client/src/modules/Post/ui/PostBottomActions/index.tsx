import { BiComment } from 'react-icons/bi';
import { Action } from '@/components/Post/ui';
import { LikeAction } from '@/entities/like/ui';

type PostBottomActionsProps = {
  id: number;
  commentsCount: number;
};

export function PostBottomActions({
  id,
  commentsCount,
}: PostBottomActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <>
        <LikeAction entityType="post" id={id} />
        <Action
          type="primary"
          shape="round"
          size="small"
          className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
          icon={<BiComment className="w-6 h-6"></BiComment>}
        >
          {commentsCount}
        </Action>
      </>
    </div>
  );
}
