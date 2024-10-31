import Header from "./components/Header/Header";
import PostList from "./components/Post/PostList";
import PostDetail from "./components/Post/PostDetail";
import MobilePostList from "./components/Post/MobilePostList";
import SidebarMenu from "./components/Sidebar/SidebarMenu";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Utils/Login';
import TermsOfUse from "./components/Utils/TermsOfUse";
import SignUp from "./components/Utils/SignUp";
import Faq from "./components/Utils/FaqList";
import Inquiry from "./components/Utils/Inquiry";
import Test from "./components/Test";

import PostWrite from "./components/Post/PostWrite";

function App() {

    // const posts = Array.from({ length: 300 }, (_, index) => ({
    //     id: index + 1,
    //     title: `${index + 1} 번째 게시글 말줄임표가 정상적으로 실행되는 상태인지 확인해보기 위해 작성된 텍스트입니다.`,
    //     content: `이것은 ${index + 1} 번째 게시글입니다.`,
    //     nickName: '주작',
    //     writeDate: '2024-09-23',
    //     writeTime: '12:09',
    //     likeCount: 22000,
    // }));

    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [agreeTerms, setAgreedTems] = useState(false);
    
    

    // 로그인 상태 확인
    useEffect(() => {
        
        const sessionToken = sessionStorage.getItem('token');
        if (sessionToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // const [posts, setPosts] = useState([]);  // 게시글 목록을 위한 상태
    // const postsPerPage = 10;
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
    // // DB에서 게시글 목록을 가져오는 함수
    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const sessionUserId = sessionStorage.getItem('userId') || 'unknown';
    //             const response = await axios.get('/api/board/list', {
    //                 params: {
    //                     page: currentPage -1,
    //                     perSize: postsPerPage,
    //                     userId: sessionUserId
    //                 }
    //             });  // 백엔드 API 호출
    //             setPosts(response.data);  // 게시글 목록을 상태에 저장
    //             setTotalPages(response.data.totalPages);
    //         } catch (error) {
    //             console.error('게시글 목록을 가져오는 중 오류 발생:', error);
    //         }
    //     };
    //     fetchPosts();
    // }, [currentPage]);

    const onClose = () => {
        setIsOpen(false);
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsSearchOpen(false)
    };

    const toggleSearch = (isOpen) => {
        setIsSearchOpen(isOpen);
    };

    // 로그아웃 함수
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="App min-w-[375px] min-h-[667px] dark:bg-gray-800">
                <div className='relative'>
                    <Header
                        toggleMenu={toggleMenu}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        onSearchToggle={toggleSearch}
                        isSearchOpen={isSearchOpen}
                        setIsSearchOpen={setIsSearchOpen}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                    <SidebarMenu isOpen={isOpen} onClose={onClose} isSearchOpen={isSearchOpen} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    {isOpen && <div className="fixed" onClick={toggleMenu} />}
                </div>
                <div className="flex-grow p-4 bg-gray-100 dark:bg-gray-700 overflow-auto lg:w-1/2 2xl:w-3/4 mx-auto">
                    <Routes>
                        <Route path="/" element={<Navigate to="/my-board-app" replace />} />
                        <Route path="/my-board-app"
                            element={
                                <>
                                    {/* 데스크톱과 모바일 렌더링 구분 */}
                                    < div className="lg:block hidden">
                                        <PostList />
                                    </div>
                                    {/* <div className="lg:hidden">
                                        <MobilePostList posts={posts} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                                    </div> */}
                                </>
                            } />
                        <Route path="/my-board-app/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/my-board-app/termsOfUse" element={<TermsOfUse setAgreedTems={setAgreedTems}/>} />
                        <Route path="/my-board-app/signUp" element={<SignUp agreeTerms={agreeTerms} setAgreedTems={setAgreedTems} isLoggedIn={isLoggedIn} />} />
                        <Route path="/my-board-app/faq" element={<Faq />} />
                        <Route path="/my-board-app/inquiry" element={<Inquiry />} />
                        <Route path="/my-board-app/test" element={<Test />} />
                        {/* 상세보기 페이지 */}
                        <Route path="/my-board-app/postwrite" element={<PostWrite isLoggedIn={isLoggedIn}/>} />
                        <Route path="/my-board-app/post/:id/edit" element={<PostWrite isLoggedIn={isLoggedIn} editMode={true} />} />
                        <Route path="/my-board-app/post/:id" element={<PostDetail />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
