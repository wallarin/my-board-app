import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FindCredentialsModal from './FindCredentials';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // 로그인 상태를 확인하고, 이미 로그인한 경우 리다이렉트
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/my-board-app'); // 로그인한 상태라면 메인 페이지로 리다이렉트
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (userId && password) {
        //     alert('로그인 성공!');
        // } else {
        //     setError('아이디와 비밀번호를 입력해주세요.');
        // }
        if (!userId || !password) {
            setError('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post('/api/user/login', {
                userId: userId,
                password: password
            });

            // JWT 토큰을 로컬 스토리지에 저장
            sessionStorage.setItem('token', response.data);
            sessionStorage.setItem('userId', userId)

            setIsLoggedIn(true);
            // 로그인 성공 후 리다이렉트
            alert('로그인 성공!');
            navigate('/my-board-app'); // 예: 대시보드 페이지로 이동
        } catch (err) {
            setError('로그인에 실패했습니다. 다시 시도해주세요.');
            console.error('로그인 오류:', err);
        }
    };

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-700 rounded-lg h-[calc(100vh-6rem)] flex items-center justify-center">
            <div className="bg-white dark:bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-200">로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userid" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">아이디</label>
                        <input
                            type="text"
                            id="userid"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:text-gray-800"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 dark:text-gray-200">패스워드</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:text-gray-800"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 dark:bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        로그인
                    </button>
                    <div className='flex sm:flex-row flex-col justify-between mt-3 text-sm'>
                        <span className='text-gray-400 dark:text-gray-200'>아이디 / 패스워드를 잊었다면?</span>
                        <button
                            type='button'
                            className='text-gray-500 dark:text-gray-300 underline ml-auto'
                            onClick={() => setShowModal(true)}
                        >
                            아이디 / 패스워드 찾기
                        </button>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between mt-3 text-sm">
                        <span className="text-gray-400 dark:text-gray-200">아직 회원이 아니라면?</span>
                        <Link to="/my-board-app/termsOfUse" className="text-gray-500 dark:text-gray-300 underline ml-auto">회원가입하러 가기</Link>
                    </div>
                </form>
            </div>

            {showModal && <FindCredentialsModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Login;
