import InputField from '../../Base/Inputs/InputField';
import Button from '../../Base/Buttons/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import ILoginInput from '../../../types/user/ILoginInput';
import { useMutation } from '@tanstack/react-query';
import authService from '../../../services/authService';
import { useUserStore } from '../../../store/UserStore';
import { useShallow } from 'zustand/react/shallow';

export default function LoginForm() {
  // const { setCredentials } = useUserStore(
  //   useShallow((state) => ({
  //     setCredentials: state.setCredentials,
  //   })),
  // );

  const { setCredentials } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    defaultValues: {},
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: authService.login,
    onSuccess: ({ data }) => {
      setCredentials(data);
    },
  });

  const submit: SubmitHandler<ILoginInput> = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      throw new Error('Login is faled');
    }
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
        <InputField
          label="password"
          placeholder=""
          type="password"
          {...register('password')}
        ></InputField>
        <Button label="Send" />
      </form>
    </div>
  );
}
