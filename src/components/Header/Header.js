import { MdMenu, MdSearch, MdAccountCircle, MdClose } from 'react-icons/md';
import { GoChevronRight } from "react-icons/go";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleMenu, isOpen, setIsOpen, onSearchToggle, isSearchOpen, setIsSearchOpen }) => {

    const toggleSearch = () => {
        setIsOpen(false)
        setIsSearchOpen(!isSearchOpen);
        onSearchToggle(!isSearchOpen);
    };

    return (
        <header className="bg-white text-black p-4 shadow-md flex flex-col items-center justify-between w-full lg:relative lg:flex-row">
            <div className="flex justify-between items-center w-full lg:w-auto">
                <button onClick={toggleMenu} className={`flex items-center ${!isOpen && 'lg:pointer-events-none'}`}>
                    {isOpen ? (
                        <MdClose className="w-8 h-8" />
                    ) : (
                        <MdMenu className="w-8 h-8 block lg:invisible lg:pointer-events-none" />
                    )}
                </button>

                <Link to="/" className={`text-xl font-bold lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 ${isSearchOpen ? 'lg:top-1/4' : 'lg:top-2/4'} lg:-translate-y-1/2`}>
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
                    <button>
                        <MdAccountCircle className="w-8 h-8" />
                    </button>
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
                <button>
                    <MdAccountCircle className="w-8 h-8" />
                </button>
            </div>
        </header>
    );
};

export default Header;
