import InputField from '@/components/Base/Inputs/InputField';
import FormValidationError from '@/components/Forms/RegistrationForm/Errors/FormValidationError';
import useEditPost from '@/hooks/posts/useEditPost';
import { useUserStore } from '@/stores/UserStore';
import IPostUpdate from '@/types/board/posts/IPostUpdate';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type PropsPostEditForm = {
  postId: number;
};

export default function PostEditForm(props: PropsPostEditForm) {
  const author = useUserStore((state) => state.user);
  const navigator = useNavigate();

  if (!author) {
    navigator('/')
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IPostUpdate>({});

  const { mutateAsync } = useEditPost(reset);

  const submit: SubmitHandler<IPostUpdate> = async (data) => {
    await mutateAsync({
      id: props.postId,
      likes: data.likes,
      text: data.text,
      title: data.title,
    });
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
