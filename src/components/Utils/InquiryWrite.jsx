import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InquiryWrite() {
    const [inquiryText, setInquiryText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('userId')) {
            navigate('/my-board-app/login')
        }
    }, [])

    const handleInquirySubmit = async () => {
        if (!inquiryText) {
            setErrorMessage('문의 내용을 입력하세요.');
            return;
        }

        try {
            const sessionUserId = sessionStorage.getItem('userId');
            const token = sessionStorage.getItem('token');

            await axios.post('/api/inquiry/submit', {
                userId: sessionUserId,
                content: inquiryText,

            }, {
                headers: { Authorization: `Bearer ${token}` }
            }
            );


            setSuccessMessage('문의가 성공적으로 등록되었습니다.\n2초 후 목록으로 돌아갑니다.');
            setInquiryText('');

            // 2초 후 목록 페이지로 이동
            setTimeout(() => {
                navigate('/my-board-app/inquiryList');
                setSuccessMessage('');
            }, 2000);

        } catch (error) {
            console.error('문의 등록 중 오류 발생:', error);
            setErrorMessage('문의 등록에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow h-[calc(100vh-8rem)]">
            <h2 className="text-xl font-bold mb-4 dark:text-white">1:1 문의 작성</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 whitespace-pre-line">{successMessage}</p>}
            <textarea
                className="w-full p-3 border rounded dark:bg-gray-600 dark:text-white"
                rows="30"
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="문의할 내용을 입력하세요."
            />
            <button
                onClick={handleInquirySubmit}
                className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition"
            >
                문의 등록
            </button>
        </div>
    );
}

export default InquiryWrite;
