import React, { useState } from 'react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onTagFilter: (tag: string | null) => void;
  availableTags: string[];
  currentTag: string | null;
  searchQuery: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onTagFilter,
  availableTags,
  currentTag,
  searchQuery
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* 검색 바 */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="사진 제목이나 설명으로 검색..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* 필터 버튼 */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                currentTag 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              태그 필터
              {currentTag && (
                <span className="ml-1 px-2 py-0.5 bg-green-200 text-green-800 text-xs rounded-full">
                  {currentTag}
                </span>
              )}
            </button>

            {/* 필터 드롭다운 */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-10">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">태그로 필터링</h3>
                    {currentTag && (
                      <button
                        onClick={() => {
                          onTagFilter(null);
                          setIsFilterOpen(false);
                        }}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        초기화
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            onTagFilter(tag === currentTag ? null : tag);
                            setIsFilterOpen(false);
                          }}
                          className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 text-left ${
                            currentTag === tag
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 결과 카운트 */}
          <div className="text-sm text-gray-500">
            {searchQuery || currentTag ? (
              <span>필터링된 결과</span>
            ) : (
              <span>전체 사진</span>
            )}
          </div>
        </div>

        {/* 활성 필터 표시 */}
        {(searchQuery || currentTag) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">활성 필터:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                  검색: "{searchQuery}"
                  <button
                    onClick={() => onSearch('')}
                    className="w-4 h-4 hover:text-emerald-900"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {currentTag && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-sm rounded-full">
                  태그: #{currentTag}
                  <button
                    onClick={() => onTagFilter(null)}
                    className="w-4 h-4 hover:text-green-900"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter; 