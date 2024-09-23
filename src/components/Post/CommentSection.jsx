import React, { useState } from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';

function CommentSection({ comments, setComments, postAuthor }) {
    const [newComment, setNewComment] = useState("");

    // 댓글 추가 함수
    const handleAddComment = () => {
        if (newComment.trim() === "") return;
        const newCommentObject = {
            id: comments.length + 1,
            author: "사용자", // 실제 앱에서는 현재 로그인한 사용자로 변경
            content: newComment,
            likes: 0,
            dislikes: 0
        };
        setComments([...comments, newCommentObject]);
        setNewComment("");
    };

    // 댓글 추천/비추천 함수
    const handleLike = (commentId) => {
        setComments(comments.map(comment =>
            comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
        ));
    };

    const handleDislike = (commentId) => {
        setComments(comments.map(comment =>
            comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment
        ));
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">댓글</h2>
            <div className="space-y-4">
                {comments.map(comment => (
                    <div
                        key={comment.id}
                        className={`p-4 rounded-lg flex justify-between ${(comment.likes - comment.dislikes) >= 15 ? 'bg-yellow-100 border border-yellow-500 shadow-lg' : 'bg-gray-100'} transition-all`}
                    >
                        <div className="text-sm text-gray-600 flex-1">
                            <div>
                                <span className="font-semibold">{comment.author}</span>
                                {comment.author === postAuthor && (
                                    <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">작성자</span>
                                )}
                            </div>
                            <p className="mt-2 text-gray-700">{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-4 ml-4">
                            <button 
                                onClick={() => handleLike(comment.id)}
                                className="flex flex-col items-center border border-gray-300 rounded-lg p-2 bg-white hover:bg-gray-200 hover:text-blue-600 transition w-16 h-16"
                            >
                                <MdThumbUp className="w-4 h-4 mb-1 text-blue-500" />
                                <span className="text-xs">추천</span>
                                <span className="text-xs">{comment.likes}</span>
                            </button>
                            <button 
                                onClick={() => handleDislike(comment.id)}
                                className="flex flex-col items-center border border-gray-300 rounded-lg p-2 bg-white hover:bg-gray-200 hover:text-red-600 transition w-16 h-16"
                            >
                                <MdThumbDown className="w-4 h-4 mb-1 text-red-500" />
                                <span className="text-xs">비추천</span>
                                <span className="text-xs">{comment.dislikes}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 댓글 입력 폼 */}
            <div className="mt-8">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="댓글을 입력하세요..."
                    rows="4"
                />
                <button
                    onClick={handleAddComment}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    댓글 추가
                </button>
            </div>
        </div>
    );
}

export default CommentSection;
