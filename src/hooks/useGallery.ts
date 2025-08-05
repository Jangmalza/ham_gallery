import { useState, useCallback, useMemo } from 'react';
import type { GalleryImage } from '../data/galleryData';
import { galleryImages, generateMoreImages } from '../data/galleryData';

const ITEMS_PER_PAGE = 8;

export const useGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>(
    galleryImages.slice(0, ITEMS_PER_PAGE)
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const refetch = useCallback(() => {
    setLoading(true);
    // API 재호출을 시뮬레이션합니다.
    setTimeout(() => {
      setImages(galleryImages.slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);
      setHasMore(true);
      setLoading(false);
    }, 500);
  }, []);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // 실제 API 호출을 시뮬레이션하기 위한 지연
    setTimeout(() => {
      const startIndex = currentPage * ITEMS_PER_PAGE;
      
      let newImages: GalleryImage[] = [];
      
      // 기존 이미지에서 더 가져올 수 있는지 확인
      if (startIndex < galleryImages.length) {
        const remainingOriginal = galleryImages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
        newImages = remainingOriginal;
        
        // 부족한 만큼 생성된 이미지로 채우기
        if (remainingOriginal.length < ITEMS_PER_PAGE) {
          const needed = ITEMS_PER_PAGE - remainingOriginal.length;
          const generated = generateMoreImages(galleryImages.length + (currentPage - 1) * ITEMS_PER_PAGE, needed);
          newImages = [...remainingOriginal, ...generated];
        }
      } else {
        // 모든 원본 이미지를 다 사용했으므로 생성된 이미지 사용
        newImages = generateMoreImages(galleryImages.length + (currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
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
    loadMore,
    refetch
  }), [images, loading, hasMore, loadMore, refetch]);

  return galleryState;
};