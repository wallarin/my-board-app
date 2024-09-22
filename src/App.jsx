import Header from "./components/Header/Header";
import PostList from "./components/Post/PostList";
import MobilePostList from "./components/Post/MobilePostList";
import SidebarMenu from "./components/Sidebar/SidebarMenu";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    const posts = [
        { id: 1, title: "첫 번째 게시글", content: "이것은 첫 번째 게시글입니다." },
        { id: 2, title: "두 번째 게시글", content: "이것은 두 번째 게시글입니다." },
        { id: 3, title: "세 번째 게시글", content: "이것은 세 번째 게시글입니다." },
        { id: 4, title: "네 번째 게시글", content: "이것은 네 번째 게시글입니다." },
        { id: 5, title: "다섯 번째 게시글", content: "이것은 다섯 번째 게시글입니다." },
        { id: 6, title: "여섯 번째 게시글", content: "이것은 여섯 번째 게시글입니다." },
        { id: 7, title: "일곱 번째 게시글", content: "이것은 일곱 번째 게시글입니다." },
        { id: 8, title: "여덟 번째 게시글", content: "이것은 여덟 번째 게시글입니다." },
        { id: 9, title: "아홉 번째 게시글", content: "이것은 아홉 번째 게시글입니다." },
        { id: 10, title: "열 번째 게시글", content: "이것은 열 번째 게시글입니다." },
        { id: 11, title: "열 번째 게시글", content: "이것은 열 번째 게시글입니다." },
        { id: 12, title: "열 번째 게시글", content: "이것은 열 번째 게시글입니다." },
        // 게시글 추가 가능
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsSearchOpen(false)
    };

    const toggleSearch = (isOpen) => {
        setIsSearchOpen(isOpen);
    };

    return (
        <Router>
            <div className="App min-w-[375px] min-h-[667px]">

                <div className='relative'>
                    <Header toggleMenu={toggleMenu} isOpen={isOpen} setIsOpen={setIsOpen} onSearchToggle={toggleSearch} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                    <SidebarMenu isOpen={isOpen} isSearchOpen={isSearchOpen} />
                    {isOpen && <div className="fixed" onClick={toggleMenu} />}
                </div>
                <div className="flex-grow p-4 bg-gray-100 overflow-auto lg:w-1/2 2xl:w-3/4 mx-auto">
                    <Routes>
                        <Route path="/"
                            element={
                                <>
                                    {/* 데스크톱과 모바일 렌더링 구분 */}
                                    < div className="lg:block hidden">
                                        <PostList posts={posts} />
                                    </div>
                                    <div className="lg:hidden">
                                        <MobilePostList posts={posts} />
                                    </div>
                                </>
                            } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
