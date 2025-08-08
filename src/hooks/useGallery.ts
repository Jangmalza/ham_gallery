import { useState, useCallback, useMemo, useEffect } from 'react';
import type { GalleryImage } from '../data/galleryData';
import { galleryImages, generateMoreImages } from '../data/galleryData';

const ITEMS_PER_PAGE = 8;
const LS_KEY = 'custom_gallery_images_v1';

export const useGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>(() => {
    const storedRaw = localStorage.getItem(LS_KEY);
    const stored = storedRaw ? (JSON.parse(storedRaw) as Partial<GalleryImage>[]) : [];
    const normalized = stored.map((i, idx) => ({
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
    const initial = [...normalized, ...galleryImages].slice(0, ITEMS_PER_PAGE);
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);



  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // 실제 API 호출을 시뮬레이션하기 위한 지연
    setTimeout(() => {
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const storedRaw = localStorage.getItem(LS_KEY);
      const stored = storedRaw ? (JSON.parse(storedRaw) as Partial<GalleryImage>[]) : [];
      const normalizedStored = stored.map((i, idx) => ({
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
      
      let newImages: GalleryImage[] = [];
      
      // 기존 이미지에서 더 가져올 수 있는지 확인
      if (startIndex < galleryImages.length) {
         const combined = [...normalizedStored, ...galleryImages];
         const remainingOriginal = combined.slice(startIndex, startIndex + ITEMS_PER_PAGE);
         newImages = remainingOriginal as GalleryImage[];
        
        // 부족한 만큼 생성된 이미지로 채우기
        if (remainingOriginal.length < ITEMS_PER_PAGE) {
          const needed = ITEMS_PER_PAGE - remainingOriginal.length;
          const baseLen = normalizedStored.length + galleryImages.length;
          const generated = generateMoreImages(baseLen + (currentPage - 1) * ITEMS_PER_PAGE, needed);
          newImages = [...remainingOriginal, ...generated];
        }
      } else {
        // 모든 원본 이미지를 다 사용했으므로 생성된 이미지 사용
        const baseLen = normalizedStored.length + galleryImages.length;
        newImages = generateMoreImages(baseLen + (currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
      }

      setImages(prevImages => [...prevImages, ...newImages]);
      setCurrentPage(prev => prev + 1);
      setLoading(false);

      // 100개까지만 로딩하도록 제한 (데모용)
      if (images.length + newImages.length >= 100) {
        setHasMore(false);
      }
    }, 800); // 로딩 시뮬레이션
  }, [loading, hasMore, currentPage, images.length]);

  // 갤러리 상태를 메모이제이션
  const galleryState = useMemo(() => ({
    images,
    loading,
    hasMore,
    loadMore
  }), [images, loading, hasMore, loadMore]);

  return galleryState;
};