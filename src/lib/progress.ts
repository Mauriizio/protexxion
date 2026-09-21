import { course } from "@/data/course";
export const STORAGE_KEY = "protexxion-demo-progress-v1";
export interface Progress {
  version: 1;
  completed: number[];
  current: number;
  unlocked: number;
  visited: Record<number, number[]>;
  lastPage: Record<number, number>;
  percent: number;
}
export const freshProgress = (): Progress => ({
  version: 1,
  completed: [],
  current: 1,
  unlocked: 1,
  visited: {},
  lastPage: {},
  percent: 0,
});
export function pageCount(id: number) {
  const content = course.modules.find((m) => m.id === id)?.content[0];
  return content?.type === "pdf" ? content.pages : 0;
}
export function normalizeProgress(value: unknown): Progress {
  const result = freshProgress();
  if (!value || typeof value !== "object") return result;
  const data = value as Partial<Progress>;
  if (data.version !== 1) return result;
  for (const m of course.modules) {
    const pages = data.visited?.[m.id];
    result.visited[m.id] = Array.isArray(pages)
      ? [
          ...new Set(
            pages.filter(
              (p) => Number.isInteger(p) && p >= 1 && p <= pageCount(m.id),
            ),
          ),
        ]
      : [];
    const last = data.lastPage?.[m.id];
    result.lastPage[m.id] =
      typeof last === "number" &&
      Number.isInteger(last) &&
      last >= 1 &&
      last <= pageCount(m.id)
        ? last
        : 1;
  }
  for (const m of course.modules) {
    if (
      Array.isArray(data.completed) &&
      data.completed.includes(m.id) &&
      result.visited[m.id].length === pageCount(m.id)
    )
      result.completed.push(m.id);
    else break;
  }
  result.unlocked = Math.min(12, result.completed.length + 1);
  result.current =
    typeof data.current === "number" &&
    Number.isInteger(data.current) &&
    data.current >= 1 &&
    data.current <= result.unlocked
      ? data.current
      : result.unlocked;
  result.percent = Math.round((result.completed.length / 12) * 100);
  return result;
}
export interface ProgressRepository {
  load(): Progress;
  save(progress: Progress): void;
  reset(): void;
}
export const localProgressRepository: ProgressRepository = {
  load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshProgress();
    try {
      return normalizeProgress(JSON.parse(raw));
    } catch {
      return freshProgress();
    }
  },
  save(p) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
export function visitPage(
  progress: Progress,
  id: number,
  page: number,
): Progress {
  if (id > progress.unlocked || page < 1 || page > pageCount(id))
    return progress;
  if (progress.visited[id]?.includes(page) && progress.lastPage[id] === page)
    return progress;
  return {
    ...progress,
    visited: {
      ...progress.visited,
      [id]: [...new Set([...(progress.visited[id] ?? []), page])],
    },
    lastPage: { ...progress.lastPage, [id]: page },
  };
}
export function completeModule(progress: Progress, id: number): Progress {
  if (
    id > progress.unlocked ||
    (progress.visited[id]?.length ?? 0) !== pageCount(id)
  )
    return progress;
  const completed = [...new Set([...progress.completed, id])].sort(
    (a, b) => a - b,
  );
  return {
    ...progress,
    completed,
    unlocked: Math.min(12, completed.length + 1),
    percent: Math.round((completed.length / 12) * 100),
  };
}
