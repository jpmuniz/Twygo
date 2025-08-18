export type Video = {
  filename: string;
  url: string;
  byte_size: number;
};

export type Course = {
  id?: number;
  title: string;
  end_date: string;
  description?: string;
  videos: Video;
};

export type CourseVideoItem = {
  id: number;
  title: string;
  description?: string;
  url?: string;
  end_date: string;
};