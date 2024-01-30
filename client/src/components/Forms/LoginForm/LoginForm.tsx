import InputField from '../InputField';
import Button from '../Button';
import { useLoginFormStore } from '../../../store/LoginFormStore';
import axios from 'axios';

export default function LoginForm() {
  const email = useLoginFormStore((state) => state.email);
  const updateEmail = useLoginFormStore((state) => state.updateEmail);
  const password = useLoginFormStore((state) => state.password);
  const updatePassword = useLoginFormStore((state) => state.updatePassword);

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
          onClick={(e) => {
            e.preventDefault();
            async function login() {
              try {
                const res = await axios.post(
                  'http://localhost:3000/auth/login',
                  {
                    email: email,
                    password: password,
                  }
                );
                console.log(res);
                // document.cookie = res.data
              } catch (e) {
                console.log(e);
              }
            }
            login();
          }}
        />
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          async function test() {
            try {
              const ress = await axios.get('http://localhost:3000/users');
              console.log(ress);
              console.log(document.cookie);
            } catch (e) {
              console.log(e);
            }
          }
          test();
        }}
      >
        clc
      </button>
    </div>
  );
}
