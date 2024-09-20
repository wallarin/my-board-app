import Header from "./components/Header/Header";
import SidebarMenu from "./components/Sidebar/SidebarMenu";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

    const posts = [
        { id: 1, title: "첫 번째 게시글", content: "이것은 첫 번째 게시글입니다." },
        { id: 2, title: "두 번째 게시글", content: "이것은 두 번째 게시글입니다." },
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
                                <div className="max-w-full lg:max-w-4xl mx-auto p-4 bg-gray-100 min-h-full">
                                    <h1 className="text-2xl lg:text-4xl font-bold mb-4">게시판</h1>

                                    <div className="space-y-4 lg:space-y-6">
                                        {posts.map(post => (
                                            <div key={post.id} className="bg-white p-4 lg:p-6 rounded-lg shadow">
                                                <h2 className="text-xl lg:text-2xl font-semibold">{post.title}</h2>
                                                <p className="text-gray-700 mt-2 lg:text-lg">{post.content}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg lg:p-6 lg:text-xl">
                                        + 글쓰기
                                    </button>
                                </div>
                            } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
