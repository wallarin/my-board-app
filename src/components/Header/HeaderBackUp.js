import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import RightArrowIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CopyrightIcon from '@mui/icons-material/Copyright';

function Header() {

    const [searchInputState, setSearchInputState] = useState(false);
    const [hamburgerMenuState, setHamburgerMenuState] = useState(false);

    const toggleSearchInput = () => {
        if (hamburgerMenuState) return
        setSearchInputState(!searchInputState);
    }

    const toggleHamburgerMenu = () => {
        setHamburgerMenuState(!hamburgerMenuState);
    }

    const [customerServiceCenterDrop, setCustomerServiceCenterDrop] = useState(false);

    const toggleCustomerServiceCenter = () => {
        setCustomerServiceCenterDrop(!customerServiceCenterDrop);
    }

    const handleMenuClick = (event) => {
        event.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되지 않도록 합니다.
    };

    return (
        <header className='bg-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-20'>
            <div className="space-x-4">
                {!hamburgerMenuState ? (
                    <MenuIcon fontSize="large" className="cursor-pointer" onClick={toggleHamburgerMenu} />
                ) : (
                    <CloseIcon fontSize="large" onClick={toggleHamburgerMenu} />
                )}
            </div>
            <div>
                <span className="text-lg font-bold">Talk Together</span>
            </div>
            <div className="flex items-center space-x-4">
                <SearchIcon fontSize="large" className="cursor-pointer" onClick={toggleSearchInput} />
                <AccountCircleIcon fontSize="large" className="cursor-pointer" />
            </div>

            {/* Hamburger Menu */}
            <div
                className={`fixed inset-0 bg-gray-300 transition-transform duration-500 md:w-2/5 ease-in-out transform z-10 top-16 ${hamburgerMenuState ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <ul className='mx-5 my-7 cursor-pointer'>
                    <li className='border-b-2 pb-1.5'>HOME</li>
                    <li className='border-b-2 py-1.5'>LOGIN</li>
                    <li className='py-1.5' onClick={toggleCustomerServiceCenter}>
                        고객센터
                        <span>
                            {customerServiceCenterDrop ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        </span>
                        <ul className={`pl-3 pt-3 transition-all duration-500 ease-in-out overflow-hidden ${customerServiceCenterDrop ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <li onClick={handleMenuClick}>FAQ</li>
                            <li onClick={handleMenuClick}>1:1 문의</li>
                        </ul>
                    </li>
                </ul>
                <div className="fixed bottom-0 left-0 w-full flex items-center justify-center py-5 bg-gray-400 text-gray-700">
                    <CopyrightIcon className="mr-2" />
                    <span>2024. 저작권 Co. All rights reserved</span>
                </div>
            </div>

            {/* Search Input */}
            {searchInputState && (
                <div className="fixed w-full top-16 bg-gray-100 p-4 flex items-center justify-between">
                    <RightArrowIcon className='ml-4 text-gray-300' />
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="flex-grow mx-4 p-2 pl-10 pr-10 border rounded"
                    />
                    <div className="flex items-center space-x-2">
                        <SearchIcon className="cursor-pointer text-gray-600" />
                        <div className='w-0.5 h-6 bg-gray-300'></div>
                        <CloseIcon className="cursor-pointer text-gray-600" onClick={toggleSearchInput} />
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header