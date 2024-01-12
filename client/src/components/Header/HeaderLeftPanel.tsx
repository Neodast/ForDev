
export default function HeaderLeftPanel() {
  return (
    <>
      <div className='flex flex-row flex-1 flex-wrap'>
        <span>
        <img
          src='/logo.png'
          alt='ForDev'
          className='size-16 p-1 hover:bg-blue-700'
        />
        </span>
        <span className=' pt-4 pr-8 pl-8  hover:bg-blue-700 cursor-pointer'>
          Home
        </span>
        <span className='pt-4 pr-8 pl-8  hover:bg-blue-700  cursor-pointer'>
          Board
        </span>
        <span className='pt-4 pr-8 pl-8  hover:bg-blue-700  cursor-pointer'>
          Trending
        </span>
        <span className='pt-4 pr-8 pl-8  hover:bg-blue-700  cursor-pointer'>
          Top
        </span>
      </div>
    </>
  );
}
