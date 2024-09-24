import React, { useState } from 'react';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userId && password) {
            alert('로그인 성공!');
        } else {
            setError('아이디와 비밀번호를 입력해주세요.');
        }
    };

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg h-[calc(100vh-6rem)] flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userid" className="block text-gray-700 font-semibold mb-2">아이디</label>
                        <input
                            type="text"
                            id="userid"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">패스워드</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        로그인
                    </button>
                    <div className='flex justify-between mt-3 text-sm'>
                        <span className='text-gray-400'>아이디 / 패스워드를 잊었다면?</span>
                        <span className='text-gray-500 underline'>아이디 / 패스워드 찾기</span>
                    </div>
                    <div className='flex justify-between mt-3 text-sm'>
                        <span className='text-gray-400'>아직 회원이 아니라면?</span>
                        <span className='text-gray-500 underline'>회원가입하러 가기</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
