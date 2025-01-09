import FormValidationError from '@/components/Auth/ui/FormValidationError';
import useCommentAddToPost from '@/@depr/hooks/comments/useCommentAddToPost';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import CommentInputDto from '@/shared/models/dtos/comment-input.dto';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type CommentCreateProps = {
  postId: number;
};

export function CommentCreateForm({ postId }: CommentCreateProps) {
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CommentInputDto>({
    defaultValues: { author: user, id: postId },
  });

  const { mutateAsync } = useCommentAddToPost(postId);

  const submit: SubmitHandler<CommentInputDto> = async (data) => {
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
