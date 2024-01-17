import userLogoUrl from '../../assets/k1.png';
import { lazy } from 'react';

const UserIcon = lazy(() => import('../Image'));

export default function HeaderRightPanel() {
  return (
    <div>
      <UserIcon
        src={userLogoUrl}
        alt='User'
        className='rounded-full w-16 h-16 hover:border-[#979dac] border-4 border-transparent'
      ></UserIcon>
    </div>
  );
}
