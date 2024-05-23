import FormValidationError from '@/components/Forms/RegistrationForm/Errors/FormValidationError';
import useCommentAddToPost from '@/hooks/comments/useCommentAddToPost';
import { useUserStore } from '@/stores/UserStore';
import CommentPostInput from '@/types/comment/CommentPostInput';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface CommentCreateProps {
  postId: number;
}

export default function CommentCreateForm(props: CommentCreateProps) {
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CommentPostInput>({
    defaultValues: { author: user, postId: props.postId },
  });

  const { mutateAsync } = useCommentAddToPost(props.postId);

  const submit: SubmitHandler<CommentPostInput> = async (data) => {
    await mutateAsync(data);
    reset();
  };
  return (
    <div className="flex-1 items-center justify-center m-8">
      <form
        className="w-[50rem] ml-32 font-roboto"
        onSubmit={handleSubmit(submit)}
      >
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
          Create
        </Button>
      </form>
    </div>
  );
}
