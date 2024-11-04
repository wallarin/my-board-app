import React, { useState, useRef, useEffect } from 'react';
import { MdExpandMore, MdExpandLess, MdArrowDropDown, MdArrowDropUp, MdHome, MdLogin, MdLogout, MdDarkMode, MdLightMode, MdPerson } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const SidebarMenu = ({ isOpen, onClose, isSearchOpen, isLoggedIn, setIsLoggedIn }) => {
    const [isCustomerCenterOpen, setIsCustomerCenterOpen] = useState(false);
    const toggleCustomerCenter = () => setIsCustomerCenterOpen(!isCustomerCenterOpen);
    const navigate = useNavigate();

    const [showScrollUp, setShowScrollUp] = useState(false);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const contentRef = useRef(null);

    // 로컬 스토리지에서 다크 모드 상태를 가져와 초기화
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true' || false
    );

    // 다크 모드 상태를 로컬 스토리지에 저장하고, Tailwind CSS의 다크 모드 클래스를 제어
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    // 다크 모드 토글 함수
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

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

    // 로그아웃 처리 함수
    const handleLogout = () => {
        sessionStorage.removeItem('token'); // JWT 토큰 삭제
        sessionStorage.removeItem('userId');
        setIsLoggedIn(false); // 로그인 상태를 업데이트
        onClose(); // 메뉴 닫기
        navigate('/my-board-app'); // 로그아웃 후 메인 페이지로 리다이렉트
    };

    return (
        <>
            {isOpen && (
                <div className="fixed bg-black z-40" onClick={onClose}></div>
            )}
            <div
                className={`fixed ${isSearchOpen ? 'top-30' : 'top-16'} left-0 ${isSearchOpen ? 'h-[calc(100%-8.5rem)]' : 'h-[calc(100%-4rem)]'} bg-gray-200 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-64 z-50 ${isOpen ? 'translate-x-0 w-full' : '-translate-x-full'
                    }`}
            >
                <nav className="flex flex-col h-full">
                    {showScrollUp && (
                        <div className="flex justify-center items-center p-2 bg-gray-400">
                            <MdArrowDropUp className="w-6 h-6" />
                        </div>
                    )}

                    <div ref={contentRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4 dark:bg-gray-600 dark:text-gray-200">
                        <Link to="/my-board-app" onClick={onClose} className="flex justify-between text-xl border-b border-gray-400 pb-2 break-words block">HOME <MdHome className='w-6 h-6' /></Link>
                        {/* 로그인 상태에 따라 다른 버튼 표시 */}
                        {isLoggedIn ? (
                            <>
                                <button onClick={handleLogout} className="flex justify-between text-xl border-b border-gray-400 pb-2 break-words w-full text-left">
                                    LOGOUT <MdLogout className='w-6 h-6' />
                                </button>
                                <Link to="/my-board-app/mypage" className="flex justify-between text-xl border-b border-gray-400 pb-2 break-words w-full text-left">
                                        MYPAGE <MdPerson className='w-6 h-6' />
                                </Link>
                            </>
                        ) : (
                            <Link to="/my-board-app/login" onClick={onClose} className="flex justify-between text-xl border-b border-gray-400 pb-2 break-words block">
                                LOGIN <MdLogin className='w-6 h-6' />
                            </Link>
                        )}
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
                                    <li className="my-2"><Link onClick={onClose} to="/my-board-app/inquiryList" className="break-words block">1:1 문의</Link></li>
                                </ul>
                            )}
                        </div>
                    </div>

                    {showScrollDown && (
                        <div className="flex justify-center items-center p-2 bg-gray-400">
                            <MdArrowDropDown className="w-6 h-6" />
                        </div>
                    )}

                    {/* 다크 모드 토글 버튼 - 저작권 영역 바로 위에 */}
                    <div className="p-4 bg-gray-300 dark:bg-gray-700 text-center">
                        <button
                            onClick={toggleDarkMode}
                            className="flex items-center justify-center p-2 text-lg bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded-full mx-auto"
                        >
                            {darkMode ? (
                                <>
                                    <MdLightMode className="w-6 h-6 mx-3 text-yellow-400" />
                                    <span className='mr-3'>라이트 모드</span>
                                </>
                            ) : (
                                <>
                                    <MdDarkMode className="w-6 h-6 mx-3 text-gray-800" />
                                    <span className='mr-3'>다크 모드</span>
                                </>
                            )}
                        </button>
                    </div>

                    <footer className="p-4 bg-gray-300 text-center dark:text-gray-200 dark:bg-gray-700">
                        <p>© 2024. 저작권 Co. <br />All rights reserved</p>
                    </footer>
                </nav>
            </div>
        </>
    );
};

export default SidebarMenu;
