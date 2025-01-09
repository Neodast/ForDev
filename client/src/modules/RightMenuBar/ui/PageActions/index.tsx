import { Button, Dropdown, Modal } from 'antd';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

type PageActionsProps = {
  actionTitle: string;
  form: React.ReactNode;
};

export function PageActions({ actionTitle, form }: PageActionsProps) {
  const [isModalOpen, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="flex-1 flex-col space-x-4 mb-4">
      <Button
        type="primary"
        shape="round"
        size="middle"
        icon={<FaPlus className="size-[0.75rem]"></FaPlus>}
        onClick={showModal}
        className="flex-1 h-10 text-black border-t-1 border-slate-200"
      >
        {actionTitle}
        <Modal
          title={actionTitle}
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
          {form}
        </Modal>
      </Button>
      <Button
        type="primary"
        shape="round"
        size="middle"
        className="h-10 text-black border-t-1 border-slate-200"
      >
        Join
      </Button>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            { key: '1', label: 'Menu Item 1' },
            { key: '2', label: 'Menu Item 2' },
            { key: '3', label: 'Menu Item 3' },
          ],
        }}
      >
        <Button
          type="primary"
          shape="round"
          size="middle"
          icon={<HiDotsHorizontal></HiDotsHorizontal>}
          className="h-10 text-black border-t-1 border-slate-200"
        ></Button>
      </Dropdown>
    </div>
  );
}
