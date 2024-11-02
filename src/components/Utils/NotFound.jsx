import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold">404 NOT FOUND ERROR</h1>
                <p className="text-2xl mt-4">페이지를 찾을 수 없습니다.</p>
                <p className="text-lg mt-2 text-gray-400">죄송합니다. 페이지를 찾을 수 없습니다.</p>
                <p className="text-lg mt-2 text-gray-400">존재하지 않는 주소를 입력하셨거나</p>
                <p className="text-lg mt-2 text-gray-400">요청하신 페이지의 주소가 변경,삭제되어 찾을 수 없습니다.</p>
                <button
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigate('/my-board-app')}
                >
                    홈페이지로 이동
                </button>
            </div>
        </div>
    )
}

export default NotFound