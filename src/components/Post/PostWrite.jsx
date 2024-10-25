import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostWrite = ({ isLoggedIn, editMode = false, existingPost = null }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/my-board-app/login'); // 로그인되지 않은 경우 로그인 페이지로 이동
        }

        if (editMode && existingPost) {
            if(existingPost.userId !== userId) {
                alert('당신이 작성한게 아닙니다.');
                navigate('/my-board-app/');
            }
            setTitle(existingPost.title);
            setContent(existingPost.content);
        }
    }, [isLoggedIn, navigate, editMode, existingPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || title.length > 50) {
            setError('제목은 1자 이상 50자 이내로 입력해주세요.');
            return;
        }
    
        if (!content) {
            setError('내용을 입력해주세요.');
            return;
        }

        try {

            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            // 서버로 보낼 글 데이터
            const postData = {
                userId: userId,
                title: title,
                content: content,
            };

            let response;
            if (editMode) {
                // 수정 요청 (PUT)
                console.log(existingPost.postId)
                response = await axios.put(`/api/board/${existingPost.postId}/edit`, postData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                // 작성 요청 (POST)
                response = await axios.post('/api/board/write', postData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }

            if (response.status === 201 || response.status === 200) {
                alert('글이 성공적으로 작성되었습니다.');
                navigate('/my-board-app'); // 글 작성 후 게시글 목록 페이지로 이동
                window.location.reload();
            }
        } catch (error) {
            console.error('글 작성 중 오류가 발생했습니다:', error);
            setError('글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg h-[calc(100vh-6rem)]">
            <h2 className="text-2xl font-bold mb-6 text-center">{editMode ? '글 수정하기' : '새 글 작성'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">제목</label>
                    <input
                        type="text"
                        id="title"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='제목을 50자 이내로 작성해주세요.'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">내용</label>
                    <textarea
                        id="content"
                        rows="20"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder='글 내용을 작성해주세요.'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                >
                    {editMode ? '수정하기' : '작성하기'}
                </button>
            </form>
        </div>
    );
}

export default PostWrite;