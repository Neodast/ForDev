import { Button, Dropdown, Modal } from 'antd';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';

interface PageActionsProps {
  actionTitle: string;
  form: JSX.Element;
}

export default function PageActions(props: PageActionsProps) {

  const [modalState, setModalState] = useState(true);

  return (
    <div className="flex-1 flex-col space-x-4 mb-4">
      <Button
        type="primary"
        shape="round"
        size="middle"
        icon={<FaPlus className="size-[0.75rem]"></FaPlus>}
        onClick={() => setModalState(true)}
        className="flex-1 h-10 text-black border-t-1 border-slate-200"
      >
        {props.actionTitle}
        <Modal
          title="Title"
          open={modalState}
          onOk={() => setModalState(false)}
          onCancel={() => setModalState(false)}
          className="size-4"
        >
          {props.form}
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
