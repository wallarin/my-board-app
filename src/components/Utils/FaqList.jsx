import React, { useState, useRef, useEffect } from 'react';
import { MdExpandMore, MdExpandLess, MdQuestionAnswer, MdChatBubble } from 'react-icons/md';
import Pagination from './Pagination'; // 페이징 컴포넌트를 별도로 분리했다고 가정
import faqs from './data/faqs';

// const faqs = {
//     login: Array.from({ length: 20 }, (_, index) => ({
//         id: index + 1,
//         question: `로그인 ${index + 1}번째 질문입니다.`,
//         answer: `로그인 ${index + 1}번째 질문에 대한 답변입니다.`,
//     })),
//     terms: Array.from({ length: 20 }, (_, index) => ({
//         id: index + 1,
//         question: `약관 ${index + 1}번째 질문입니다.`,
//         answer: `약관 ${index + 1}번째 질문에 대한 답변입니다.`,
//     })),
//     guide: Array.from({ length: 20 }, (_, index) => ({
//         id: index + 1,
//         question: `이용안내 ${index + 1}번째 질문입니다.`,
//         answer: `이용안내 ${index + 1}번째 질문에 대한 답변입니다.`,
//     })),
// };

const allFaqs = [...faqs.login, ...faqs.terms, ...faqs.guide];

function FaqItem({ faq, isOpen, onClick }) {
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div className="border-b">
            <button
                className="w-full text-left p-4 flex items-center justify-between"
                onClick={onClick}
            >
                <div className="flex items-center">
                    <MdQuestionAnswer className="mr-2 text-blue-400 dark:text-blue-200" />
                    {faq.question}
                </div>
                {isOpen ? <MdExpandLess className="text-gray-700" /> : <MdExpandMore className="text-gray-700" />}
            </button>
            <div 
                className="overflow-hidden transition-height duration-300 ease" 
                style={{ height }}
            >
                <div ref={contentRef} className="p-4 bg-gray-100 flex justify-end items-center rounded-lg dark:bg-gray-400">
                    <div className="flex items-start">
                        <div className="mr-2 mt-1 text-yellow-400">
                            <MdChatBubble />
                        </div>
                        <div className="bg-yellow-200 dark:bg-yellow-500 p-4 rounded-lg max-w-xs lg:max-w-lg text-left leading-relaxed">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FaqCategory({ faqs, openIndex, onClick }) {
    return (
        <div className="mb-8">
            {faqs.map((faq, index) => (
                <FaqItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openIndex === index}
                    onClick={() => onClick(index)}
                />
            ))}
        </div>
    );
}

function Faq() {
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10; // 페이지당 표시할 아이템 수

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
        setOpenIndex(null); // 열려 있는 질문을 닫음
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setOpenIndex(null); // 페이지 변경 시 열려 있는 질문을 닫음
    };

    const getFaqs = () => {
        const selectedFaqs = selectedCategory === 'all' ? allFaqs : faqs[selectedCategory];
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return selectedFaqs.slice(indexOfFirstPost, indexOfLastPost);
    };

    const totalPosts = selectedCategory === 'all' ? allFaqs.length : faqs[selectedCategory].length;

    return (
        <div className="max-w-xl mx-auto mt-8 h-[calc(100vh-8rem)] overflow-y-auto dark:text-white">
            <div className="mb-4 flex justify-around">
                <label>
                    <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={selectedCategory === 'all'}
                        onChange={handleCategoryChange}
                    />
                    전체
                </label>
                <label>
                    <input
                        type="radio"
                        name="category"
                        value="login"
                        checked={selectedCategory === 'login'}
                        onChange={handleCategoryChange}
                    />
                    로그인
                </label>
                <label>
                    <input
                        type="radio"
                        name="category"
                        value="terms"
                        checked={selectedCategory === 'terms'}
                        onChange={handleCategoryChange}
                    />
                    약관
                </label>
                <label>
                    <input
                        type="radio"
                        name="category"
                        value="guide"
                        checked={selectedCategory === 'guide'}
                        onChange={handleCategoryChange}
                    />
                    이용안내
                </label>
            </div>

            <FaqCategory
                faqs={getFaqs()}
                openIndex={openIndex}
                onClick={handleClick}
            />

            <Pagination
                totalPosts={totalPosts}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Faq;
