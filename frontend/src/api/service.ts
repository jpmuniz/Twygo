import { handleResponse } from "./helpers";
import type { Course } from "../types";

const API_URL = "http://localhost:3001/api";


export const fetchCourses = async (): Promise<Course[]> => {
  const res = await fetch(`${API_URL}/courses`);
  return handleResponse(res);
};

export const updateCourse = async (id: number | string, data: Partial<Course>) => {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course: data }),
  });
  return handleResponse(res);
};

export const createCourse = async (data: Partial<Course>) => {
  const res = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course: data }),
  });
  return handleResponse(res);
};

export const deleteCourse = async (id: number | string) => {
  const res = await fetch(`${API_URL}/courses/${id}`, { method: "DELETE" });
  return handleResponse(res);
};

export async function uploadVideoFiles(courseId: number | string, files: FileList) {
  const fd = new FormData();
  Array.from(files).forEach((f) => fd.append("videos[]", f));
  const res = await fetch(`${API_URL}/course_videos/${courseId}/upload`, {
    method: "POST",
    body: fd,
  });
  return handleResponse(res);
}

export async function uploadVideoByUrl(courseId: number | string, url: string) {
  const res = await fetch(`${API_URL}/course_videos/${courseId}/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ video_url: url }),
  });
  return handleResponse(res);
}

export const videosSize = async () => {
  const res = await fetch(`${API_URL}/course_videos/video_sizes`);
  return handleResponse(res);
};

export const fetchCoursesAndVideos = async () => {
  const res = await fetch(`${API_URL}/course_videos/courses_with_videos`)
  return handleResponse(res);
}