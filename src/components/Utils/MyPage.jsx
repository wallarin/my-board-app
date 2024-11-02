import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function MyPage() {
    const userId = sessionStorage.getItem('userId');
    const [password, setPassword] = useState(''); // 패스워드 상태 추가
    const passwordRef = useRef(null);

    const [showUserModify, setShowUserModify] = useState(false);

    useEffect(() => {
        // 컴포넌트 마운트 후 패스워드 입력 필드에 포커스 설정
        if (passwordRef.current) {
            passwordRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/user/login', {
                userId: userId,
                password: password
            });

            setShowUserModify(true);
        } catch (error) {
            console.error(error);
        }

    }

    const today = new Date((Date.now()) - (new Date().getTimezoneOffset() * 60000)).toISOString().split("T")[0];

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-700 rounded-lg h-[calc(100vh-6rem)] flex items-center justify-center">
            {!showUserModify ? (<div className="bg-white dark:bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-200">로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <span className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">아이디</span>
                        <input
                            type='text'
                            className='w-full p-3 border rounded-lg focus:outline-none dark:bg-gray-400 dark:text-gray-800'
                            value={userId}
                            readOnly
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 dark:text-gray-200">패스워드</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:text-gray-800"
                            onChange={(e) => setPassword(e.target.value)}
                            ref={passwordRef}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 dark:bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        확인
                    </button>
                </form>
            </div>) :
                (<div className="bg-white dark:bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-200">회원정보 수정</h2>
                    <div className='text-white'>
                        <div>
                            아이디
                        </div>

                        <div>
                            패스워드 변경
                        </div>

                        <div>
                            닉네임 변경
                        </div>

                        <div>
                            휴대전화 번호 * 변경 문의는 1:1문의를 이용해주세요.
                        </div>
                        <div className='flex'>
                            <div className='w-1/2 mr-2'>
                                성별
                                <div className='flex justify-around'>
                                    <label>
                                        <input
                                            className='mx-1'
                                            type='radio'
                                            name="gender"
                                            value="M"
                                        />
                                        남자
                                    </label>
                                    <label>
                                        <input
                                            className='mx-1'
                                            type='radio'
                                            name="gender"
                                            value="F"
                                        />
                                        여자
                                    </label>
                                </div>
                            </div>


                            <div className='w-1/2 ml-2 pl-4'>
                                생년월일
                                <input
                                    type='date'
                                    className='text-gray-400'
                                    min="1900-01-01"
                                    max={today}
                                />
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

export default MyPage