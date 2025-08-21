
import type { GalleryImage } from '../data/galleryData';

const LS_KEY = 'custom_gallery_images_v1';
const API_DELAY = 500; // ms

// Helper to get all images from LS
const getImagesFromLocalStorage = (): GalleryImage[] => {
  const storedRaw = localStorage.getItem(LS_KEY);
  return storedRaw ? (JSON.parse(storedRaw) as GalleryImage[]) : [];
};

/**
 * Fetches a paginated list of images from our mock database (localStorage).
 */
export const fetchImages = async (
  page: number = 1,
  limit: number = 8
): Promise<{ images: GalleryImage[]; hasMore: boolean; total: number }> => {
  console.log(`Fetching page ${page} with limit ${limit}`);
  
  return new Promise(resolve => {
    setTimeout(() => {
      const allImages = getImagesFromLocalStorage();
      const startIndex = (page - 1) * limit;
      const paginatedImages = allImages.slice(startIndex, startIndex + limit);
      
      resolve({
        images: paginatedImages,
        hasMore: startIndex + limit < allImages.length,
        total: allImages.length,
      });
    }, API_DELAY);
  });
};
