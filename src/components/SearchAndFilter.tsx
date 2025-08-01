import React, { useState } from 'react';

interface SearchAndFilterProps {
  onTagFilter: (tag: string | null) => void;
  availableTags: string[];
  currentTag: string | null;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onTagFilter,
  availableTags,
  currentTag,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-center">
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
            {currentTag ? `#${currentTag}` : '태그 필터'}
          </button>

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
      </div>
    </div>
  );
};

export default SearchAndFilter; 