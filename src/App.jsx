import Header from "./components/Header/Header";
import PostList from "./components/Post/PostList";
import PostDetail from "./components/Post/PostDetail";
import MobilePostList from "./components/Post/MobilePostList";
import SidebarMenu from "./components/Sidebar/SidebarMenu";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    const posts = Array.from({ length: 300 }, (_, index) => ({
        id: index + 1,
        title: `${index + 1} 번째 게시글 말줄임표가 정상적으로 실행되는 상태인지 확인해보기 위해 작성된 텍스트입니다.`,
        content: `이것은 ${index + 1} 번째 게시글입니다.`,
        nickName: '주작',
        writeDate: '2024-09-23',
        writeTime: '12:09',
        likeCount : 22000,
    }));

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
                        <Route path="/my-board-app"
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

                        {/* 상세보기 페이지 */}
                        <Route path="/my-board-app/post/:id" element={<PostDetail posts={posts} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
