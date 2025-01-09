import InputField from '@/shared/ui/InputField';
import FormValidationError from '@/components/Auth/ui/FormValidationError';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useThreadEdit from '@/@depr/hooks/threads/useThreadEdit';
import ThreadUpdate from '@/@depr/types/board/threads/ThreadUpdate';

type PropsThreadEditForm = {
  threadId: number;
  handleCancel: () => void;
  threadTitle?: string;
  threadText?: string;
};

export const ThreadEditForm = forwardRef(
  (
    { handleCancel, threadId, threadText, threadTitle }: PropsThreadEditForm,
    ref,
  ) => {
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
        title: threadTitle,
        text: threadText,
      },
    });

    const { mutateAsync } = useThreadEdit(threadId);

    const submit: SubmitHandler<ThreadUpdate> = async (data) => {
      await mutateAsync({
        id: threadId,
        text: data.text,
        title: data.title,
      });
      handleCancel();
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
  },
);
