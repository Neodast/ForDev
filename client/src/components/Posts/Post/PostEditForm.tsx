import InputField from '@/components/Base/Inputs/InputField';
import FormValidationError from '@/components/Forms/RegistrationForm/Errors/FormValidationError';
import useEditPost from '@/hooks/posts/useEditPost';
import { useUserStore } from '@/stores/UserStore';
import PostUpdate from '@/types/board/posts/PostUpdate';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type PropsPostEditForm = {
  postId: number;
  handleCancel: () => void;
  postTitle?: string;
  postText?: string;
};

export default function PostEditForm(props: PropsPostEditForm) {
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
      title: props.postTitle,
      text: props.postText,
    },
  });

  const { mutateAsync } = useEditPost();

  const submit: SubmitHandler<PostUpdate> = async (data) => {
    await mutateAsync({
      id: props.postId,
      likes: data.likes,
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
}
