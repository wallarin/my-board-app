import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdThumbUp } from 'react-icons/md';

const MobilePostList = ({ posts }) => {
    const [visiblePosts, setVisiblePosts] = useState(5);
    const contentRef = useRef(null);

    const handleLoadMore = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5);
    };

    const scrollToTop = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToBottom = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: contentRef.current.scrollHeight, behavior: 'smooth' });
        }
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

    return (
        <div className="relative max-w-full lg:max-w-4xl mx-auto p-4 bg-gray-100 h-[calc(100vh-6rem)] overflow-hidden">
            <h1 className="text-2xl lg:text-3xl font-medium mb-4">게시판</h1>

            <div ref={contentRef} className="space-y-4 lg:space-y-6 h-[calc(100%-3rem)] overflow-y-auto pr-4">
                {posts.slice(0, visiblePosts).map(post => (
                    <Link
                        to={`/my-board-app/post/${post.id}`}
                        key={post.id}
                        className="block bg-white p-4 rounded-lg shadow cursor-pointer hover:text-orange-100 visited:text-gray-500"
                    >
                        <div className="flex justify-between">
                            <div className="flex flex-col w-full">
                                <h2 className="text-lg font-semibold line-clamp-2 overflow-hidden text-ellipsis">
                                    {post.title}
                                </h2>
                                <div className="flex justify-between text-sm text-gray-600 mt-1">
                                    <span>{post.nickName}</span>
                                    <span>{post.writeDate === today ? `${post.writeTime}` : post.writeDate}</span>
                                    <span className="flex items-center text-blue-500">
                                        <MdThumbUp className="w-4 h-4 mr-1" />
                                        {formatRecommendationCount(post.likeCount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {visiblePosts < posts.length && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
                    >
                        더보기 +
                    </button>
                )}
            </div>

            {/* TOP/BOTTOM 버튼 */}
            <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
                <button
                    onClick={scrollToTop}
                    className="bg-gray-700 text-white p-2 rounded-full shadow-lg"
                >
                    <MdKeyboardArrowUp className="w-6 h-6" />
                </button>
                <button
                    onClick={scrollToBottom}
                    className="bg-gray-700 text-white p-2 rounded-full shadow-lg"
                >
                    <MdKeyboardArrowDown className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default MobilePostList;
