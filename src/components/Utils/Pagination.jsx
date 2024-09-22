import { MdFirstPage, MdNavigateBefore, MdNavigateNext, MdLastPage } from 'react-icons/md';

const Pagination = ({ totalPosts, postsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-between items-center mt-4">
            {/* 왼쪽 네비게이션 */}
            <div className="flex space-x-1">
                <button
                    className={`px-2 py-1 border rounded flex items-center justify-center transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-blue-700 hover:text-white'}`}
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    <MdFirstPage className="w-5 h-5" />
                </button>
                <button
                    className={`px-2 py-1 border rounded flex items-center justify-center transition-colors duration-200 ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-blue-700 hover:text-white'}`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <MdNavigateBefore className="w-5 h-5" />
                </button>
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
                <button
                    className={`px-2 py-1 border rounded flex items-center justify-center transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-blue-700 hover:text-white'}`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <MdNavigateNext className="w-5 h-5" />
                </button>
                <button
                    className={`px-2 py-1 border rounded flex items-center justify-center transition-colors duration-200 ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'hover:bg-blue-700 hover:text-white'}`}
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <MdLastPage className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
