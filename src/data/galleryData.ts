
export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  tags?: string[];
  width: number;
  height: number;
  photographer?: string;
  location?: string;
}

const LS_KEY = 'custom_gallery_images_v1';

// 무한 스크롤을 위한 더 많은 이미지를 생성하는 함수
export const generateMoreImages = (startId: number, count: number): GalleryImage[] => {
  const baseImages = [
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      title: "Nature's Masterpiece",
      tags: ["nature", "landscape"]
    },
    {
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b", 
      title: "Ocean's Power",
      tags: ["ocean", "power"]
    },
    {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Forest Symphony",
      tags: ["forest", "music"]
    },
    {
      url: "https://images.unsplash.com/photo-1506502281700-80ba0c2b8be4",
      title: "Desert Dreams",
      tags: ["desert", "dreams"]
    },
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Mountain Majesty",
      tags: ["mountain", "majesty"]
    },
    {
      url: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4",
      title: "Urban Pulse",
      tags: ["urban", "pulse"]
    },
    {
      url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
      title: "Golden Fields",
      tags: ["fields", "golden"]
    },
    {
      url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      title: "Misty Dawn",
      tags: ["misty", "dawn"]
    }
  ];

  const photographers = [
    "Alex Rivers", "Sophia Chen", "Marcus Wild", "Luna Stone", 
    "River Phoenix", "Sage Mountains", "Aurora Light", "Canyon Explorer"
  ];

  const locations = [
    "Iceland", "New Zealand", "Patagonia", "Norwegian Fjords",
    "Swiss Alps", "Japanese Alps", "Canadian Rockies", "Scottish Highlands"
  ];

  return Array.from({ length: count }, (_, index) => {
    const imageIndex = (startId + index) % baseImages.length;
    const baseImage = baseImages[imageIndex];
    
    const dimensions = [
      { width: 800, height: 600 },
      { width: 800, height: 800 },
      { width: 800, height: 1000 },
      { width: 800, height: 1200 }
    ];
    const dimIndex = (startId + index) % dimensions.length;
    
    // 다양한 이미지 효과 파라미터
    const effects = [
      "?w=800&fit=crop&q=80&fm=webp",
      "?w=800&fit=crop&q=80&sat=1.2&fm=webp", 
      "?w=800&fit=crop&q=80&brightness=1.1&fm=webp",
      "?w=800&fit=crop&q=80&contrast=1.1&fm=webp",
      "?w=800&fit=crop&q=80&hue=15&fm=webp",
      "?w=800&fit=crop&q=80&crop=entropy&fm=webp"
    ];
    const effectIndex = (startId + index) % effects.length;

    return {
      id: (startId + index).toString(),
      url: `${baseImage.url}&h=${dimensions[dimIndex].height}${effects[effectIndex]}`,
      title: `${baseImage.title} ${startId + index}`,
      description: `Stunning ${baseImage.title.toLowerCase()} captured in pristine natural beauty`,
      tags: baseImage.tags,
      width: dimensions[dimIndex].width,
      height: dimensions[dimIndex].height,
      photographer: photographers[index % photographers.length],
      location: locations[index % locations.length]
    };
  });
};

// 관리자 페이지에서 사용할 함수
export const addImageToGallery = (newImage: Omit<GalleryImage, 'id'>) => {
  const storedRaw = localStorage.getItem(LS_KEY);
  const stored = storedRaw ? (JSON.parse(storedRaw) as Partial<GalleryImage>[]) : [];
  const newEntry: GalleryImage = {
    ...newImage,
    id: `custom-${Date.now()}-${Math.random()}`,
  };
  const updated = [newEntry, ...stored];
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};

export const removeImageFromGallery = (id: string) => {
  const storedRaw = localStorage.getItem(LS_KEY);
  const stored = storedRaw ? (JSON.parse(storedRaw) as Partial<GalleryImage>[]) : [];
  const updated = stored.filter(img => img.id !== id);
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
};

export const getGalleryImagesForAdmin = (): GalleryImage[] => {
  const storedRaw = localStorage.getItem(LS_KEY);
  const stored = storedRaw ? (JSON.parse(storedRaw) as Partial<GalleryImage>[]) : [];
  return stored.map((i, idx) => ({
    id: (i.id as string) ?? `custom-${idx}`,
    url: i.url as string,
    title: i.title as string,
    description: i.description,
    tags: i.tags,
    photographer: i.photographer,
    location: i.location,
    width: (i.width as number) ?? 800,
    height: (i.height as number) ?? 600,
  }));
};

// 초기 데이터 로더
export const initializeLocalStorageWithSampleData = (force = false) => {
  const storedRaw = localStorage.getItem(LS_KEY);
  if (!storedRaw || force) {
    const sampleImages = generateMoreImages(0, 20);
    localStorage.setItem(LS_KEY, JSON.stringify(sampleImages));
  }
};
