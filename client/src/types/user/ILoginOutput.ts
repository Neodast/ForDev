import IUser from '../../models/IUser';

interface ILoginOutput extends IUser {
  accessToken: string;
}

export default ILoginOutput;
