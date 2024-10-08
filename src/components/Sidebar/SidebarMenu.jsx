import React, { useState, useRef, useEffect } from 'react';
import { MdExpandMore, MdExpandLess, MdArrowDropDown, MdArrowDropUp, MdHome, MdLogin } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SidebarMenu = ({ isOpen, onClose, isSearchOpen }) => {
    const [isCustomerCenterOpen, setIsCustomerCenterOpen] = useState(false);
    const toggleCustomerCenter = () => setIsCustomerCenterOpen(!isCustomerCenterOpen);

    const [showScrollUp, setShowScrollUp] = useState(false);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const contentRef = useRef(null);

    // 스크롤 상태를 확인하여 화살표 표시 여부 결정
    const handleScroll = () => {
        if (contentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
            setShowScrollUp(scrollTop > 0);
            setShowScrollDown(scrollTop + clientHeight < scrollHeight - 1);
        }
    };

    useEffect(() => {
        handleScroll();  // 초기 로딩 시 스크롤 상태 확인
    }, []);

    return (
        <>
        {isOpen && (
            <div className="fixed bg-black z-40" onClick={onClose}></div>
        )}
        <div
            className={`fixed ${isSearchOpen ? 'top-30' : 'top-16'} left-0 ${isSearchOpen ? 'h-[calc(100%-8.5rem)]' : 'h-[calc(100%-4rem)]'} bg-gray-200 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-64 z-50 ${
                isOpen ? 'translate-x-0 w-full' : '-translate-x-full'
            }`}
        >
            <nav className="flex flex-col h-full">
                {showScrollUp && (
                    <div className="flex justify-center items-center p-2 bg-gray-400">
                        <MdArrowDropUp className="w-6 h-6" />
                    </div>
                )}

                <div ref={contentRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4">
                    <Link to="/my-board-app" onClick={onClose} className="flex justify-between text-xl border-b border-gray-400 pb-2 break-words block">HOME <MdHome className='w-6 h-6'/></Link>
                    <Link to="/my-board-app/login" onClick={onClose} className="flex justify-between text-xl border-b border-gray-400 pb-2 break-words block">LOGIN <MdLogin className='w-6 h-6'/></Link>
                    <div className="border-b border-gray-400">
                        <button
                            onClick={toggleCustomerCenter}
                            aria-expanded={isCustomerCenterOpen}
                            className="flex items-center justify-between w-full text-xl pb-2"
                        >
                            고객센터
                            {isCustomerCenterOpen ? <MdExpandLess className="w-6 h-6" /> : <MdExpandMore className="w-6 h-6" />}
                        </button>
                        {isCustomerCenterOpen && (
                            <ul className="pl-4">
                                <li className="my-2"><Link onClick={onClose} to="/my-board-app/faq" href="#" className="break-words block">FAQ</Link></li>
                                <li className="my-2"><Link onClick={onClose} to="/my-board-app/inquiry" className="break-words block">1:1 문의</Link></li>
                            </ul>
                        )}
                    </div>
                </div>

                {showScrollDown && (
                    <div className="flex justify-center items-center p-2 bg-gray-400">
                        <MdArrowDropDown className="w-6 h-6" />
                    </div>
                )}

                <footer className="p-4 bg-gray-300 text-center">
                    <p>© 2024. 저작권 Co. <br/>All rights reserved</p>
                </footer>
            </nav>
        </div>
    </>
    );
};

export default SidebarMenu;
