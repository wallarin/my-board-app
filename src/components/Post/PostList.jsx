import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assert/css/Scroll.css';
import Pagination from '../Utils/Pagination.jsx';
import { MdThumbUp } from 'react-icons/md';

function PostList({ posts }) {

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const navigate = useNavigate();

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 오늘 날짜를 가져옵니다.
    const today = new Date().toISOString().split('T')[0];

    // 추천수 포맷팅 함수
    const formatRecommendationCount = (count) => {
        if (count >= 10000) {
            return `${(count / 10000).toFixed(1)}만 +`;
        }
        return count.toLocaleString(); // 10,000 미만은 천 단위로 쉼표 추가
    };

    const handleWritePost = () => {
        navigate('/my-board-app/postWrite'); // 글쓰기 페이지 경로로 이동
    };

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto p-4 bg-gray-100 dark:bg-gray-700 h-[calc(100vh-6rem)] overflow-y-auto">
            <h1 className="text-2xl lg:text-3xl font-medium mb-4 dark:text-white">게시판</h1>

            {/* 헤더 라인 */}
            <div className="flex justify-between bg-gray-200 dark:bg-gray-900 p-4 rounded-t-lg font-bold text-gray-700 dark:text-gray-300">
                <span className="w-1/2">제목</span>
                <span className="w-1/6 text-center">작성자</span>
                <span className="w-1/6 text-center">작성일</span>
                <span className="w-1/6 text-center flex justify-center items-center">
                    추천수
                    <MdThumbUp className="ml-2 w-5 h-5 text-blue-500" />
                </span>
            </div>

            {/* 게시글 목록 */}
            <div className="space-y-2 dark:bg-gray-700">
                {currentPosts.map(post => (
                    <Link 
                        to={`/my-board-app/post/${post.postId}`} 
                        key={post.postId} 
                        className="flex justify-between bg-white dark:bg-gray-600 p-4 rounded-lg shadow cursor-pointer hover:text-orange-100 visited:text-gray-500 dark:visited:text-gray-400 dark:hover:text-orange-200"
                    >
                        <span className="w-1/2 truncate dark:text-gray-200">{post.title}</span>
                        <span className="w-1/6 text-center dark:text-gray-300">{post.nickname}</span>
                        <span className="w-1/6 text-center dark:text-gray-300">
                            {post.writeDate === today ? `${post.writeTime}` : post.writeDate}
                        </span>
                        <span className="w-1/6 text-center dark:text-gray-300">
                            {formatRecommendationCount(post.likeCount)}
                        </span>
                    </Link>
                ))}
            </div>

            <Pagination
                totalPosts={posts.length}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <button 
                onClick={handleWritePost}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg lg:p-6 lg:text-xl dark:bg-blue-700 dark:text-gray-200">
                + 글쓰기
            </button>
        </div>
    );
}

export default PostList;
