import React, { useState } from 'react'
import '../../assert/css/Scroll.css'
import Pagination from '../Utils/Pagination.jsx'

function PostList({ posts }) {

    //현재 페이지를 이동할때마다 첫번째 페이지에 개수가 하나씩 더 늘어나는 버그가 발생
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto p-4 bg-gray-100 h-[calc(100vh-6rem)] overflow-y-auto">
            <h1 className="text-2xl lg:text-3xl font-medium mb-4">게시판</h1>

            <div className="space-y-4 lg:space-y-6">
                {currentPosts.map(post => (
                    <div key={post.id} className="bg-white p-4 lg:p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-700 mt-2 lg:text-lg font-light">{post.content}</p>
                    </div>
                ))}
            </div>

            <Pagination
                totalPosts={posts.length}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg lg:p-6 lg:text-xl">
                + 글쓰기
            </button>
        </div>
    )
}

export default PostList