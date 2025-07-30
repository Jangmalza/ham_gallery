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

// 고품질의 다양한 Unsplash 이미지를 사용한 갤러리 데이터
export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop&q=80",
    title: "Serene Mountain Lake",
    description: "Crystal clear alpine lake reflecting the majestic mountains at golden hour",
    tags: ["nature", "landscape", "mountain", "reflection"],
    width: 800,
    height: 1200,
    photographer: "John Anderson",
    location: "Swiss Alps"
  },
  {
    id: "2", 
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80",
    title: "Ocean Waves",
    description: "Powerful waves crashing against dramatic coastal cliffs",
    tags: ["ocean", "waves", "seascape", "power"],
    width: 800,
    height: 600,
    photographer: "Maria Costa",
    location: "Big Sur, California"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1000&fit=crop&q=80",
    title: "Enchanted Forest",
    description: "Mystical forest path bathed in ethereal morning light",
    tags: ["forest", "path", "nature", "mystical"],
    width: 800,
    height: 1000,
    photographer: "Elena Forest",
    location: "Black Forest, Germany"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1506502281700-80ba0c2b8be4?w=800&h=1200&fit=crop&q=80",
    title: "Sunset Desert",
    description: "Golden sand dunes under a painted sunset sky",
    tags: ["desert", "sunset", "dunes", "golden"],
    width: 800,
    height: 1200,
    photographer: "Ahmed Hassan",
    location: "Sahara Desert"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80",
    title: "Snowy Peaks",
    description: "Majestic snow-capped mountain range piercing through clouds",
    tags: ["mountain", "snow", "peaks", "clouds"],
    width: 800,
    height: 600,
    photographer: "Nordic Explorer",
    location: "Norwegian Fjords"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=800&fit=crop&q=80",
    title: "City Lights",
    description: "Vibrant urban skyline illuminated against the night sky",
    tags: ["city", "lights", "urban", "night"],
    width: 800,
    height: 800,
    photographer: "Urban Lens",
    location: "Tokyo, Japan"
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=1000&fit=crop&q=80",
    title: "Golden Wheat Fields",
    description: "Endless fields of golden wheat swaying in the summer breeze",
    tags: ["field", "wheat", "golden", "summer"],
    width: 800,
    height: 1000,
    photographer: "Prairie Soul",
    location: "Tuscany, Italy"
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop&q=80",
    title: "Misty Valley",
    description: "Rolling hills shrouded in morning mist and soft light",
    tags: ["valley", "mist", "hills", "morning"],
    width: 800,
    height: 600,
    photographer: "Valley Wanderer",
    location: "Scottish Highlands"
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&q=80&crop=entropy",
    title: "Alpine Reflection",
    description: "Perfect mirror reflection of peaks in pristine mountain lake",
    tags: ["alpine", "reflection", "peaks", "pristine"],
    width: 800,
    height: 800,
    photographer: "Peak Seeker",
    location: "Canadian Rockies"
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=1200&fit=crop&q=80&crop=entropy",
    title: "Coastal Storm",
    description: "Dramatic storm brewing over the wild Atlantic coastline",
    tags: ["coast", "storm", "dramatic", "Atlantic"],
    width: 800,
    height: 1200,
    photographer: "Storm Chaser",
    location: "Ireland Coast"
  },
  {
    id: "11",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80&sat=2",
    title: "Emerald Lake",
    description: "Turquoise glacial lake surrounded by towering peaks",
    tags: ["lake", "turquoise", "glacial", "emerald"],
    width: 800,
    height: 600,
    photographer: "Glacier Guide",
    location: "Banff National Park"
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=1000&fit=crop&q=80&brightness=0.8",
    title: "Ancient Woods",
    description: "Towering ancient trees in an old-growth forest sanctuary",
    tags: ["ancient", "trees", "forest", "sanctuary"],
    width: 800,
    height: 1000,
    photographer: "Forest Guardian",
    location: "Pacific Northwest"
  },
  {
    id: "13",
    url: "https://images.unsplash.com/photo-1506502281700-80ba0c2b8be4?w=800&h=800&fit=crop&q=80&hue=30",
    title: "Desert Sunrise",
    description: "First light painting the desert landscape in warm hues",
    tags: ["desert", "sunrise", "warm", "hues"],
    width: 800,
    height: 800,
    photographer: "Desert Dawn",
    location: "Monument Valley"
  },
  {
    id: "14",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=1200&fit=crop&q=80&contrast=1.2",
    title: "Glacier Peak",
    description: "Imposing glacier-covered peak against dramatic sky",
    tags: ["glacier", "peak", "dramatic", "imposing"],
    width: 800,
    height: 1200,
    photographer: "Ice Explorer",
    location: "Patagonia"
  },
  {
    id: "15",
    url: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop&q=80&sat=1.5",
    title: "Neon Nights",
    description: "Electric city atmosphere with neon reflections",
    tags: ["neon", "electric", "city", "atmosphere"],
    width: 800,
    height: 600,
    photographer: "Night Vision",
    location: "Seoul, South Korea"
  },
  {
    id: "16",
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=800&fit=crop&q=80&sepia=0.3",
    title: "Harvest Season",
    description: "Rich golden harvest fields under autumn sky",
    tags: ["harvest", "autumn", "golden", "season"],
    width: 800,
    height: 800,
    photographer: "Harvest Moon",
    location: "French Countryside"
  }
];

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
      "?w=800&fit=crop&q=80",
      "?w=800&fit=crop&q=80&sat=1.2", 
      "?w=800&fit=crop&q=80&brightness=1.1",
      "?w=800&fit=crop&q=80&contrast=1.1",
      "?w=800&fit=crop&q=80&hue=15",
      "?w=800&fit=crop&q=80&crop=entropy"
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