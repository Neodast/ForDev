import useCommentDelete from '@/hooks/comments/useCommentDelete';
import { useUserStore } from '@/stores/UserStore';
import { useState } from 'react';
import Action from '../Reusable/Action';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Modal } from 'antd';
import { IoCloseOutline } from 'react-icons/io5';
import CommentEditForm from './CommentEditForm';
import Role from '@/types/user/roles.enum';

interface CommentTopActionsProps {
  postId: number;
  commentId: number;
  nickname: string;
  commentText?: string;
}

export default function CommentTopActions(props: CommentTopActionsProps) {
  const user = useUserStore((state) => state.user);
  const isAuthor =
    user?.nickname === props.nickname || user?.role !== Role.user;
  const isAuth = useUserStore((state) => state.isAuth);

  const [isModalOpen, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { mutateAsync } = useCommentDelete(props.postId);

  return (
    <div className="max-w-32 float-end space-x-2">
      {isAuthor && isAuth && (
        <div className="flex items-cente space-x-2">
          <Action
            icon={
              <BiEdit className="size-[1.5rem] mt-[0.25rem] mr-[-0.5rem]"></BiEdit>
            }
            className="flex p-0 px-[0.25rem]"
            onClick={showModal}
          >
            <Modal
              title={'Edit post'}
              open={isModalOpen}
              onCancel={handleCancel}
              closeIcon={
                <IoCloseOutline
                  size={26}
                  onClick={() => {
                    setTimeout(() => {
                      setOpen(false);
                    }, 100);
                  }}
                ></IoCloseOutline>
              }
              footer={null}
            >
              <CommentEditForm
                handleCancel={handleCancel}
                {...props}
              ></CommentEditForm>
            </Modal>
          </Action>
          <Action
            icon={<BiTrash className="size-5"></BiTrash>}
            danger={true}
            className="flex"
            onClick={async () => {
              await mutateAsync(props.commentId);
            }}
          ></Action>
        </div>
      )}
    </div>
  );
}
