import React from 'react';
import type { ProfileData } from '../data/profileData';

interface ProfileHeaderProps {
  profile: ProfileData;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const socialIcons = {
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
      </svg>
    )
  };

  return (
    <section className="bg-white border-b border-gray-200" aria-labelledby="profile-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12">
          {/* 프로필 이미지 */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={profile.profileImage}
                alt={`${profile.name} 프로필 사진`}
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-xl ring-4 ring-white ring-opacity-50"
                loading="eager"
              />
              {/* 배경 그라데이션 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-600/20 -z-10 transform scale-110"></div>
            </div>
          </div>

          {/* 프로필 정보 */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h1 
              id="profile-heading"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6"
            >
              {profile.name}
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 lg:px-0">
              {profile.bio}
            </p>

            {/* 소셜 링크 */}
            <nav aria-label="소셜 미디어 링크">
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                {Object.entries(profile.socialLinks).map(([platform, url]) => {
                  if (!url) return null;
                  
                  const isEmail = platform === 'email';
                  const href = isEmail ? `mailto:${url}` : url;
                  
                  return (
                    <a
                      key={platform}
                      href={href}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-green-50 hover:to-emerald-50 rounded-xl transition-all duration-300 text-gray-700 hover:text-green-700 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:scale-105"
                      aria-label={`${platform} ${isEmail ? '이메일 보내기' : '페이지 방문'}`}
                    >
                      <span className="text-green-600 group-hover:text-green-700 transition-colors">
                        {socialIcons[platform as keyof typeof socialIcons]}
                      </span>
                      <span className="text-sm sm:text-base font-medium">
                        {platform === 'website' ? 'Website' : 
                         platform === 'email' ? 'Email' :
                         platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </span>
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>

        {/* 통계 정보 (옵션) */}
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto lg:max-w-none">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">100+</div>
            <div className="text-xs sm:text-sm text-gray-600">사진</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">50+</div>
            <div className="text-xs sm:text-sm text-gray-600">컬렉션</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">5년+</div>
            <div className="text-xs sm:text-sm text-gray-600">경력</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;