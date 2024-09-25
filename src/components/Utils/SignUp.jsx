import React, { useState } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';

function SignUp() {

    // ID 입력 체크
    const [userId, setUserId] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [isUserIdValid, setIsUserIdValid] = useState(null);

    // 패스워드 입력 체크
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(null); // 초기값은 true로 설정

    // 패스워드 확인 입력 체크
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(null);

    // 닉네임 입력 체크
    const [nickname, setNickname] = useState('');
    const [isNicknameValid, setIsNicknameValid] = useState(null);

    // 전화번호 입력 체크
    const [phonePart1] = useState('010'); // 고정된 값
    const [phonePart2, setPhonePart2] = useState('');
    const [phonePart3, setPhonePart3] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 성별 입력 체크
    const [gender, setGender] = useState('male');

    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const today = new Date().toISOString().split("T")[0];

    // 아이디 유효성 체크 및 글자수 관련 함수
    const validateUserId = (userId) => {
        const isValidLength = userId.length >= 6 && userId.length <= 15;
        const isValidFormat = /^[a-z0-9]+$/.test(userId); // 소문자와 숫자로만 구성된지 확인
        return { isValidLength, isValidFormat };
    };

    // 패스워드 유효성 체크 및 글자수 관련 함수
    const validatePassword = (password) => {
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValidLength = password.length >= 8 && password.length <= 20;
        const validCriteriaCount = [hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar].filter(Boolean).length;
        return isValidLength && validCriteriaCount >= 3;
    };

    // 아이디 유효성 체크에 따른 에러 상태 관리
    const handleUserIdBlur = () => {
        const { isValidLength, isValidFormat } = validateUserId(userId);

        if (!isValidLength) {
            setUserIdError('아이디는 6자 이상 15자 이하로 입력해 주세요.');
            setIsUserIdValid(false);
        } else if (!isValidFormat) {
            setUserIdError('아이디는 영어 소문자와 숫자로만 구성되어야 합니다.');
            setIsUserIdValid(false);
        } else {
            setUserIdError('');
            setIsUserIdValid(true);
        }
    };

    // 비밀번호 유효성 체크에 따른 에러 상태 관리
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value) {
            setIsPasswordValid(validatePassword(value));
        } else {
            setIsPasswordValid(null);
        }
    };

    // 비밀번호 확인 유효성 체크에 따른 에러 상태 관리
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value) {
            setIsConfirmPasswordValid(value === password);
        } else {
            setIsConfirmPasswordValid(null); // 비어 있으면 null로 설정하여 아이콘을 숨김
        }
    };

    // 닉네임 유효성 체크
    const validateNickname = (nickname) => {
        // 영문자, 숫자, 일반적인 특수 문자(-, _, .), 한글만 허용
        const nicknameRegex = /^[a-zA-Z0-9가-힣._-☆★♡♥]+$/;
        return nicknameRegex.test(nickname) && nickname.length >= 2 && nickname.length <= 8;
    };

    // 닉네임 유효성 체크에 따른 에러 상태 관리
    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setNickname(value);
        if (value) {
            setIsNicknameValid(validateNickname(value));
        } else {
            setIsNicknameValid(null); // 비어 있으면 null로 설정하여 아이콘을 숨김
        }
    };

    const handlePhonePartChange = (setter) => (e) => {
        const value = e.target.value;

        // 숫자만 입력 가능
        if (/^\d*$/.test(value)) {
            setter(value);
            setErrorMessage(''); // 에러 메시지 제거
        } else {
            setErrorMessage('숫자만 입력 가능합니다.');
            setTimeout(() => setErrorMessage(''), 1000); // 1초 후 에러 메시지 제거
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { isValidLength, isValidFormat } = validateUserId(userId);
        const phone = `${phonePart1}-${phonePart2}-${phonePart3}`;

        if (!isValidLength) {
            setError('아이디는 6자 이상 15자 이하로만 입력해 주세요.');
            setSuccess('');
            return;
        }

        if (!isValidFormat) {
            setError('아이디는 영어 소문자와 숫자로만 구성되어야 합니다.');
            setSuccess('');
            return;
        }

        if (!validatePassword(password)) {
            setError('패스워드는 8자 이상 20자 이하로 설정해 주세요. 영어 소문자, 대문자, 숫자, 특수기호 중 3가지 이상을 포함해야 합니다.');
            setSuccess('');
            return;
        }

        if (password !== confirmPassword) {
            setError('패스워드와 패스워드 확인이 일치하지 않습니다.');
            setSuccess('');
            return;
        }

        if (!validateNickname(nickname)) {
            setError('닉네임은 2자 이상 8자 이하로 입력해 주세요.');
            setSuccess('');
            return;
        }

        if (phonePart2.length !== 4 || phonePart3.length !== 4) {
            setError('올바른 전화번호를 입력해 주세요.');
            setSuccess('');
            return;
        }

        if (!gender) {
            setError('성별을 선택해 주세요.');
            setSuccess('');
            return;
        }

        if (!birthdate) {
            setError('생년월일을 입력해 주세요.');
            setSuccess('');
            return;
        }

        setError('');
        setSuccess('회원가입 성공!');
    };

    return (
        <div className="max-w-full lg:max-w-4xl mx-auto p-6 bg-gray-100 h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label htmlFor="userid" className="block text-gray-700 font-semibold mb-2">아이디</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="userid"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${isUserIdValid === false
                                    ? 'border-red-500 focus:ring-red-500'
                                    : isUserIdValid === true
                                        ? 'border-green-500 focus:ring-green-500'
                                        : 'border-gray-300 focus:ring-blue-500'
                                    }`}
                                value={userId}
                                placeholder='아이디는 6글자 이상, 15글자 이하로 입력해 주세요.'
                                autoComplete="off"
                                onChange={(e) => setUserId(e.target.value)}
                                onBlur={handleUserIdBlur}
                            />
                            {isUserIdValid === true && (
                                <MdCheck className="absolute right-3 top-3 text-green-500" />
                            )}
                        </div>
                        {userIdError && (
                            <p className="text-sm text-red-500 mt-1">
                                {userIdError}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">패스워드</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
                                    ${isPasswordValid === false ? 'border-red-500 focus:ring-red-500' :
                                        isPasswordValid === true ? 'border-green-500 focus:ring-green-500' : 'focus:ring-blue-500'}`}
                                placeholder='패스워드를 입력해 주세요.'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handlePasswordChange}
                            />
                            {isPasswordValid === true && (
                                <MdCheck className="text-green-500 absolute right-3 top-3 text-xl" />
                            )}
                            {isPasswordValid === false && (
                                <MdClose className="text-red-500 absolute right-3 top-3 text-xl" />
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">패스워드는 8자 이상 20자 이하로 설정해 주세요.</p>
                        <p className="text-sm text-gray-500 mt-1">영어 소문자, 대문자, 숫자, 특수기호 중 3가지 이상을 포함해야 합니다.</p>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">패스워드 확인</label>
                        <div className='relative'>
                            <input
                                type="password"
                                id="confirm-password"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
                                ${isConfirmPasswordValid === false ? 'border-red-500 focus:ring-red-500' :
                                        isConfirmPasswordValid === true ? 'border-green-500 focus:ring-green-500' : 'focus:ring-blue-500'}`}
                                placeholder='패스워드를 재입력해 주세요.'
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            {isConfirmPasswordValid === true && (
                                <MdCheck className="text-green-500 absolute right-3 top-3 text-xl" />
                            )}
                            {isConfirmPasswordValid === false && (
                                <MdClose className="text-red-500 absolute right-3 top-3 text-xl" />
                            )}
                        </div>
                        {isConfirmPasswordValid === false && (
                            <p className="text-sm text-red-500 mt-1">비밀번호를 재확인 해주세요.</p>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="nickname" className="block text-gray-700 font-semibold mb-2">닉네임</label>
                        <div className='relative'>
                            <input
                                type="text"
                                id="nickname"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
                                    ${isNicknameValid === false ? 'border-red-500 focus:ring-red-500' :
                                        isNicknameValid === true ? 'border-green-500 focus:ring-green-500' : 'focus:ring-blue-500'}`}
                                placeholder='닉네임을 입력해 주세요.'
                                autoComplete="off"
                                value={nickname}
                                onChange={handleNicknameChange}
                            />
                            {isNicknameValid === true && (
                                <MdCheck className="text-green-500 absolute right-3 top-3 text-xl" />
                            )}
                            {isNicknameValid === false && (
                                <MdClose className="text-red-500 absolute right-3 top-3 text-xl" />
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">닉네임은 2글자 이상, 8글자 이하로 입력해 주세요.</p>
                        {isNicknameValid === false && (
                            <p className="text-sm text-red-500 mt-1">닉네임은 2자 이상 8자 이하, 한글, 영문자, 숫자,<br /> 특수문자(-, _, ., ☆, ★, ♡, ♥)로 구성되어야 합니다.</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">휴대전화 번호</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={phonePart1}
                                readOnly
                                className="w-1/4 p-3 border rounded-lg bg-gray-100 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span>-</span>
                            <input
                                type="text"
                                maxLength="4"
                                value={phonePart2}
                                onChange={handlePhonePartChange(setPhonePart2)}
                                className="w-1/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span>-</span>
                            <input
                                type="text"
                                maxLength="4"
                                value={phonePart3}
                                onChange={handlePhonePartChange(setPhonePart3)}
                                className="w-1/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
                        )}
                    </div>
                    <div className="mb-6 flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-semibold mb-2">성별</label>
                            <div className="flex items-center space-x-4 py-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="mr-2"
                                    />
                                    남자
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="mr-2"
                                    />
                                    여자
                                </label>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="birthdate" className="block text-gray-700 font-semibold mb-2">생년월일</label>
                            <input
                                type="date"
                                id="birthdate"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                min="1900-01-01"
                                max={today}
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
