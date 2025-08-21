
import { create } from 'zustand';
import {
  type GalleryImage,
  addImageToGallery as addImage,
  removeImageFromGallery as removeImage,
  getGalleryImagesForAdmin as getAdminImages,
  initializeLocalStorageWithSampleData,
} from '../data/galleryData';
import { fetchImages } from '../api/mockApi';

// 앱 시작 시 로컬 스토리지 초기화
initializeLocalStorageWithSampleData();

interface GalleryState {
  images: GalleryImage[];
  loading: boolean;
  hasMore: boolean;
  currentPage: number;
  selectedTag: string | null;
  searchQuery: string;
  
  // Actions
  fetchInitialImages: () => Promise<void>;
  fetchMoreImages: () => Promise<void>;
  setTag: (tag: string | null) => void;
  setSearchQuery: (query: string) => void;
  
  // Admin Actions
  addImage: (newImage: Omit<GalleryImage, 'id'>) => void;
  removeImage: (id: string) => void;
  getAdminImages: () => GalleryImage[];
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  images: [],
  loading: false,
  hasMore: true,
  currentPage: 1,
  selectedTag: null,
  searchQuery: "",

  fetchInitialImages: async () => {
    set({ loading: true });
    const { images, hasMore } = await fetchImages(1);
    set({
      images,
      hasMore,
      currentPage: 2, // 다음 페이지는 2
      loading: false,
    });
  },

  fetchMoreImages: async () => {
    if (get().loading || !get().hasMore) return;

    set({ loading: true });
    const { currentPage } = get();
    const { images: newImages, hasMore } = await fetchImages(currentPage);

    set(state => ({
      images: [...state.images, ...newImages],
      hasMore,
      currentPage: state.currentPage + 1,
      loading: false,
    }));
  },

  setTag: (tag) => set({ selectedTag: tag }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Admin functions that interact with localStorage
  addImage: (newImage) => {
    addImage(newImage);
    // Admin 페이지에서 추가 후, 메인 갤러리도 새로고침
    get().fetchInitialImages();
  },
  removeImage: (id) => {
    removeImage(id);
    // 즉시 상태에 반영
    set(state => ({ 
      images: state.images.filter(img => img.id !== id)
    }));
  },
  getAdminImages: () => {
    return getAdminImages();
  }
}));
