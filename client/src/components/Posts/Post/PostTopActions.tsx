import { BiEdit, BiTrash } from 'react-icons/bi';
import Action from '../Reusable/Action';
import { Modal } from 'antd';
import { IoCloseOutline } from 'react-icons/io5';
import { useState } from 'react';
import PostEditForm from './PostEditForm';
import usePostDelete from '@/hooks/posts/usePostDelete';

interface PostTopActionsProps {
  postId: number;
  postTitle?: string;
  postText?: string;
}

export default function PostTopActions(props: PostTopActionsProps) {
  const [isModalOpen, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { mutateAsync } = usePostDelete();

  return (
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
          <PostEditForm handleCancel={handleCancel} {...props}></PostEditForm>
        </Modal>
      </Action>
      <Action
        icon={<BiTrash className="size-5"></BiTrash>}
        danger={true}
        className="flex"
        onClick={() => {
          mutateAsync({ id: props.postId });
        }}
      ></Action>
    </div>
  );
}
