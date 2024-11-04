import React, { useState, useEffect } from 'react';
//import { fetchUserInquiries, submitInquiry } from './api'; // 위 API 함수들을 import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Inquiry() {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
    const [inquiries, setInquiries] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!userId) {
            navigate('/login'); // 로그인된 사용자가 아니면 로그인 페이지로 이동
        } else {
            loadUserInquiries();
        }
    }, [userId, navigate]);

    const fetchUserInquiries = async (userId) => {
        return axios.get(`/api/inquiry/list?userId=${userId}`);
    };

    const submitInquiry = async (userId, question) => {
        return axios.post('/api/inquiry/create', {
            userId,
            question
        });
    };

    const loadUserInquiries = async () => {
        try {
            const response = await fetchUserInquiries(userId);
            setInquiries(response.data);
        } catch (error) {
            console.error('Error loading inquiries:', error);
            setError('문의 목록을 가져오는 중 오류가 발생했습니다.');
        }
    };

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();

        if (newQuestion.trim() === '') {
            setError('질문 내용을 입력해주세요.');
            return;
        }

        try {
            await submitInquiry(userId, newQuestion);
            setSuccessMessage('질문이 성공적으로 등록되었습니다.');
            setNewQuestion('');
            loadUserInquiries(); // 질문 목록 갱신
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            setError('질문을 등록하는 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">1:1 문의 게시판</h2>

            {/* 에러 메시지 표시 */}
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            {/* 문의 작성 폼 */}
            <form onSubmit={handleQuestionSubmit} className="mb-6">
                <textarea
                    className="w-full p-3 border rounded-lg"
                    rows="4"
                    placeholder="문의할 내용을 입력하세요."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                    문의 등록
                </button>
            </form>

            {/* 사용자 문의 목록 */}
            <h3 className="text-xl font-semibold mb-2">내 문의 내역</h3>
            <ul className="space-y-4">
                {inquiries.map((inquiry) => (
                    <li key={inquiry.id} className="p-4 border rounded-lg bg-gray-100">
                        <p className="font-semibold">{inquiry.question}</p>
                        <p className="text-gray-500 text-sm">{new Date(inquiry.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inquiry;
