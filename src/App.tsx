

import { useState, useMemo } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ProfileHeader from './components/ProfileHeader';
import GalleryGrid from './components/GalleryGrid';
import SearchAndFilter from './components/SearchAndFilter';
import { profileData } from './data/profileData';
import { useGallery } from './hooks/useGallery';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

function App() {
  const { images, loading, hasMore, loadMore } = useGallery();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 무한 스크롤 훅 사용
  const { targetRef } = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: loadMore,
    threshold: 300
  });

  // 필터링된 이미지들
  const filteredImages = useMemo(() => {
    if (!selectedTag) {
      return images;
    }
    return images.filter(image => 
      image.tags?.includes(selectedTag)
    );
  }, [images, selectedTag]);

  // 사용 가능한 모든 태그 수집
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    images.forEach(image => {
      image.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [images]);

  // 태그 필터 핸들러
  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Hero Section */}
        <header 
          className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">
                  Photo Gallery
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed px-4 mb-6">
                  아름다운 순간들을 담은 사진 컬렉션을 만나보세요
                </p>
                
                {/* 통계 정보 */}
                <div className="flex justify-center gap-8 text-sm sm:text-base">
                  <div className="text-center">
                    <div className="font-bold text-2xl text-white">{images.length}+</div>
                    <div className="text-green-200">사진</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-2xl text-white">{availableTags.length}+</div>
                    <div className="text-green-200">태그</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-8 sm:h-12 fill-gray-50">
              <path d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,85.3C1248,96,1344,96,1392,96L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
            </svg>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-gray-50 min-h-screen">
          {/* Profile Header */}
          <ProfileHeader profile={profileData} />

          {/* Search and Filter */}
          <SearchAndFilter
            onTagFilter={handleTagFilter}
            availableTags={availableTags}
            currentTag={selectedTag}
          />

          {/* Gallery Grid */}
          <GalleryGrid images={filteredImages} loading={loading} />

          {/* Infinite Scroll Target */}
          <div ref={targetRef} className="h-1" aria-hidden="true" />

          {/* 필터 결과가 없을 때 */}
          {filteredImages.length === 0 && !loading && images.length > 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">해당 태그의 사진이 없습니다</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                다른 태그를 선택하거나 필터를 초기화해보세요.
              </p>
              <div className="flex justify-center gap-3">
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                  >
                    필터 초기화
                  </button>
                )}
              </div>
            </div>
          )}

          {/* End Message */}
          {!hasMore && images.length > 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  모든 사진을 확인하셨습니다
                </span>
              </div>
            </div>
          )}

          {/* Enhanced Footer */}
          <footer className="bg-white border-t border-gray-200 mt-16 sm:mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="text-center">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {profileData.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
                    {profileData.bio}
                  </p>
                </div>
                
                {/* 갤러리 통계 */}
                <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{images.length}+</div>
                    <div className="text-sm text-gray-600">총 사진</div>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{availableTags.length}</div>
                    <div className="text-sm text-gray-600">태그</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">∞</div>
                    <div className="text-sm text-gray-600">추억</div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {Object.entries(profileData.socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    const isEmail = platform === 'email';
                    const href = isEmail ? `mailto:${url}` : url;
                    
                    return (
                      <a
                        key={platform}
                        href={href}
                        target={isEmail ? undefined : "_blank"}
                        rel={isEmail ? undefined : "noopener noreferrer"}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        aria-label={`${platform} 링크`}
                      >
                        {/* Social icons - keeping the existing ones */}
                        {platform === 'instagram' && (
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        )}
                        {platform === 'website' && (
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zm8.127 4.873A10.07 10.07 0 0012 2a10.07 10.07 0 00-8.127 2.873A10.07 10.07 0 002 12a10.07 10.07 0 001.873 8.127A10.07 10.07 0 0012 22a10.07 10.07 0 008.127-1.873A10.07 10.07 0 0022 12a10.07 10.07 0 00-1.873-8.127z"/>
                          </svg>
                        )}
                        {platform === 'email' && (
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                          </svg>
                        )}
                        {platform === 'twitter' && (
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        )}
                      </a>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 pt-6 sm:pt-8">
                  <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">
                    © 2024 {profileData.name}. All rights reserved.
                  </p>
                  <p className="text-gray-400 text-xs">
                    이 갤러리의 모든 사진은 작가의 저작물입니다.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
