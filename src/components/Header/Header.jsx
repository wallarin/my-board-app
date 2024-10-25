import { MdMenu, MdSearch, MdLogin, MdClose, MdPerson, MdLogout } from 'react-icons/md';
import { GoChevronRight } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ toggleMenu, isOpen, setIsOpen, onSearchToggle, isSearchOpen, setIsSearchOpen, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const toggleSearch = () => {
        setIsOpen(false)
        setIsSearchOpen(!isSearchOpen);
        onSearchToggle(!isSearchOpen);
    };

    // 로그아웃 처리 함수
    const handleLogout = () => {
        localStorage.removeItem('token'); // 토큰 삭제
        localStorage.removeItem('userId');
        setIsLoggedIn(false); // 로그인 상태 변경
        alert('로그아웃 하였습니다.');
        navigate('/my-board-app'); // 로그아웃 후 메인 페이지로 이동
    };

    return (
        <header className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 shadow-md dark:shadow-gray-500 flex flex-col items-center justify-between w-full lg:relative lg:flex-row">
            <div className="flex justify-between items-center w-full lg:w-auto">
                <button onClick={toggleMenu} className={`flex items-center ${!isOpen && 'lg:pointer-events-none'}`}>
                    {isOpen ? (
                        <MdClose className="w-8 h-8" />
                    ) : (
                        <MdMenu className="w-8 h-8 block lg:invisible lg:pointer-events-none" />
                    )}
                </button>

                <Link to="/my-board-app"
                    onClick={() => {
                        window.location.href = '/my-board-app';
                    }}
                    className={`text-xl font-bold lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 ${isSearchOpen ? 'lg:top-1/4' : 'lg:top-2/4'} lg:-translate-y-1/2`}>
                    Talk Together
                </Link>

                <div className="flex space-x-4 lg:hidden">
                    <button onClick={toggleSearch}>
                        {isSearchOpen ? (
                            <MdClose className='w-8 h-8' />
                        ) : (
                            <MdSearch className="w-8 h-8" />
                        )}

                    </button>
                    {/* 로그인 상태에 따라 다르게 표시 */}
                    {isLoggedIn ? (
                        <>
                            {/* 내 정보 보기 아이콘 */}
                            <button>
                                <Link to="/my-board-app/profile">
                                    <MdPerson className="w-8 h-8" />
                                </Link>
                            </button>
                            {/* 로그아웃 버튼 */}
                            <button onClick={handleLogout}>
                                <span className="text-sm">로그아웃</span>
                            </button>
                        </>
                    ) : (
                        <button>
                            <Link to="/my-board-app/login"><MdLogin className="w-8 h-8" /></Link>
                        </button>
                    )}
                </div>
            </div>

            {/* 검색창 */}
            {isSearchOpen && (
                <div className="mt-8 w-full lg:mt-12 lg:w-auto lg:ml-auto">
                    <div className="flex items-center border border-gray-500 p-2 rounded-lg w-full lg:max-w-lg">
                        <GoChevronRight className="w-8 h-8 text-gray-500 mr-2" />
                        <div className="border-r border-gray-400 h-6 mr-2 border-2"></div>
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요."
                            className="w-full p-2 focus:outline-none"
                        />
                        <MdSearch className="w-8 h-8 ml-2 text-gray-500" />
                    </div>
                </div>
            )}

            {/* 큰 화면용 아이콘 */}
            <div className="hidden lg:flex space-x-4 absolute right-4 top-4">
                <button onClick={toggleSearch}>
                    {isSearchOpen ? (
                        <MdClose className='w-8 h-8' />
                    ) : (
                        <MdSearch className="w-8 h-8" />
                    )}
                </button>
                {/* 로그인 상태에 따라 다르게 표시 */}
                {isLoggedIn ? (
                    <>
                        {/* 내 정보 보기 아이콘 */}
                        <button>
                            <Link to="/my-board-app/profile">
                                <MdPerson className="w-8 h-8" />
                            </Link>
                        </button>
                        {/* 로그아웃 버튼 */}
                        <button onClick={handleLogout}>
                            {/* <span className="text-sm">로그아웃</span> */}
                            <MdLogout className='w-8 h-8' />
                        </button>
                    </>
                ) : (
                    <button>
                        <Link to="/my-board-app/login"><MdLogin className="w-8 h-8" /></Link>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
