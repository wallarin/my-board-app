import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FindCredentials({ onClose }) {
    const [phonePart1, setPhonePart1] = useState('010');
    const [phonePart2, setPhonePart2] = useState('7436');
    const [phonePart3, setPhonePart3] = useState('3900');
    const [verificationCode, setVerificationCode] = useState('');
    const [authSuccess, setAuthSuccess] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);

    const [userSearchId, setUserSearchId] = useState('');
    const [passwordDiv, setPasswordDiv] = useState(false);
    const [clickShowId, setClickShowId] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [countdown, setCountdown] = useState(3); // 남은 초 수 관리

    const handleSendCode = async () => {
        const phoneNumber = `${phonePart1}${phonePart2}${phonePart3}`;
        if (phoneNumber.length === 11) {
            try {
                const response = await axios.post('/api/send-verification-code', null, {
                    params: {
                        phoneNumber: phoneNumber
                    }
                });

                if (response.data === '인증번호가 발송되었습니다.') {
                    alert('인증번호가 전송되었습니다.');
                    setIsCodeSent(true);
                }

            } catch (error) {
                console.error(error)
            }
        } else {
            alert('올바른 전화번호를 입력해주세요.');
        }
    };

    const handleNumberInput = (e, setter) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setter(value);
    };

    const checkAuth = async () => {
        try {
            const phoneNumber = `${phonePart1}${phonePart2}${phonePart3}`;
            const response = await axios.post('/api/verify-code', null, {
                params: {
                    phoneNumber: phoneNumber,
                    verifyCode: verificationCode,
                }
            })
            if (response.data === '인증에 성공했습니다.') {
                setAuthSuccess(true);
                alert('인증이 완료되었습니다.');
            } else {
                alert('인증번호가 일치하지 않습니다.')
            }
        } catch (error) {
            console.error(error)
        }
    };

    const showId = async () => {
        const phoneNumber = `${phonePart1}${phonePart2}${phonePart3}`;

        try {
            const response = await axios.post('/api/user/findId', null, {
                params: {
                    phoneNumber: phoneNumber
                }
            })
            setUserSearchId(response.data || '아이디를 찾을 수 없습니다');
            setClickShowId(true);
        } catch (error) {
            alert('아이디 찾기에 실패하였습니다.')
            setUserSearchId('아이디 찾기 실패');
        }

    };

    const validatePassword = (password) => {
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        const conditionsMet = [hasLowercase, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length;
        if (conditionsMet < 3) {
            setPasswordError('비밀번호는 영어 소문자, 대문자, 숫자, 특수문자 중 3가지를 포함해야 합니다.');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    useEffect(() => {
        const isValid = validatePassword(newPassword) && newPassword === confirmPassword;
        setIsPasswordValid(isValid);
    }, [newPassword, confirmPassword]);

    const handleComplete = async () => {
        const phoneNumber = `${phonePart1}${phonePart2}${phonePart3}`
        try {
            const response = await axios.post('/api/user/change-pw', {
                userId: userSearchId,
                phoneNumber: phoneNumber,
                newPassword: newPassword
            });

            if (response.data.success) {
                setSuccessMessage(true);
                setCountdown(3); // 3초 카운트다운 시작 

                const interval = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev === 1) {
                            clearInterval(interval);
                            onClose(); // 모달창 닫기 
                        } return prev - 1;
                    });
                }, 1000);
            } else { // Handle any error messages or issues from backend 
                alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {

        }
        setSuccessMessage(true);
        setCountdown(3); // 3초 카운트다운 시작

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(interval);
                    onClose(); // 모달창 닫기
                }
                return prev - 1;
            });
        }, 1000);

    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-200">아이디 / 패스워드 찾기</h2>
                <p className="text-gray-700 dark:text-gray-200 mb-4 text-center">
                    휴대전화 인증 완료 후 아이디 찾기 / 패스워드 재설정 기능을 이용하실 수 있습니다.
                </p>

                {/* 전화번호 입력란 */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">휴대전화</label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            maxLength="3"
                            value={phonePart1}
                            readOnly
                            className={`w-1/3 p-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:text-white ${isCodeSent ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-600' : ''}`}
                        />
                        <span className="text-gray-500 dark:text-gray-300">-</span>
                        <input
                            type="text"
                            maxLength="4"
                            value={phonePart2}
                            onInput={(e) => handleNumberInput(e, setPhonePart2)}
                            className={`w-1/3 p-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:text-white ${isCodeSent ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-600' : ''}`}
                            disabled={isCodeSent}
                            placeholder="1234"
                        />
                        <span className="text-gray-500 dark:text-gray-300">-</span>
                        <input
                            type="text"
                            maxLength="4"
                            value={phonePart3}
                            onInput={(e) => handleNumberInput(e, setPhonePart3)}
                            className={`w-1/3 p-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:text-white ${isCodeSent ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-600' : ''}`}
                            disabled={isCodeSent}
                            placeholder="5678"
                        />
                    </div>
                    {!isCodeSent ? (
                        <button
                            type="button"
                            onClick={handleSendCode}
                            className="mt-3 w-full bg-blue-500 dark:bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            인증번호 전송
                        </button>
                    ) : !authSuccess && (
                        <div className="mt-3 flex justify-between">
                            <button
                                type="button"
                                onClick={() => setIsCodeSent(false)}
                                className="w-[48%] bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 p-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                번호 변경
                            </button>
                            <button
                                type="button"
                                onClick={handleSendCode}
                                className="w-[48%] bg-blue-500 dark:bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                재전송
                            </button>
                        </div>
                    )}
                </div>

                {/* 인증번호 입력란 */}
                {isCodeSent && !authSuccess && (
                    <div className="mb-4">
                        <label htmlFor="verificationCode" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">인증번호</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                id="verificationCode"
                                maxLength="6"
                                value={verificationCode}
                                onInput={(e) => handleNumberInput(e, setVerificationCode)}
                                className="w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-400 dark:text-gray-800"
                                placeholder="인증번호 입력"
                            />
                            <button
                                type="button"
                                onClick={checkAuth}
                                className="w-1/4 bg-green-500 dark:bg-green-700 text-white p-3 rounded-lg hover:bg-green-600 transition"
                            >
                                확인
                            </button>
                        </div>
                    </div>
                )}

                {authSuccess && (
                    <div className="mb-4">
                        {!clickShowId && <button
                            type="button"
                            onClick={showId}
                            className="w-full bg-blue-500 dark:bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                        >
                            아이디 찾기
                        </button>}
                        {userSearchId && (
                            <div className="mt-3 bg-gray-100 dark:bg-gray-600 p-3 rounded-lg text-center text-gray-800 dark:text-gray-200">
                                {clickShowId && (
                                    <>
                                        <p className="font-semibold">찾으신 아이디:</p>
                                        <p>{userSearchId}</p>
                                    </>)
                                }

                                {!clickShowId && (
                                    <>
                                        <p className='dark:text-red-400 text-red-500'>존재하는 아이디가 없습니다.</p>
                                        <p>회원가입 후 이용해주세요.</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* 비밀번호 재설정 버튼 및 입력란 */}
                {authSuccess && clickShowId && (
                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={() => setPasswordDiv(true)}
                            className="w-full bg-blue-500 dark:bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                        >
                            비밀번호 재설정
                        </button>
                        {passwordDiv && (
                            <div className="mt-3 bg-gray-100 dark:bg-gray-600 p-3 rounded-lg text-gray-800 dark:text-gray-200">
                                <label className="block mb-2">새 비밀번호</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                    className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-500 dark:text-white"
                                />
                                <label className="block mb-2">새 비밀번호 확인</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-500 dark:text-white"
                                />
                                {passwordError && (
                                    <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                                )}
                                {isPasswordValid && (
                                    <button
                                        type="button"
                                        onClick={handleComplete}
                                        className="mt-3 w-full bg-green-500 dark:bg-green-700 text-white p-3 rounded-lg hover:bg-green-600 transition"
                                    >
                                        완료
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {successMessage && (
                    <>
                        <p className="text-green-500 text-center font-semibold mt-4">
                            처리가 성공적으로 완료되었습니다.
                        </p>
                        <p className="text-green-500 text-center font-semibold mt-4">
                            {countdown}초 후 로그인 페이지로 이동합니다.
                        </p>
                    </>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 text-gray-500 dark:text-gray-300 underline text-center w-full"
                >
                    닫기
                </button>
            </div>
        </div>
    );
}

export default FindCredentials;
