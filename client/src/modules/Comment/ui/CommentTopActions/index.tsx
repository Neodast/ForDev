import useCommentDelete from '@/@depr/hooks/comments/useCommentDelete';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import { useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Modal } from 'antd';
import { IoCloseOutline } from 'react-icons/io5';
import Role from '@/shared/models/enums/roles.enum';
import { Action } from '../Post/ui';
import { CommentEditForm } from '../CommentEditForm';

type CommentTopActionsProps = {
  postId: number;
  commentId: number;
  nickname: string;
  commentText?: string;
};

export function CommentTopActions({
  commentId,
  nickname,
  postId,
  commentText,
}: CommentTopActionsProps) {
  const user = useUserStore((state) => state.user);
  const isAuthor = user?.nickname === nickname || user?.role !== Role.user;
  const isAuth = useUserStore((state) => state.isAuth);

  const [isModalOpen, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { mutateAsync } = useCommentDelete(postId);

  return (
    <div className="max-w-32 float-end space-x-2">
      {isAuthor && isAuth && (
        <div className="flex items-center space-x-2">
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
                commentId={commentId}
                postId={postId}
              ></CommentEditForm>
            </Modal>
          </Action>
          <Action
            icon={<BiTrash className="size-5"></BiTrash>}
            danger={true}
            className="flex"
            onClick={async () => {
              await mutateAsync(commentId);
            }}
          ></Action>
        </div>
      )}
    </div>
  );
}
