import InputField from '../InputField';
import Button from '../Button';
import { useLoginFormStore, login, getAllUser } from '../../../store/LoginFormStore';

export default function LoginForm() {
  const { email, password, updateEmail, updatePassword } = useLoginFormStore();

  return (
    <div className='flex-1 items-center justify-center mt-16'>
      <form className='w-96 mx-auto'>
        <InputField
          label='Email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => updateEmail(e.currentTarget.value)}
        />
        <span>{email}</span>
        <InputField
          label='Password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => updatePassword(e.currentTarget.value)}
        />
        <span>{password}</span>
        <Button
          label='Send'
          onClick={(event) => {
            event.preventDefault();
            try {
              login(email, password);
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </form>
      <button
        onClick={(event) => {
          event.preventDefault();
          try {
            getAllUser();
          } catch (e) {
            console.log(e);
          }
        }}
      >
        clc
      </button>
    </div>
  );
}
