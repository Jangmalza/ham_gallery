export interface ProfileData {
  name: string;
  bio: string;
  profileImage: string;
  socialLinks: {
    instagram?: string;
    website?: string;
    twitter?: string;
    email?: string;
  };
}

export const profileData: ProfileData = {
  name: "장현우",
  bio: "자연과 일상의 아름다운 순간들을 담는 사진작가입니다. 빛과 그림자가 만들어내는 이야기를 통해 감동을 전달하고자 합니다.",
  profileImage: "/avatar.svg",
  socialLinks: {
    instagram: "https://instagram.com/photographer_miso",
    website: "https://misokim.photography",
    email: "contact@misokim.com",
    twitter: "https://twitter.com/photographer_miso"
  }
};