import { cn } from '@/shared/lib/utils';
import { ProfileInfo } from '@/shared/types/profile-info.type';
import { FaUserCircle } from 'react-icons/fa';

interface UserInfoProps {
  profileInfo: ProfileInfo;
  className?: string;
}

export function UserInfo(props: UserInfoProps) {
  return (
    <div
      className={cn('flex flex-row items-center mb-2 text-lg', props.className)}
    >
      <FaUserCircle className="flex-shrink-0 mx-2 size-8 hover:cursor-pointer" />
      {props.profileInfo?.surname || props.profileInfo?.name ? (
        <div className="flex flex-col">
          <span className="inline-flex space-x-2 font-semibold hover:cursor-pointer">
            <div>{props.profileInfo?.name}</div>
            <div>{props.profileInfo?.surname}</div>
          </span>
          <span className="inline-flex font-semibold hover:cursor-pointer text-[80%] mt-[-0.4rem]">
            @{props.profileInfo.nickname}
          </span>
        </div>
      ) : (
        <div>
          <span className="font-semibold hover:cursor-pointer text-[100%]">
            @{props.profileInfo.nickname}
          </span>
        </div>
      )}
    </div>
  );
}
