'use client';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useState, useEffect, ReactNode } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation'
import { FaSearch } from 'react-icons/fa';
interface MyComponentProps {
  children: ReactNode;
}
const Sidebar: React.FC<MyComponentProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname()
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen">

      <Transition
        show={isOpen || isDesktop}
        enter="transition ease-out duration-300"
        enterFrom="-translate-x-full opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="transition ease-in duration-300"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="-translate-x-full opacity-0"
      >
        <div className={`fixed inset-y-0 left-0 w-64 bg-white border-dashed border-r-2 border-gray-200 z-50 transform md:translate-x-0 ${isOpen ? '' : '-translate-x-full'} md:block`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 bg-white text-[#000]">
              <h1 className="text-lg font-semibold">Logo</h1>
              <button onClick={() => setIsOpen(false)} className="md:hidden">
                <FiX size={24} />
              </button>
            </div>
            <nav className="flex-grow">
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className={`flex items-center space-x-2 px-4 py-2 bg-gray-100 mx-5 rounded-xl`}>
                    <div className='flex items-center gap-3'>
                      <img src="/images/seko.jpg" width={37} className='rounded-full' alt="" />
                      <div>
                        <div className='text-[#000000be] font-bold'>SIEM Seko</div>
                        <div className='text-[#00000027]'>User</div>
                      </div>
                    </div>
                  </Link>
                </li>
                <div className='px-2 pt-5 text-[#000000be] font-bold'>Menu</div>
                <li>
                  <Link href="/" className={`flex items-center space-x-2 mx-5 rounded-md px-6 py-3 hover:bg-gray-100 ${pathname === '/' ? 'bg-[#56cd3511] text-[#56cd35] font-bold' : ''}`}>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={`flex items-center space-x-2 mx-5 rounded-md  px-6 py-3 hover:bg-gray-100 ${pathname === '/about' ? 'bg-[#56cd3511] text-[#56cd35] font-bold' : ''}`}>
                    <span>About</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Transition>
      {/* Main Content */}
      <div className={`flex-grow bg-gray-100 ${isDesktop ? 'md:pl-[250px]' : ''}`}>
        <header className="flex items-center justify-between px-10 py-4 bg-white ">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FiMenu size={24} />
          </button>
          <div><FaSearch /></div>
          <div className='flex items-center gap-5'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/1200px-Flag_of_Cambodia.svg.png" width={30} className='rounded-sm' alt="" />
            <img src="/images/seko.jpg" width={37} className='rounded-full' alt="" />
          </div>
        </header>
        <main className="p-4">
          <div className="bg-white p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
export default Sidebar;