import React from 'react';
import { Link } from 'react-router-dom';
import UploadForm from '../components/UploadForm';
import { useGallery } from '../hooks/useGallery';

const AdminPage: React.FC = () => {
  const { refetch } = useGallery();

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">관리자 페이지</h1>
          <Link to="/" className="text-sm font-medium text-green-600 hover:text-green-500">
            &larr; 갤러리로 돌아가기
          </Link>
        </div>
      </header>
      <main>
        <UploadForm onUploadSuccess={refetch} />
        {/* 향후 여기에 사진 관리(수정, 삭제) 기능 추가 가능 */}
      </main>
    </div>
  );
};

export default AdminPage;
