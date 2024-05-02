import { BiEdit, BiTrash } from 'react-icons/bi';
import Action from '../Reusable/Action';
import IPostUpdate from '@/types/board/posts/IPostUpdate';
import IPostDelete from '@/types/board/posts/IPostDelete';

interface TopActionsProps {
  options: IPostUpdate;
  editHandler: (post: IPostUpdate) => void;
  deleteHandler: (post: IPostDelete) => void;
}

export default function TopActions(props: TopActionsProps) {
  return (
    <div className="flex items-cente space-x-2">
      <Action
        icon={<BiEdit className='size-6'></BiEdit>}
        inner={''}
        className="flex"
        onClick={async () => {
          props.editHandler({ ...props.options });
        }}
      >
      </Action>
      <Action
        icon={<BiTrash className='size-5'></BiTrash>}
        danger={true}
        inner={''}
        className="flex"
        onClick={async () => {
          props.deleteHandler({ ...props.options });
        }}
      >
      </Action>
    </div>
  );
}
