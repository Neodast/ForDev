import { cn } from '@/lib/utils';
import { FaUserCircle } from 'react-icons/fa';

interface UserInfoProps {
  surname?: string;
  name?: string;
  nickname: string;
  className?: string;
}

export default function UserInfo(props: UserInfoProps) {
  return (
    <div
      className={cn('flex flex-row items-center mb-2 text-lg', props.className)}
    >
      <FaUserCircle className="flex-shrink-0 mx-2 size-8 hover:cursor-pointer" />
        {(props.surname || props.name) ? (
          <div className="flex flex-col">
            <span className="inline-flex space-x-2 font-semibold hover:cursor-pointer">
              <div>{props.name}</div>
              <div>{props.surname}</div>
            </span>
            <span className="inline-flex font-semibold hover:cursor-pointer text-[80%] mt-[-0.4rem]">
              @{props.nickname}
            </span>
          </div>
        ) : (
          <div>
            <span className="font-semibold hover:cursor-pointer text-[100%]">
              @{props.nickname}
            </span>
          </div>
        )}
      </div>
  );
}
