export type ContentItem =
  | { id: string; type: "pdf"; src: string; pages: number }
  | { id: string; type: "video" | "audio" | "resource"; src: string }
  | { id: string; type: "text/html"; html: string }
  | { id: string; type: "quiz"; assessmentId: string };
export interface CourseModule {
  id: number;
  title: string;
  content: ContentItem[];
}
export interface Course {
  id: string;
  title: string;
  modules: CourseModule[];
}
