import InputField from '@/shared/ui/InputField';
import FormValidationError from '@/components/Auth/ui/FormValidationError';
import usePostEdit from '@/@depr/hooks/posts/usePostEdit';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import PostUpdate from '@/modules/Post/models/types/post-update.type';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type PropsPostEditForm = {
  postId: number;
  handleCancel: () => void;
  postTitle?: string;
  postText?: string;
};

export const PostEditForm = forwardRef(
  ({ handleCancel, postId, postText, postTitle }: PropsPostEditForm, ref) => {
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
    } = useForm<PostUpdate>({
      defaultValues: {
        title: postTitle,
        text: postText,
      },
    });

    const { mutateAsync } = usePostEdit(postId);

    const submit: SubmitHandler<PostUpdate> = async (data) => {
      await mutateAsync({
        id: postId,
        text: data.text,
        title: data.title,
        image: data.image,
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
          <InputField type="file" {...register('image')}></InputField>
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
