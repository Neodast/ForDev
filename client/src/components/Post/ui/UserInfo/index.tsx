import { cn } from '@/shared/lib/tailwind';
import { ProfileInfo } from '@/shared/models/types/profile-info.type';
import { FaUserCircle } from 'react-icons/fa';
import { nicknameFormatterHelper } from '../../models/helpers/nickname-formatter.helper';

type UserInfoProps = {
  profileInfo: ProfileInfo;
  className?: string;
};

export function UserInfo({ profileInfo, className }: UserInfoProps) {
  return (
    <div className={cn('flex flex-row items-center mb-2 text-lg', className)}>
      <FaUserCircle className="flex-shrink-0 mx-2 size-8 hover:cursor-pointer" />
      {profileInfo?.surname || profileInfo?.name ? (
        <div className="flex flex-col">
          <span className="inline-flex space-x-2 font-semibold hover:cursor-pointer">
            <div>{profileInfo?.name}</div>
            <div>{profileInfo?.surname}</div>
          </span>
          <span className="inline-flex font-semibold hover:cursor-pointer text-[80%] mt-[-0.4rem]">
            {nicknameFormatterHelper('@', profileInfo.nickname)}
          </span>
        </div>
      ) : (
        <div>
          <span className="font-semibold hover:cursor-pointer text-[100%]">
            {nicknameFormatterHelper('@', profileInfo.nickname)}
          </span>
        </div>
      )}
    </div>
  );
}
