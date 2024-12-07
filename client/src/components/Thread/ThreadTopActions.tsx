import { BiEdit, BiTrash } from 'react-icons/bi';
import Action from '../Post/ui/Action';
import { Modal } from 'antd';
import { IoCloseOutline } from 'react-icons/io5';
import { useState } from 'react';
import Role from '@/types/user/roles.enum';
import { useUserStore } from '@/app/store/userStore';
import useThreadDelete from '@/hooks/threads/useThreadDelete';
import ThreadEditForm from './ThreadEditForm';

interface ThreadTopActionsProps {
  threadId: number;
  nickname: string;
  threadTitle?: string;
  threadText?: string;
}

export default function ThreadsTopActions(props: ThreadTopActionsProps) {
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

  const { mutateAsync } = useThreadDelete();

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
              <ThreadEditForm
                handleCancel={handleCancel}
                {...props}
              ></ThreadEditForm>
            </Modal>
          </Action>
          <Action
            icon={<BiTrash className="size-5"></BiTrash>}
            danger={true}
            className="flex"
            onClick={async () => {
              await mutateAsync(props.threadId);
            }}
          ></Action>
        </div>
      )}
    </div>
  );
}
