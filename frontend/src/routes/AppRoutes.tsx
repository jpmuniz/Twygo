import { Routes, Route, Navigate } from "react-router-dom";

import {CreateCourse} from "../pages/CreateCourse";
import { CourseGallery } from "../pages/CourseGallery";
import { TotalVideoUsage } from "../pages/TotalVideosSize";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/videos" replace />} />
      <Route path="/create" element={<CreateCourse />} />
      <Route path="/courses/:id/edit" element={<CreateCourse />} />
      <Route path="/videos" element={<CourseGallery />} />
      <Route path="/videosize" element={<TotalVideoUsage />} />
      <Route path="*" element={<Navigate to="/videos" replace />} />
    </Routes>
  );
}
