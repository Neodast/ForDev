import Image from '../../Base/Images/Image';

export default function HeaderRightPanel() {
  return (
    <div>
      <Image
        src={'/icons/user.webp'}
        alt='User'
        className='rounded-full w-12 h-12 hover:border-[#979dac] border-4 border-transparent'
      ></Image>
    </div>
  );
}
