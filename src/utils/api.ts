// API utilities for Sportigio blog
export interface BlogPost {
  id: number;
  title: string;
  image: string;
  image_mini: string;
  lead: string;
  url: string;
  created_at: string;
  content?: string; // For single post view
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const API_BASE_URL = 'https://sportigio.com/api';

// Fetch all articles
export async function fetchArticles(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<BlogPost[]> = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Fetch single article by ID
export async function fetchArticle(id: string | number): Promise<BlogPost | null> {
  try {
    // WORKAROUND: API individual article endpoint has bug - all IDs are off by 1
    // So we subtract 1 from the ID to get the correct article
    const apiId = parseInt(id.toString()) - 1;
    console.log(`Workaround: Requesting article ID ${apiId} for display ID ${id}`);
    
    const response = await fetch(`${API_BASE_URL}/articles/${apiId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<BlogPost> = await response.json();
    
    if (result.success && result.data) {
      // Restore the original ID for consistency
      result.data.id = parseInt(id.toString());
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Helper function to format date
export function formatDate(dateString: string, locale: string = 'pl'): string {
  const date = new Date(dateString);
  
  if (locale === 'pl') {
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to extract excerpt from content
export function extractExcerpt(content: string, length: number = 150): string {
  // Remove HTML tags and get plain text
  const textContent = content.replace(/<[^>]*>/g, '');
  
  if (textContent.length <= length) {
    return textContent;
  }
  
  return textContent.substring(0, length).trim() + '...';
} 