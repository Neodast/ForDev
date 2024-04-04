import InputField from '../../Base/Inputs/InputField';
import Button from '../../Base/Buttons/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import IRegisterInput from '../../../types/user/IRegisterInput';
import AuthService from '../../../services/authService';

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IRegisterInput>({
    defaultValues: {},
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: AuthService.registration,
    onSuccess: ({ data }) => {
      reset(data);
    },
  });

  const submit: SubmitHandler<IRegisterInput> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className="flex-1 items-center justify-center mt-16">
      <form className="w-96 mx-auto" onSubmit={handleSubmit(submit)}>
        <InputField
          label="Name"
          type="text"
          placeholder="Name"
          {...register('name')}
        />
        <InputField
          label="Surname"
          type="text"
          placeholder="Surname"
          {...register('surname')}
        />
        <InputField
          label="Nickname"
          type="text"
          placeholder="user123"
          {...register('nickname', {
            required: 'Nickname is required',
          })}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="example@example.com"
          {...register('email')}
        />
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
                'Password require to contaion 1 number, 1 uppercase, 1 lowercase letters',
            },
          })}
        />
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
        <Button label="Send" />
      </form>
    </div>
  );
}
