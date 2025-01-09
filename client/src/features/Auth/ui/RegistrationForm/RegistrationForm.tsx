import { useForm, SubmitHandler } from 'react-hook-form';
import RegisterInput from '../../../@depr/types/user/RegisterInput';
import FormValidationError from './Errors/FormValidationError';
import { Button } from 'antd';
import useUserRegister from '@/@depr/hooks/auth/useUserRegister';
import { InputField } from '@/shared/ui';

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    defaultValues: {},
    mode: 'onChange',
  });

  const { mutateAsync } = useUserRegister(reset);

  const submit: SubmitHandler<RegisterInput> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <div className="flex-1 items-center justify-center m-8 my-[7%]">
      <form
        className="w-96 mx-auto font-roboto"
        onSubmit={handleSubmit(submit)}
      >
        <InputField
          label="Name"
          type="text"
          placeholder="Name"
          {...register('name')}
        />
        <FormValidationError
          message={errors.name?.message}
        ></FormValidationError>
        <InputField
          label="Surname"
          type="text"
          placeholder="Surname"
          {...register('surname')}
        />
        <FormValidationError
          message={errors.surname?.message}
        ></FormValidationError>
        <InputField
          label="Nickname"
          type="text"
          placeholder="user123"
          {...register('nickname', {
            required: 'Nickname is required',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z]).{2,}$/,
              message:
                'Nickname require to contain 1 uppercase, 1 lowercase letters',
            },
          })}
        />
        <FormValidationError
          message={errors.nickname?.message}
        ></FormValidationError>
        <InputField
          label="Email"
          type="email"
          placeholder="example@example.com"
          {...register('email', {
            required: 'Email is required',
          })}
        />
        <FormValidationError
          message={errors.email?.message}
        ></FormValidationError>
        <InputField
          label="Password"
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            maxLength: {
              value: 16,
              message: 'Max pass length is 16 symbols',
            },
            minLength: {
              value: 5,
              message: 'Min pass length at least 5 symbols',
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
              message:
                'Password require to contain 1 number, 1 uppercase, 1 lowercase letters',
            },
          })}
        />
        <FormValidationError
          message={errors.password?.message}
        ></FormValidationError>
        <InputField
          label="Password"
          type="password"
          placeholder="Password"
          {...register('passwordConfirm', {
            required: 'Confirm password is required',
            validate: (value: string) => {
              if (watch('password') !== value) {
                return "Passwords don't match";
              }
            },
          })}
        />
        <FormValidationError
          message={errors.passwordConfirm?.message}
        ></FormValidationError>
        <Button
          size="large"
          shape="default"
          type="primary"
          htmlType="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue w-[100%]"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
