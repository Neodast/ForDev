import InputField from '@/shared/ui/InputField';
import FormValidationError from '@/components/Auth/RegistrationForm/Errors/FormValidationError';
import { useUserStore } from '@/app/store/userStore';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useThreadEdit from '@/hooks/threads/useThreadEdit';
import ThreadUpdate from '@/types/board/threads/ThreadUpdate';

type PropsThreadEditForm = {
  threadId: number;
  handleCancel: () => void;
  threadTitle?: string;
  threadText?: string;
};

const ThreadEditForm = forwardRef((props: PropsThreadEditForm, ref) => {
  const author = useUserStore((state) => state.user);
  const navigate = useNavigate();

  if (!author) {
    navigate('/');
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ThreadUpdate>({
    defaultValues: {
      title: props.threadTitle,
      text: props.threadText,
    },
  });

  const { mutateAsync } = useThreadEdit(props.threadId);

  const submit: SubmitHandler<ThreadUpdate> = async (data) => {
    await mutateAsync({
      id: props.threadId,
      text: data.text,
      title: data.title,
    });
    props.handleCancel();
  };
  return (
    <div className="flex-1 items-center justify-center m-8">
      <form
        className="w-96 mx-auto font-roboto"
        onSubmit={handleSubmit(submit)}
        {...ref}
      >
        <InputField
          label=""
          placeholder="Title"
          type="text"
          {...register('title')}
        ></InputField>
        <FormValidationError
          message={errors.title?.message}
        ></FormValidationError>
        <Controller
          control={control}
          {...register('text')}
          defaultValue=""
          render={({ field }) => (
            <TextArea
              {...field}
              placeholder="Text"
              autoSize={{ minRows: 4, maxRows: 16 }}
            />
          )}
        />
        <FormValidationError
          message={errors.text?.message}
        ></FormValidationError>
        <Button
          size="large"
          shape="default"
          type="primary"
          htmlType="submit"
          formAction="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline-blue w-[100%]"
        >
          Edit
        </Button>
      </form>
    </div>
  );
});

export default ThreadEditForm;
