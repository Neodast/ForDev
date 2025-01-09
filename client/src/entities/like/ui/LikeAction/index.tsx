import { Action } from '@/components/Post/ui';
import { BiHeart } from 'react-icons/bi';
import { EntityType } from '../../../../shared/models/types/entity-type.type';
import { useLike } from '../../api/mutations/use-like';
import { useGetLikesCount } from '../../api/queries/use-get-likes-count';
import { useUserStore } from '@/shared/models/stores/user/user.store';

type LikeActionProps = {
  id: number;
  entityType: EntityType;
};

export function LikeAction({ id, entityType }: LikeActionProps) {
  const { mutateAsync: likeHandler } = useLike(id, entityType);
  const { data: likesCount } = useGetLikesCount(id, entityType);

  const user = useUserStore((store) => store.getUser());

  return (
    <Action
      type="primary"
      shape="round"
      size="small"
      icon={<BiHeart className="size-6 mx-[-0.25rem]"></BiHeart>}
      className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
      onClick={async () => {
        await likeHandler({ id, user, entityType });
      }}
    >
      {likesCount || 0}
    </Action>
  );
}
