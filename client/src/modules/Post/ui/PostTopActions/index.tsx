import { BiEdit, BiTrash } from 'react-icons/bi';
import { Modal } from 'antd';
import { IoCloseOutline } from 'react-icons/io5';
import { useState } from 'react';
import usePostDelete from '@/@depr/hooks/posts/usePostDelete';
import Role from '@/shared/models/enums/roles.enum';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import { Action } from '@/components/Post/ui';
import PostEditForm from '../PostEditForm';

type PostTopActionsProps = {
  postId: number;
  nickname: string;
  postTitle?: string;
  postText?: string;
};

export function PostTopActions({ nickname, postId }: PostTopActionsProps) {
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

  const { mutateAsync } = usePostDelete();

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
              //FIXME
              <PostEditForm
                handleCancel={handleCancel}
                {...props}
              ></PostEditForm>
            </Modal>
          </Action>
          <Action
            icon={<BiTrash className="size-5"></BiTrash>}
            danger={true}
            className="flex"
            onClick={async () => {
              await mutateAsync({ postId: postId });
            }}
          ></Action>
        </div>
      )}
    </div>
  );
}
