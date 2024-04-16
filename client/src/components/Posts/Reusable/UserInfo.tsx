import { FaUserCircle } from 'react-icons/fa'

interface UserInfoProps {
  nickname: string;
}

export default function UserInfo(props: UserInfoProps) {
  return (
    <div className="flex items-center mb-2">
          <FaUserCircle className="flex-shrink-0 w-6 h-6 mx-2 hover:cursor-pointer" />
          <span className="text-lg font-semibold hover:cursor-pointer">
            {props.nickname}
          </span>
        </div>
  )
}
