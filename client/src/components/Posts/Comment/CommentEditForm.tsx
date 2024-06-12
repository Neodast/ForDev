import FormValidationError from '@/components/Auth/RegistrationForm/Errors/FormValidationError';
import InputField from '@/components/Base/Inputs/InputField';
import useCommentEdit from '@/hooks/comments/useCommentEdit';
import { useUserStore } from '@/stores/UserStore';
import { CommentUpdate } from '@/types/comment/CommentUpdate';
import { Button } from 'antd';
import { forwardRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type PropsCommentEditForm = {
  commentId: number;
  handleCancel: () => void;
  commentText?: string;
  postId: number;
};

const CommentEditForm = forwardRef((props: PropsCommentEditForm, ref) => {
  const author = useUserStore((state) => state.user);
  const navigate = useNavigate();

  if (!author) {
    navigate('/');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentUpdate>({
    defaultValues: {
      text: props.commentText,
    },
  });

  const { mutateAsync } = useCommentEdit(props.postId);

  const submit: SubmitHandler<CommentUpdate> = async (data) => {
    await mutateAsync({
      id: props.commentId,
      text: data.text,
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
});

export default CommentEditForm;
