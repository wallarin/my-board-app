import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdThumbUp } from 'react-icons/md';
import CommentSection from './CommentSection';

function PostDetail({ posts }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find(post => post.id === parseInt(id));

    // 댓글 상태 관리
    const [comments, setComments] = useState([
        { id: 1, author: "댓글 작성자1", content: "이것은 첫 번째 댓글입니다.", likes: 15, dislikes: 4 },
        { id: 2, author: "주작", content: "이것은 두 번째 댓글입니다.", likes: 10, dislikes: 1 },
        // 더 많은 댓글을 추가하세요.
    ]);

    if (!post) {
        return <div className="text-center text-red-500">게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg lg:text-lg font-medium text-gray-800">{post.title}</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-blue-500 hover:underline"
                >
                    뒤로 가기
                </button>
            </div>
            <div className="border-t border-gray-300 py-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                        <span className="font-semibold">작성자: </span>{post.nickName}
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold">작성일: </span> {post.writeDate} {post.writeTime}
                        <span className="ml-4 flex items-center">
                            <MdThumbUp className="w-4 h-4 text-blue-500 mr-1" /> {post.likeCount}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {post.content}
            </div>
            <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center ml-auto">

                </div>
                <div>
                    <button
                        onClick={() => alert('글을 수정합니다.')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        수정
                    </button>
                    <button
                        onClick={() => alert('글을 삭제합니다.')}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                    >
                        삭제
                    </button>
                </div>
            </div>

            {/* 댓글 섹션 */}
            <CommentSection
                comments={comments}
                setComments={setComments}
                postAuthor={post.nickName}
            />
        </div>
    );
}

export default PostDetail;
