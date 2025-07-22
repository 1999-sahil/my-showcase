// types.ts

export interface Stats {
  totalPosts: number;
  drafts: number;
  published: number;
  totalViews: number;
  aiGenerated: number;
  totalProjects: number;
  draftProjects: number;
  publishedProjects: number;
  totalNotes: number;
  draftNotes: number;
  publishedNotes: number;
}

export interface TopPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  author: string; // or an Author object if populated
  isDraft: boolean;
  generatedByAI: boolean;
  createdAt: string; // or Date, depending on how you handle it
  updatedAt: string;
  views: number;
}


export interface TopProject {
  _id: string;
  coverImageUrl: string;
  projectName: string;
  liveUrl: string;
  repoUrl: string;
  techStack: string[];
}

export interface TagUsage {
  count: number;
  name: string;
  tag: string;
}

export interface TechUsageProject {
  count: number;
  technology: string;
}

export interface Category {
  name?: string;
  slug?: string;
}

export interface CategoryUsageNote {
  _id: string;
  count: number;
  category: Category;
}

export interface DashboardData {
  stats: Stats;
  topPosts: TopPost[];
  topProjects: TopProject[];
  tagUsage: TagUsage[];
  techUsageProjects: TechUsageProject[];
  categoryUsageNotes: CategoryUsageNote[];
}
