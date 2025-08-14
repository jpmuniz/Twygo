export interface Video {
  filename: string;
  byte_size: number;
  url: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  end_date: string;
  videos?: Video[];
}
