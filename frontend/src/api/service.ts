import { handleResponse } from "./helpers";
import type { Course } from "../types";

const API_URL = "http://localhost:3001/api";


export const fetchCourses = async (): Promise<Course[]> => {
  const res = await fetch(`${API_URL}/courses`);
  return handleResponse(res);
};

export const updateCourse = async (id: number, data: Partial<Course>) => {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course: data }),
  });
  return handleResponse(res);
};

export const createCourse = async (data: Course) => {
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

export const uploadVideos = async (id: number, files: FileList) => {
  const formData = new FormData();
  Array.from(files).forEach(file => formData.append("videos[]", file));

  const res = await fetch(`${API_URL}/course_videos/${id}/upload`, {
    method: "POST",
    body: formData,
  });
  return handleResponse(res);
};

export const videosSizes = async () => {
  const res = await fetch(`${API_URL}/course_videos/video_sizes`);
  return handleResponse(res);
};

export const fetchCoursesAndVideos = async () => {
  const res = await fetch(`${API_URL}/course_videos/courses_with_videos`)
  return handleResponse(res);
}