import axios, { AxiosInstance, AxiosResponse } from "axios";

interface SearchResults {
  total: number;
  total_pages: number;
  results: Photo[];
}

interface Photo {
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

const unsplash: AxiosInstance = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    "Accept-Version": "v1",
    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
  },
});

export async function searchPhotos(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<SearchResults> {
  const response: AxiosResponse<SearchResults> = await unsplash.get(
    `/search/photos?query=${query}&page=${page}&per_page=${perPage}`
  );
  return response.data;
}

