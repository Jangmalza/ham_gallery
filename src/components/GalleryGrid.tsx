import React, { useState, useRef, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import type { GalleryImage } from '../data/galleryData';
import { downloadImage } from '../utils/downloadImage';

interface GalleryGridProps {
  images: GalleryImage[];
  loading: boolean;
}


// Helper function to generate srcset for responsive images
const generateSrcSet = (url: string) => {
  const widths = [400, 800, 1200, 1600];
  // remove any existing width, height, and quality parameters
  const baseUrl = url.split('?')[0];
  return widths
    .map(width => `${baseUrl}?w=${width}&fit=crop&q=80&fm=webp ${width}w`)
    .join(', ');
};

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, loading }) => {
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({});
  const [imageErrorStates, setImageErrorStates] = useState<Record<string, boolean>>({});
  const [downloadingStates, setDownloadingStates] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 이미지 로드 완료 처리
  const handleImageLoad = (imageId: string) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [imageId]: false
    }));
  };

  // 이미지 로드 에러 처리
  const handleImageError = (imageId: string) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [imageId]: false
    }));
    setImageErrorStates(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  // 이미지 다운로드 처리
  const handleDownload = async (image: GalleryImage, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    setDownloadingStates(prev => ({ ...prev, [image.id]: true }));
    
    try {
      await downloadImage(image.url, `${image.title.replace(/\s+/g, '_')}_${image.id}`);
    } catch (error) {
      console.error('Download failed:', error);
      alert('다운로드에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setDownloadingStates(prev => ({ ...prev, [image.id]: false }));
    }
  };

  // 이미지 클릭 시 모달 열기
  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedImage]);

  // 모달 오픈 시 닫기 버튼 포커스
  useEffect(() => {
    if (selectedImage && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [selectedImage]);

  // 모달 외부 클릭으로 닫기
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    1024: 2,
    640: 1
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Masonry 갤러리 그리드 */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image, index) => {
            const isImageLoading = imageLoadingStates[image.id] !== false;
            const hasImageError = imageErrorStates[image.id];
            const isDownloading = downloadingStates[image.id];
            const isHovered = hoveredImage === image.id;
            
            return (
              <div
                key={image.id}
                className="group cursor-pointer mb-6"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => handleImageClick(image)}
              >
                <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white ${
                  isHovered ? 'transform scale-[1.03] shadow-green-200/50' : ''
                }`}>
                  {/* 이미지 컨테이너 */}
                  <div className="relative overflow-hidden">
                    {/* 로딩 스켈레톤 */}
                    {isImageLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* 에러 상태 */}
                    {hasImageError && (
                      <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-500 aspect-[4/5]">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-sm font-medium">이미지를 불러올 수 없습니다</span>
                      </div>
                    )}
                    
                    {/* 메인 이미지 */}
                    {!hasImageError && (
                      <img
                        src={image.url}
                        srcSet={generateSrcSet(image.url)}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        alt={image.title}
                        className={`w-full h-auto object-cover transition-all duration-700 ${
                          isImageLoading ? 'opacity-0' : 'opacity-100'
                        } ${isHovered ? 'scale-110' : 'scale-100'}`}
                        loading="lazy"
                        decoding="async"
                        width={image.width}
                        height={image.height}
                        onLoad={() => handleImageLoad(image.id)}
                        onError={() => handleImageError(image.id)}
                      />
                    )}

                    {/* 호버 오버레이 */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-all duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {/* 액션 버튼들 */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={(e) => handleDownload(image, e)}
                          disabled={isDownloading}
                          className="w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                          aria-label="다운로드"
                        >
                          {isDownloading ? (
                            <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageClick(image);
                          }}
                          className="w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
                          aria-label="확대보기"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>

                      {/* 하단 정보 */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold text-lg mb-1 line-clamp-1">
                          {image.title}
                        </h3>
                        {image.photographer && (
                          <p className="text-sm text-white/90 mb-2">
                            by {image.photographer}
                          </p>
                        )}
                        {image.location && (
                          <div className="flex items-center gap-1 text-xs text-white/80">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{image.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 카드 하단 정보 */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {image.description}
                      </p>
                    )}
                    {image.tags && image.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {image.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className={`inline-block px-2.5 py-1 text-xs rounded-full font-medium ${
                              tagIndex === 0 ? 'bg-green-100 text-green-700' :
                              tagIndex === 1 ? 'bg-emerald-100 text-emerald-700' :
                              'bg-teal-100 text-teal-700'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                        {image.tags.length > 3 && (
                          <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                            +{image.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Masonry>

        {/* 로딩 스피너 */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-green-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 mb-1">더 많은 작품을 불러오고 있어요</p>
                <p className="text-sm text-gray-500">잠시만 기다려주세요...</p>
              </div>
            </div>
          </div>
        )}

        {/* 빈 상태 */}
        {!loading && images.length === 0 && (
          <div className="text-center py-20">
                        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">아직 작품이 없어요</h3>
            <p className="text-gray-600 max-w-md mx-auto">곧 아름다운 사진들을 업로드할 예정입니다. 조금만 기다려주세요!</p>
          </div>
        )}
      </div>

      {/* 이미지 상세 모달 */}
        {selectedImage && (
        <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-modal-title"
          onClick={handleModalClick}
        >
          <div 
            ref={modalRef}
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* 모달 헤더 */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6">
              <div className="flex justify-between items-start">
                <div className="text-white">
                  <h2 id="image-modal-title" className="text-2xl font-bold mb-1">{selectedImage.title}</h2>
                  {selectedImage.photographer && (
                    <p className="text-white/90">by {selectedImage.photographer}</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(selectedImage);
                    }}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                    disabled={downloadingStates[selectedImage.id]}
                  >
                    {downloadingStates[selectedImage.id] ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </button>
                  <button
                    ref={closeButtonRef}
                    onClick={closeModal}
                    className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* 모달 이미지 */}
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
                decoding="async"
                width={selectedImage.width}
                height={selectedImage.height}
            />

            {/* 모달 하단 정보 */}
            <div className="p-6">
              {selectedImage.description && (
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                  {selectedImage.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                {selectedImage.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{selectedImage.location}</span>
                  </div>
                )}
                {selectedImage.tags && selectedImage.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className={`px-3 py-1.5 text-sm rounded-full font-medium ${
                          index % 3 === 0 ? 'bg-green-100 text-green-700' :
                          index % 3 === 1 ? 'bg-emerald-100 text-emerald-700' :
                          'bg-teal-100 text-teal-700'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;