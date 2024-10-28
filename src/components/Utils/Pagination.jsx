import { useState, useEffect } from 'react';
import { MdFirstPage, MdNavigateBefore, MdNavigateNext, MdLastPage } from 'react-icons/md';

const Pagination = ({ totalPosts, postsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const [currentGroup, setCurrentGroup] = useState(Math.ceil(currentPage / 10));

    const startPage = (currentGroup - 1) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleNextGroup = () => {
        if (endPage < totalPages) {
            setCurrentGroup(currentGroup + 1);
            onPageChange(startPage + 10);  // 다음 그룹의 첫 페이지로 이동
        }
    };

    // const handlePrevGroup = () => {
    //     if (startPage > 1) {
    //         setCurrentGroup(currentGroup - 1);
    //         onPageChange(startPage - 10);  // 이전 그룹의 첫 페이지로 이동
    //     }
    // };

    const handleFirstPage = () => {
        setCurrentGroup(1);
        onPageChange(1);
    };

    const handleLastPage = () => {
        const lastGroup = Math.ceil(totalPages / 10);
        setCurrentGroup(lastGroup);
        onPageChange(totalPages);
    };

    const handlePrevPage = () => {
        if (currentPage > startPage) {
            onPageChange(currentPage - 1);
        } else if (currentPage > 1) {
            onPageChange(startPage - 1); // 이전 그룹의 마지막 페이지로 이동
            setCurrentGroup(currentGroup - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < endPage) {
            onPageChange(currentPage + 1);
        } else if (currentPage < totalPages) {
            handleNextGroup(); // 다음 그룹으로 넘어가면서 첫 페이지로 이동
        }
    };

    return (
        <div className="flex justify-between items-center mt-4">
            {/* 왼쪽 네비게이션 */}
            <div className="flex space-x-1">
                <div className='group'>
                    <button
                        className={`px-2 py-1 border rounded flex items-center justify-center transition-colors duration-200 
                            ${currentPage === 1 ? 'bg-gray-600 text-gray-500 cursor-not-allowed' : 'group-hover:bg-blue-700 hover:text-white dark:text-white dark:bg-gray-400'}`}
                        onClick={handleFirstPage}
                        disabled={currentPage === 1}
                    >
                        <MdFirstPage className="w-5 h-5" />
                    </button>
                </div>
                <div className='group'>
                    <button
                        className={`px-2 py-1 border rounded flex items-center justify-center transition-colors duration-200 
                            ${currentPage === 1 ? 'bg-gray-600 text-gray-500 cursor-not-allowed' : 'group-hover:bg-blue-700 hover:text-white dark:text-white dark:bg-gray-400'}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <MdNavigateBefore className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* 페이지 번호 */}
            <div className="flex space-x-1">
                {pages.map(page => (
                    <button
                        key={page}
                        className={`px-2 py-1 border rounded transition-colors duration-200 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-300'}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* 오른쪽 네비게이션 */}
            <div className="flex space-x-1">
                <div className="group">
                    <button
                        className={`px-2 py-1 border rounded flex items-center justify-center transition-colors duration-200 
                            ${currentPage === totalPages ? 'bg-gray-600 text-gray-500 cursor-not-allowed' : 'group-hover:bg-blue-700 hover:text-white dark:text-white dark:bg-gray-400'}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <MdNavigateNext className="w-5 h-5" />
                    </button>
                </div>
                <div className="group">
                    <button
                        className={`px-2 py-1 border rounded flex items-center justify-center transition-colors duration-200 
                            ${currentPage === totalPages ? 'bg-gray-600 text-gray-500 cursor-not-allowed' : 'group-hover:bg-blue-700 hover:text-white dark:text-white dark:bg-gray-400'}`}
                        onClick={handleLastPage}
                        disabled={currentPage === totalPages}
                    >
                        <MdLastPage className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
