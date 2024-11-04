import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

function InquiryList() {
    const [inquiries, setInquiries] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const sessionUserId = sessionStorage.getItem('userId');
                const token = sessionStorage.getItem('token');
                if (!sessionUserId) {
                    setErrorMessage('로그인이 필요합니다. 로그인 후 다시 시도해 주세요.');
                    navigate('/my-board-app/login')
                    return;
                }

                const response = await axios.get('/api/inquiry/myInquiries', {
                    params: { userId: sessionUserId },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setInquiries(response.data);
            } catch (error) {
                console.error('문의 목록을 가져오는 중 오류 발생:', error);
                setErrorMessage('문의 목록을 가져오는 중 오류가 발생했습니다.');
            }
        };
        fetchInquiries();
    }, [navigate]);

    const handleWriteInquiry = () => {
        setErrorMessage(''); // 오류 메시지 초기화
        navigate('/my-board-app/inquiryWrite');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return "유효하지 않은 날짜"; // 날짜가 유효하지 않은 경우 처리
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // YYYY-MM-DD 형식으로 변환
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };


    return (
        <div className="max-w-lg mx-auto mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow h-[calc(100vh-8rem)]">
            <h2 className="text-xl font-bold mb-4 dark:text-white">내 문의 내역</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            
            <button
                onClick={handleWriteInquiry}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                문의 작성하기
            </button>

            {inquiries.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">작성한 문의가 없습니다.</p>
            ) : (
                <ul className="space-y-4">
                    {inquiries.map((inquiry) => (
                        <li key={inquiry.inquiryId} className="p-3 bg-white rounded dark:bg-gray-700 shadow">
                            <div
                                onClick={() => toggleExpand(inquiry.inquiryId)}
                                className="cursor-pointer flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-gray-700 dark:text-white mb-2">{inquiry.content}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        작성일: {formatDate(inquiry.createdAt)}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        상태: {inquiry.status === 'answered' ? '답변 완료' : '대기 중'}
                                    </p>
                                </div>
                                {inquiry.status === 'answered' && (
                                    expandedId === inquiry.inquiryId ? 
                                    <MdExpandLess className="text-gray-600 dark:text-gray-400 w-8 h-8" /> : 
                                    <MdExpandMore className="text-gray-600 dark:text-gray-400 w-8 h-8" />
                                )}
                            </div>
                            {expandedId === inquiry.inquiryId && inquiry.status === 'answered' && (
                                <div className="mt-4 p-3 bg-gray-200 dark:bg-gray-600 rounded-lg">
                                    <p className="text-gray-800 dark:text-white font-semibold">관리자 답변:</p>
                                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                                        {inquiry.responseContent}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        답변 작성일: {formatDate(inquiry.responseCreatedAt)}
                                    </p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default InquiryList;
