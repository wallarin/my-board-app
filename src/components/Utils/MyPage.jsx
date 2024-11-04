import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function MyPage() {
    const userId = sessionStorage.getItem('userId');
    const [password, setPassword] = useState(''); // 패스워드 상태 추가
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const passwordRef = useRef(null);

    const [showUserModify, setShowUserModify] = useState(false);
    const navigate = useNavigate();

    const [getUserId, setGetUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber_middle, setPhoneNumber_middle] = useState('');
    const [phoneNumber_last, setPhoneNumber_last] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [isDuplicate, setIsDuplicate] = useState(null); // 중복 여부 상태
    const [checking, setChecking] = useState(false); // 중복 체크 중인지 표시하는 상태
    const [hasChecked, setHasChecked] = useState(false);

    // 닉네임 유효성 검사 정규식
    const nicknameRegex = /^[a-zA-Z가-힣0-9._☆★♡♥-]{2,8}$/;

    // 패스워드 유효성 검사 정규식
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*\W)(?=.*[a-zA-Z\d\W]).{8,20}$/;

    useEffect(() => {
        if (userId === null) {
            navigate('/my-board-app')
        }
        // 컴포넌트 마운트 후 패스워드 입력 필드에 포커스 설정
        if (passwordRef.current) {
            passwordRef.current.focus();
        }
    }, [navigate, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/user/login', {
                userId: userId,
                password: password
            });

            setShowUserModify(true);
            getUserInfo();
        } catch (error) {
            console.error(error);
            setErrorMessage('로그인에 실패했습니다.');
        }

    }

    const getUserInfo = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await axios.get('/api/user/information', {
                params: { userId: userId },
                headers: { Authorization: `Bearer ${token}` }
            });

            const info = response.data;

            setGetUserId(info.userId);
            setNickname(info.nickname);
            setPhoneNumber_middle(info.phone.substring(3, 7));
            setPhoneNumber_last(info.phone.substring(7, 11));
            setGender(info.gender)
            setBirth(info.birthdate);
        } catch (error) {
            console.error(error)
        }
    }

    // 중복 체크 함수
    const checkDuplication = async (type, value) => {
        try {
            const response = await axios.post('/api/user/check-duplication', { type, value });
            return response.data.isDuplicate;
        } catch (error) {
            console.error(`${type} 중복 검사 중 오류 발생: `, error);
            throw new Error('중복 검사에 실패하였습니다. 새로고침 후 다시 시도해 주세요.');
        }
    };

    // 닉네임 입력 시 중복 체크 수행
    useEffect(() => {
        if (!hasChecked) return;

        if (nickname === '') {
            setIsDuplicate(null); // 닉네임이 없으면 초기 상태로 설정
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setChecking(true); // 중복 체크 시작 표시
            try {
                const duplicate = await checkDuplication('nickname', nickname);
                setIsDuplicate(duplicate);
                if (duplicate) {
                    setErrorMessage('이미 사용 중인 닉네임입니다.');
                } else {
                    setErrorMessage('');
                }
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setChecking(false); // 중복 체크 완료
            }
        }, 500); // 500ms 딜레이 후 중복 체크 수행

        return () => clearTimeout(delayDebounceFn); // 이전 타이머를 클리어하여 요청 과부하 방지
    }, [nickname, hasChecked]);

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setHasChecked(true); // 닉네임이 변경된 후부터 중복 체크 활성화
    };

    const handleSaveChanges = async () => {
        if (!nicknameRegex.test(nickname)) {
            setErrorMessage('닉네임은 2자 이상 8자 이하이며, 한글, 영문자, 숫자, 특수문자(-, _, ., ☆, ★, ♡, ♥)로 구성되어야 합니다.');
            return;
        }

        if (newPassword && !passwordRegex.test(newPassword)) {
            setErrorMessage('패스워드는 8자 이상 20자 이하이며, 소문자, 대문자, 숫자, 특수기호 중 3가지 이상을 포함해야 합니다.');
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            setErrorMessage('새 패스워드가 일치하지 않습니다.');
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.put(
                '/api/user/update',
                {
                    nickname,
                    password: newPassword ? newPassword : undefined,
                    phone: '010' + phoneNumber_middle + phoneNumber_last,
                    birth,
                    gender
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data === '회원 정보가 성공적으로 업데이트되었습니다.') {
                setSuccessMessage('회원정보가 성공적으로 수정되었습니다.');
            } else {
                setErrorMessage('회원정보 수정에 실패했습니다.');
            }
        } catch (error) {
            setErrorMessage('오류가 발생했습니다. 다시 시도해주세요.');
            console.error(error);
        }
    };


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
                            value={userId || ''}
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
                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-1 dark:text-white'>아이디</label>
                        <input
                            type="text"
                            //className='w-full px-3 py-2 border border-gray-600 rounded-md bg-blue-200 dark:bg-gray-400 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                            className='w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-200 dark:bg-gray-600 dark:text-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 cursor-not-allowed'
                            value={getUserId}
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1 dark:text-white">패스워드 변경</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-blue-200 dark:bg-gray-400 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            placeholder="새 패스워드 입력"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full mt-2 px-3 py-2 border border-gray-600 rounded-md bg-blue-200 dark:bg-gray-400 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            placeholder="새 패스워드 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-sm font-medium mb-1 dark:text-white'>닉네임 변경</label>
                        <input
                            type="text"
                            className='w-full px-3 py-2 border border-gray-600 rounded-md bg-blue-200 dark:bg-gray-400 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                            value={nickname}
                            onChange={handleNicknameChange}
                        />
                        {checking && <p className="text-sm text-gray-500">닉네임 중복 확인 중...</p>}
                        {isDuplicate === false && <p className="text-sm text-green-500">사용 가능한 닉네임입니다.</p>}
                        {isDuplicate === true && <p className="text-sm text-red-500">{errorMessage}</p>}
                    </div>

                    <div className='mb-4'>
                        <label className="block text-sm font-medium mb-1 dark:text-white">휴대전화 번호 <span className="text-gray-400 text-xs">* 변경 문의는 1:1문의를 이용해주세요.</span></label>
                        <div className="flex space-x-2">
                            <input
                                type="tel"
                                className="w-1/2 px-3 py-2 border border-gray-600 rounded-md bg-gray-200 dark:bg-gray-600 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-center cursor-not-allowed"
                                value='010'
                                maxLength="3"
                                readOnly
                            />
                            <input
                                type="tel"
                                className="w-1/2 px-3 py-2 border border-gray-600 rounded-md bg-gray-200 dark:bg-gray-600 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-center cursor-not-allowed"
                                value={phoneNumber_middle}
                                readOnly
                                maxLength="4"
                            />
                            <input
                                type="tel"
                                className="w-1/2 px-3 py-2 border border-gray-600 rounded-md bg-gray-200 dark:bg-gray-600 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-center cursor-not-allowed"
                                value={phoneNumber_last}
                                readOnly
                                maxLength="4"
                            />
                        </div>
                    </div>

                    <div className='flex mb-4'>
                        <div className='w-1/2 mr-2'>
                            <label className='block text-sm font-medium mb-1 dark:text-white'>성별</label>
                            <div className='flex justify-around dark:text-white'>
                                <label className='flex items-center'>
                                    <input
                                        className='mx-1'
                                        type='radio'
                                        name="gender"
                                        value="M"
                                        checked={gender === 'M'}
                                        onChange={() => setGender('M')}
                                    />
                                    남자
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        className='mx-1'
                                        type='radio'
                                        name="gender"
                                        value="F"
                                        checked={gender === 'F'}
                                        onChange={() => setGender('F')}
                                    />
                                    여자
                                </label>
                            </div>
                        </div>

                        <div className='w-1/2 ml-2'>
                            <label className='block text-sm font-medium mb-1 dark:text-white'>생년월일</label>
                            <input
                                type='date'
                                className='w-full px-3 py-2 border border-gray-600 rounded-md dark:bg-gray-400 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                                min="1900-01-01"
                                max={today}
                                value={birth || ''}
                                onChange={(e) => setBirth(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSaveChanges}
                        className="w-full bg-green-500 dark:bg-green-700 text-white p-3 rounded-lg hover:bg-green-600 transition"
                    >
                        변경 사항 저장
                    </button>
                    {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
                </div>
                )}
        </div>
    )
}

export default MyPage