import InputField from '../InputField';
import Button from '../Button';
import { useFormStore } from '../../../store/RegistrationFormStore';
import axios from 'axios';

export default function RegistrationForm() {
  const name = useFormStore((state) => state.name);
  const updateName = useFormStore((state) => state.updateName);
  const surname = useFormStore((state) => state.surname);
  const updateSurname = useFormStore((state) => state.updateSurname);
  const email = useFormStore((state) => state.email);
  const updateEmail = useFormStore((state) => state.updateEmail);
  const firstPassword = useFormStore((state) => state.firstPassword);
  const updateFirstPass = useFormStore((state) => state.updateFirstPassword);
  const secondPassword = useFormStore((state) => state.secondPassword);
  const updateSecondPass = useFormStore((state) => state.updateSecondPassword);

  return (
    <div className='flex-1 items-center justify-center mt-16'>
      <form className='w-96 mx-auto'>
        <InputField
          label='Name'
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => updateName(e.currentTarget.value)}
        />
        <span>{name}</span>
        <InputField
          label='Surname'
          type='text'
          placeholder='Surname'
          value={surname}
          onChange={(e) => updateSurname(e.currentTarget.value)}
        />
        <span>{surname}</span>
        <InputField
          label='Email'
          type='email'
          placeholder='example@example.com'
          value={email}
          onChange={(e) => updateEmail(e.currentTarget.value)}
        />
        <span>{email}</span>
        <InputField
          label='Password'
          type='password'
          placeholder='Password'
          value={firstPassword}
          onChange={(e) => updateFirstPass(e.currentTarget.value)}
        />
        <span>{firstPassword}</span>
        <InputField
          label='Password'
          type='password'
          placeholder='Password'
          value={secondPassword}
          onChange={(e) => updateSecondPass(e.currentTarget.value)}
        />
        <span>{secondPassword}</span>
        <Button
          label='Send'
          onClick={(e) => {
            e.preventDefault();
            async function rsp() {
              try {
                const res = await axios.post('http://localhost:3000/auth', {
                  email: email,
                  password: firstPassword,
                  name: name,
                  surname: surname,
                });
                console.log(res);
              } catch (e) {
                console.log(e);
              }
            }
            rsp();
          }}
        />
      </form>
    </div>
  );
}
