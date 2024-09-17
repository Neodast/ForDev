import InputField from '../../Base/Inputs/InputField';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginInput from '../../../types/user/LoginInput';
import FormValidationError from '../RegistrationForm/Errors/FormValidationError';
import { Button } from 'antd';
import useUserLogin from '@/hooks/auth/useUserLogin';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {},
    mode: 'onChange',
  });

  const { mutateAsync } = useUserLogin(reset);

  const submit: SubmitHandler<LoginInput> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <div className="flex-1 items-center justify-center m-8 my-[7%]">
      <form
        className="w-96 mx-auto font-roboto"
        onSubmit={handleSubmit(submit)}
      >
        <InputField
          label="Email"
          placeholder="email@gmail.com"
          type="email"
          {...register('email')}
        ></InputField>
        <FormValidationError
          message={errors.email?.message || status}
        ></FormValidationError>
        <InputField
          label="password"
          placeholder="Password"
          type="password"
          {...register('password')}
        ></InputField>
        <FormValidationError
          message={errors.password?.message}
        ></FormValidationError>
        <Button
          size="large"
          shape="default"
          type="primary"
          htmlType="submit"
          formAction="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue w-[100%]"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
