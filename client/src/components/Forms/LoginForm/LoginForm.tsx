import InputField from '../../Base/Inputs/InputField';
import { useForm, SubmitHandler } from 'react-hook-form';
import ILoginInput from '../../../types/user/ILoginInput';
import { useMutation } from '@tanstack/react-query';
import AuthService from '../../../services/AuthService';
import { useUserStore } from '../../../stores/UserStore';
import FormValidationError from '../RegistrationForm/Errors/FormValidationError';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

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
      navigate('/');
    },
  });

  const submit: SubmitHandler<ILoginInput> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className="flex-1 items-center justify-center m-8">
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
          placeholder="Password"
          type="password"
          {...register('password')}
        ></InputField>
        <FormValidationError
          message={errors.password?.message}
        ></FormValidationError>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue w-[100%]">
          Login
        </Button>
      </form>
    </div>
  );
}
