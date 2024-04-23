import InputField from '@/components/Base/Inputs/InputField';
import FormValidationError from '@/components/Forms/RegistrationForm/Errors/FormValidationError';
import PostService from '@/services/PostService';
import { useUserStore } from '@/stores/UserStore';
import IPostInput from '@/types/board/posts/IPostInput';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function PostCreateForm() {
  const author = useUserStore((state) => state.user);
  if(!author) {
    throw new Error("User is unauthorize");
  }
  Object.assign({author}, {isVerify: true});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostInput>({
    defaultValues: { sectionTitle: 't1' },
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationKey: ['createPost'],
    mutationFn: PostService.createPost,
    onSuccess: () => {
      reset();
    },
  });

  const submit: SubmitHandler<IPostInput> = async (data) => {
    await mutation.mutateAsync({author: author, ...data});
  };
  return (
    <div className="flex-1 items-center justify-center m-8">
      <form
        className="w-96 mx-auto font-roboto"
        onSubmit={handleSubmit(submit)}
      >
        <InputField
          label="title"
          placeholder="Title"
          type="text"
          {...register('title')}
        ></InputField>
        <FormValidationError
          message={errors.title?.message}
        ></FormValidationError>
        <InputField
          label="text"
          placeholder="Text"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue w-[100%]"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
