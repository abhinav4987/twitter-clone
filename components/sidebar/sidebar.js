import Image from 'next/image';
import SidebarLink from './sidebar-link';
import {HomeIcon} from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline';


export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
        <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
            <Image src="https://rb.gy/ogau5a" width={30} height={30} />
        </div>

        <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
          <SidebarLink text="Home" Icon={HomeIcon} active/>
          <SidebarLink text="Explore" Icon={HashtagIcon} />
          <SidebarLink text="Notifications" Icon={BellIcon} />
          <SidebarLink text="Messages" Icon={BookmarkIcon} />
          <SidebarLink text="BookMarks" Icon={ClipboardListIcon} />
          <SidebarLink text="Profile" Icon={UserIcon} />
          <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
        </div>
        <button className="text-[#d9d9d9] hidden xl:inline ml-auto bg-[#1d9bf0] 
        rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
          Tweet
        </button>
        <div className='text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-2.5'>
          <img 
            src={"https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG90cmFpdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"} 
            alt="" 
            className='h-10 w-10 rounded-full xl:mr-2.5'
          />
          <div className='hidden xl:inline leading-5'>
            <h4 className='font-bold'>Eman Name</h4>
            <p className='text-[#6e767d]'>@emanname</p>
          </div>
          <DotsHorizontalIcon className='h-5 hidden xl:inline ml-10'/>
        </div>
    </div>
  )
}
