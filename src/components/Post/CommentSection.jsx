import React, { useState, useEffect } from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import axios from 'axios';
import './comment.css';

function CommentSection({ postId, postAuthor }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정 중인 댓글 ID
    const [editedCommentContent, setEditedCommentContent] = useState(""); // 수정 중인 댓글 내용
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId') || "unknown";

    const [likeState, setLikeState] = useState(null);

    // 댓글 목록을 서버에서 불러오는 함수
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments/post/${postId}`, {
                    params: { loginId: userId }
                });
                setComments(response.data);
            } catch (error) {
                console.error("댓글을 불러오는 중 오류 발생:", error);
            }
        };

        fetchComments();
    }, [postId]);



    // 댓글 추가 함수
    const handleAddComment = async () => {
        if (newComment.trim() === "") { alert('댓글을 입력하세요.'); return };
        try {
            const response = await axios.post(`/api/comments/post/${postId}`, {
                userId: userId, // 실제 앱에서는 현재 로그인한 사용자로 변경
                content: newComment,
                parentCommentId: null,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments([...comments, response.data]);
            setNewComment("");
        } catch (error) {
            console.error("댓글 추가 중 오류 발생:", error);
        }
    };

    // 댓글 삭제 함수
    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`/api/comments/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(comments.filter(comment => comment.commentId !== commentId));
        } catch (error) {
            console.error("댓글 삭제 중 오류 발생:", error);
        }
    };

    // 수정 모드 활성화
    const handleEdit = (comment) => {
        setEditingCommentId(comment.commentId);
        setEditedCommentContent(comment.content);
    };

    // 댓글 수정 함수
    const handleUpdateComment = async (commentId) => {
        try {
            const response = await axios.put(`/api/comments/${commentId}`, {
                content: editedCommentContent
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(comments.map(comment =>
                comment.commentId === commentId ? { ...comment, content: response.data.content } : comment
            ));
            setEditingCommentId(null);
            setEditedCommentContent("");
        } catch (error) {
            console.error("댓글 수정 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey && event.key === 's') {
                event.preventDefault(); // 기본 동작 방지
                handleAddComment();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [newComment]); // newComment가 변경될 때마다 리렌더링

    // 댓글 추천/비추천 함수
    const handleLike = async (commentId) => {
        // 이미 추천한 경우 요청을 보내지 않음
        try {
            const response = await axios.post(
                `/api/comments/${commentId}/like`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        userId: userId
                    }
                }
            );

            
            if (response.data === "댓글이 추천되었습니다.") {
                alert(response.data);
                setComments(comments.map(comment => {
                    if (comment.commentId === commentId) {
                        return {
                            ...comment,
                            likeCount: comment.likeCount + 1,
                            unlikeCount: (likeState === "dislike" || likeState === null) && comment.unlikeCount > 0 
                                ? comment.unlikeCount - 1 
                                : comment.unlikeCount,
                            likeState: "like"
                        }
                    }
                    return comment;
                }));
                // likeState가 "like"가 아닐 때만 업데이트
            } else if (response.data === "이미 추천한 댓글입니다.") {
                alert(response.data);  // 이미 추천한 경우 메시지 표시
            } else if (response.data === "본인 글에는 추천할 수 없습니다.") {
                alert(response.data);  // 본인이 작성한 댓글일 경우 메시지 표시
            } else {
                alert(response.data);
            }
            
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert(error.response.data.message || "이미 추천한 댓글입니다.");
                } else if (error.response.status === 403) {
                    alert("권한이 없습니다. 로그인 상태를 확인해주세요.");
                }
            } else {
                console.error("댓글 추천 중 오류 발생:", error);
            }
        }
    };

    const handleDislike = async (commentId) => {
        try {
            const response = await axios.post(
                `/api/comments/${commentId}/dislike`,
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        userId: userId
                    }
                }
            );

            if (response.data === "댓글이 비추천되었습니다.") {
                alert(response.data);
                setComments(comments.map(comment => {
                    if (comment.commentId === commentId) {
                        return {
                            ...comment,
                            unlikeCount: comment.unlikeCount + 1,
                            likeCount: (likeState === "like" || likeState === null) && comment.likeCount > 0
                                ? comment.likeCount - 1 : comment.likeCount,
                            likeState: "dislike"
                        };
                    }
                    return comment;
                }));

                // likeState가 "dislike"가 아닐 때만 업데이트

            } else if (response.data === "이미 비추천한 댓글입니다.") {
                alert(response.data);  // 이미 비추천한 경우 메시지 표시
            } else if (response.data === "본인 글에는 비추천할 수 없습니다.") {
                alert(response.data);  // 본인이 작성한 댓글일 경우 메시지 표시
            } else {
                alert(response.data);
            }

            
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // 서버에서 전달한 오류 메시지 표시
            } else {
                console.error("댓글 비추천 중 오류 발생:", error);
            }
        }
    };

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-200">댓글</h2>
            <div className="space-y-4">
                {comments.map((comment, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg flex justify-between ${(comment.likeCount - comment.unlikeCount) >= 15 ? 'bg-yellow-100 border border-yellow-500 shadow-lg' : 'bg-gray-100 dark:bg-gray-400'} transition-all`}
                    >
                        <div className="text-sm text-gray-600 dark:text-gray-200 flex-1">
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center">
                                    <span className="font-semibold">{comment.nickname}</span>
                                    {comment.nickname === postAuthor && (
                                        <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">작성자</span>
                                    )}
                                    <span className="text-gray-500 dark:text-gray-300 text-xs mx-3">{formatDate(comment.writeDate)}</span>
                                </div>
                                { comment.modifiable === "Y" ? (
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => handleEdit(comment)}
                                            className="bg-blue-400 text-white text-xs px-2 py-1 border border-blue-500 rounded transition duration-200 hover:bg-blue-500"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comment.commentId)}
                                            className="bg-red-400 text-white text-xs px-2 py-1 border border-red-500 rounded transition duration-200 hover:bg-red-500"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ) : ""}
                            </div>
                            {editingCommentId === comment.commentId && comment.modifiable === "Y" ? (
                                <div className="mt-2">
                                    <textarea
                                        value={editedCommentContent}
                                        onChange={(e) => setEditedCommentContent(e.target.value)}
                                        className="w-full p-2 border rounded-lg dark:bg-gray-200 dark:text-gray-700 focus:ring-blue-500 focus:ring-2 focus:outline-none resize-none"
                                        rows="4"
                                    />
                                    <button
                                        onClick={() => handleUpdateComment(comment.commentId)}
                                        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        저장
                                    </button>
                                </div>
                            ) : (
                                <p className="mt-2 text-gray-700 dark:text-gray-100">{comment.content}</p>
                            )}
                        </div>
                        <div className="flex items-center space-x-4 ml-4">
                            <button
                                onClick={() => handleLike(comment.commentId)}
                                className="flex flex-col items-center border border-gray-300 rounded-lg p-2 bg-white hover:bg-gray-200 hover:text-blue-600 dark:bg-gray-300 dark:text-gray-100 transition w-16 h-16"
                            >
                                <MdThumbUp className="w-4 h-4 mb-1 text-blue-500" />
                                <span className="text-xs">추천</span>
                                <span className="text-xs">{comment.likeCount}</span>
                            </button>
                            <button
                                onClick={() => handleDislike(comment.commentId)}
                                className="flex flex-col items-center border border-gray-300 rounded-lg p-2 bg-white hover:bg-gray-200 hover:text-red-600 dark:bg-gray-300 dark:text-gray-100 transition w-16 h-16"
                            >
                                <MdThumbDown className="w-4 h-4 mb-1 text-red-500" />
                                <span className="text-xs">비추천</span>
                                <span className="text-xs">{comment.unlikeCount}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 댓글 입력 폼 */}
            <div className="mt-8 relative">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-4 pr-28 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-400 dark:text-gray-100 dark:placeholder-gray-300"
                    placeholder="댓글을 입력하세요..."
                    rows="4"
                />
                <button
                    onClick={handleAddComment}
                    className="absolute bottom-3 right-1 h-[90%] mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    댓글 추가<br />
                    <span className="text-gray-300 text-[0.5rem]">( Alt + S )</span>
                </button>
            </div>
        </div>
    );
}

export default CommentSection;
