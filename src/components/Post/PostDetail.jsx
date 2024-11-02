import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import CommentSection from './CommentSection';
import PostWrite from './PostWrite';
import './LikeButton.css';
import axios from 'axios';

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

//    const post = posts.find(post => post.postId === parseInt(id));
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    // const post = posts.content ? posts.content.find(post => post.postId === parseInt(id)) : null;
    //const userId = localStorage.getItem('userId');
    const userId = sessionStorage.getItem('userId') || 'unknown';

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/board/view/${id}`, {
                    params: { 
                        loginId: userId 
                    }
                })
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error('게시글 불러오기 오류:', error);
                setLoading(false); // 로딩 완료
            }
        }

        fetchPost();
    }, [id, userId])

    // 댓글 상태 관리
    const [comments, setComments] = useState([
        { postId: 1, author: "댓글 작성자1", content: "이것은 첫 번째 댓글입니다.", likes: 15, dislikes: 4 },
        { postId: 2, author: "주작", content: "이것은 두 번째 댓글입니다.", likes: 10, dislikes: 1 },
        // 더 많은 댓글을 추가하세요.
    ]);

    // 추천 상태 관리
    const [isLiked, setIsLiked] = useState(false); // 사용자가 이 글을 추천했는지 여부
    const [likeCount, setLikeCount] = useState(0); // 현재 추천 수

    const [editMode, setEditMode] = useState(false); // 수정 모드 여부

    // 0.5초 후 likeCount를 post에서 가져옴
    useEffect(() => {
        if (post) {
            const timer = setTimeout(() => {
                setLikeCount(post.likeCount); // post에서 추천 수를 설정
                setIsLiked(post.isUserLiked === "Y");
            }, 100); // 0.5초 대기

            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [post]);

    if (loading) {
        return <div className="text-center text-gray-500">로딩 중...</div>;
    }

    if (!post) {
        return <div className="text-center text-red-500">게시글을 찾을 수 없습니다.</div>;
    }



    // 추천 버튼 클릭 핸들러
    const handleLike = async () => {
        if ( userId === 'unknown') { alert('로그인이 필요합니다.'); return;}
        try {
            const response = await axios.post(
                `/api/board/${post.postId}/like`, 
                {}, 
                {
                    params: { userId: userId }, // 사용자 ID를 요청에 포함
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                }
            );

            if (response.data === "추천되었습니다.") {
                setLikeCount(likeCount + 1);
                setIsLiked(true);
            } else if (response.data === "추천이 취소되었습니다.") {
                setLikeCount(likeCount - 1);
                setIsLiked(false);
            } else {
                alert(response.data); // "본인 글에는 추천할 수 없습니다." 등의 메시지 처리
            }
        } catch (error) {
            console.error("추천 처리 중 오류 발생:", error);
            if (error.response && error.response.status === 403) {
                alert("로그인이 필요합니다.");
            } else {
                alert("추천 처리에 실패했습니다. 다시 시도해 주세요.");
            }
        }
    };

    // 수정 버튼 클릭 핸들러
    const handleEditClick = () => {
        setEditMode(true); // 수정 모드로 전환
    };

    // 삭제 버튼 클릭 핸들러
    const handleDeleteClick = async () => {
        if (window.confirm('정말 이 글을 삭제하시겠습니까?')) {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.delete(`/api/board/${post.postId}/delete`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                navigate('/my-board-app'); // 글 작성 후 게시글 목록 페이지로 이동
                window.location.reload();
            } catch(error) {
                console.error('글 삭제 중 오류 발생:', error);
                alert('글 삭제에 실패했습니다. 다시 시도해 주세요.');
            }
            console.log('글 삭제!');
        }
    };

    if (editMode) {
        // 수정 모드일 때 PostWrite 컴포넌트를 렌더링
        return (
            <PostWrite
                isLoggedIn={true}
                editMode={true}
                existingPost={post} // 수정할 글 데이터를 넘겨줌
            />
        );
    }

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg h-[calc(100vh-8rem)] overflow-y-auto dark:bg-gray-600">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg lg:text-lg font-medium text-gray-800 dark:text-gray-200">{post.title}</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-blue-500 hover:underline"
                >
                    뒤로 가기
                </button>
            </div>
            <div className="border-t border-gray-300 py-4">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
                    <div>
                        <span className="font-semibold">작성자: </span>{post.nickname}
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold">작성일: </span> {post.writeDate} {post.writeTime}
                        <span className="ml-4 flex items-center">
                            <MdThumbUp className="w-4 h-4 text-blue-500 mr-1" /> {likeCount}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-gray-700 dark:text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
                {post.content}
            </div>

            {/* 추천 버튼 */}
            <div className="my-6 flex justify-center">
                <button
                    onClick={handleLike}
                    className={`w-24 h-16 flex flex-col justify-center items-center rounded-lg shadow-lg transition-transform duration-300 ease-in-out
                        ${isLiked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} 
                        ${userId === "unknown" ? 'cursor-not-allowed opacity-50' : 'text-white dark:text-gray-100'} 
                        ${isLiked ? 'transform scale-110' : 'transform scale-100'}`} // 클릭 시 크기 변화
                    style={{ boxShadow: isLiked ? '0px 0px 15px rgba(255, 0, 0, 0.5)' : 'none' }} // 추천 시 그림자 효과
                >
                    {isLiked ? (
                        <MdThumbDown
                            className={`w-5 h-5 mb-1 transition-transform duration-300 ease-in-out 
                text-white liked-animation`} // 추천 취소 시 MdThumbDown 아이콘 사용
                        />
                    ) : (
                        <MdThumbUp
                            className={`w-5 h-5 mb-1 transition-transform duration-300 ease-in-out 
                text-white scale-100`} // 기본 추천 아이콘
                        />
                    )}

                    <span className="block text-xs">
                        {isLiked ? (
                            <span className="leading-tight">
                                추천
                                <br />
                                취소
                            </span> // 추천 취소 문구를 두 줄로 표시
                        ) : (
                            "추천"
                        )}
                    </span>
                </button>
            </div>
            <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center ml-auto">

                </div>
                {post.isUserPostOwner === 'Y' && (
                    <div>
                        <button
                            onClick={handleEditClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>

            {/* 댓글 섹션 */}
            <CommentSection
                postId={id}
                postAuthor={post.nickname}
            />
        </div>
    );
}

export default PostDetail;
