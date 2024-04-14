import InputField from '../../Base/Inputs/InputField';
// import Button from '../../Base/Buttons/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import ILoginInput from '../../../types/user/ILoginInput';
import { useMutation } from '@tanstack/react-query';
import AuthService from '../../../services/AuthService';
import { useUserStore } from '../../../store/UserStore';
import FormValidationError from '../RegistrationForm/Errors/FormValidationError';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const login = useUserStore((state) => state.login);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginInput>({
    defaultValues: {},
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthService.login,
    onSuccess: ({ data }) => {
      login(data);
      reset();
    },
  });

  const submit: SubmitHandler<ILoginInput> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className="flex-1 items-center justify-center mt-16">
      <form className="w-96 mx-auto" onSubmit={handleSubmit(submit)}>
        <InputField
          label="Email"
          placeholder="email@gmail.com"
          type="email"
          {...register('email')}
        ></InputField>
        <FormValidationError
          message={errors.email?.message}
        ></FormValidationError>
        <InputField
          label="password"
          placeholder=""
          type="password"
          {...register('password')}
        ></InputField>
        <FormValidationError
          message={errors.password?.message}
        ></FormValidationError>
        <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue w-[100%]'>Login</Button>
      </form>
    </div>
  );
}
