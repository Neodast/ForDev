import InputField from '@/shared/ui/InputField';
import FormValidationError from '@/components/Auth/RegistrationForm/Errors/FormValidationError';
import { useUserStore } from '@/app/store/userStore';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useThreadCreate from '@/hooks/threads/useThreadCreate';
import { ThreadInput } from '@/types/board/threads/ThreadInput';

export default function ThreadCreateForm() {
  const author = useUserStore((state) => state.user);
  if (!author) {
    throw new Error('User is unauthorize');
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ThreadInput>({
    defaultValues: { sectionTitle: 'Posts' },
  });

  const { mutateAsync } = useThreadCreate();

  const submit: SubmitHandler<ThreadInput> = async (data) => {
    await mutateAsync({
      authorId: author.id,
      comments: [],
      text: data.createText,
      title: data.createTitle,
      sectionTitle: data.sectionTitle,
    });
    reset();
  };
  return (
    <div className="flex-1 items-center justify-center m-8">
      <form
        className="w-96 mx-auto font-roboto"
        onSubmit={handleSubmit(submit)}
      >
        <InputField
          placeholder="Title"
          type="text"
          {...register('createTitle')}
        ></InputField>
        <FormValidationError
          message={errors.createTitle?.message}
        ></FormValidationError>
        <Controller
          control={control}
          {...register('createText')}
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
          message={errors.createText?.message}
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
