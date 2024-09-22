import { useState, useRef } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const MobilePostList = ({ posts }) => {
    const [visiblePosts, setVisiblePosts] = useState(5);
    const contentRef = useRef(null);

    const handleLoadMore = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5);
    };

    const scrollToTop = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToBottom = () => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: contentRef.current.scrollHeight, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative max-w-full lg:max-w-4xl mx-auto p-4 bg-gray-100 h-[calc(100vh-6rem)] overflow-hidden">
            <h1 className="text-2xl lg:text-3xl font-medium mb-4">게시판</h1>

            <div ref={contentRef} className="space-y-4 lg:space-y-6 h-[calc(100%-3rem)] overflow-y-auto pr-4">
                {posts.slice(0, visiblePosts).map(post => (
                    <div key={post.id} className="bg-white p-4 lg:p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-700 mt-2 lg:text-lg font-light">{post.content}</p>
                    </div>
                ))}
                {visiblePosts < posts.length && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
                    >
                        더보기 +
                    </button>
                )}
            </div>


            {/* TOP/BOTTOM 버튼 */}
            <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
                <button
                    onClick={scrollToTop}
                    className="bg-gray-700 text-white p-2 rounded-full shadow-lg"
                >
                    <MdKeyboardArrowUp className="w-6 h-6" />
                </button>
                <button
                    onClick={scrollToBottom}
                    className="bg-gray-700 text-white p-2 rounded-full shadow-lg"
                >
                    <MdKeyboardArrowDown className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default MobilePostList;