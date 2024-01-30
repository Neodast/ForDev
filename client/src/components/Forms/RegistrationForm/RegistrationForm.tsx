import InputField from '../InputField';
import Button from '../Button';
import { useRegistrationFormStore } from '../../../store/RegistrationFormStore';
import axios from 'axios';

export default function RegistrationForm() {
  const name = useRegistrationFormStore((state) => state.name);
  const updateName = useRegistrationFormStore((state) => state.updateName);
  const surname = useRegistrationFormStore((state) => state.surname);
  const updateSurname = useRegistrationFormStore(
    (state) => state.updateSurname
  );
  const email = useRegistrationFormStore((state) => state.email);
  const updateEmail = useRegistrationFormStore((state) => state.updateEmail);
  const firstPassword = useRegistrationFormStore(
    (state) => state.firstPassword
  );
  const updateFirstPass = useRegistrationFormStore(
    (state) => state.updateFirstPassword
  );
  const secondPassword = useRegistrationFormStore(
    (state) => state.secondPassword
  );
  const updateSecondPass = useRegistrationFormStore(
    (state) => state.updateSecondPassword
  );

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
            async function register() {
              try {
                const res = await axios.post('http://localhost:3000/auth/registration', {
                  email: email,
                  password: firstPassword,
                  name: name,
                  surname: surname,
                }, { withCredentials: true});
                console.log(res);
              } catch (e) {
                console.log(e);
              }
            }
            register();
          }}
        />
      </form>
    </div>
  );
}
