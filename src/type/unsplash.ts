declare module 'unsplash' {
  export interface Photo {
    id: string;
    width: number;
    height: number;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    color: string | null;
    description: string | null;
    alt_description: string | null;
    user: {
      name: string;
      links: {
        html: string;
      };
    };
    links: {
      download: string;
      download_location: string;
      html: string;
    };
  }

  export interface SearchResults {
    total: number;
    total_pages: number;
    results: Photo[];
  }
}
