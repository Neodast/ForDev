import FormValidationError from '@/components/Auth/ui/FormValidationError';
import useCommentEdit from '@/@depr/hooks/comments/useCommentEdit';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import { CommentUpdateDto } from '@/shared/models/dtos/comment-update.dto';
import { Button } from 'antd';
import { forwardRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { InputField } from '@/shared/ui';

type PropsCommentEditForm = {
  commentId: number;
  handleCancel: () => void;
  commentText?: string;
  postId: number;
};

export const CommentEditForm = forwardRef(
  (
    { commentId, handleCancel, postId, commentText }: PropsCommentEditForm,
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
      formState: { errors },
    } = useForm<CommentUpdateDto>({
      defaultValues: {
        text: commentText,
      },
    });

    const { mutateAsync } = useCommentEdit(postId);

    const submit: SubmitHandler<CommentUpdateDto> = async (data) => {
      await mutateAsync({
        id: commentId,
        text: data.text,
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
            {...register('text')}
          ></InputField>
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
