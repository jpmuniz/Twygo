export type Video = {
  id: number | string;
  filename: string;
  url: string;
  byte_size: number;
  courseTitle?: string;
  courseDescription?: string;
};

export type Course = {
  id: number;
  title: string;
  end_date: string;
  description?: string;
  videos: Video;
};

export type CreateCoursePayload = {
  id: number;
  title: string;
  end_date: string;
  description?: string;
}
