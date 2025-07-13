export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/profile"
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image"  // /uploads
    },
    DASHBOARD: {
        GET_DASHBOARD_DATA: "/api/dashboard-summary"
    },
    AI: {
        GENERATE_BLOG_POST: "/api/ai/generate",
        GENERATE_BLOG_POST_IDEAS: "/api/ai/generate-ideas",
        GENERATE_POST_SUMMARY: "/api/ai/generate-summary"
    },
    BLOG_POSTS: {
        CREATE: "/api/blogs/posts",
        GET_ALL: "/api/blogs/posts",
        GET_TRENDING_POSTS: "/api/blogs/posts/trending",
        GET_BY_SLUG: (slug: string) => `/api/blogs/posts/slug/${slug}`,
        UPDATE: (id: string) => `/api/blogs/posts/${id}`,
        DELETE: (id: string) => `/api/blogs/posts/${id}`,
        GET_BY_TAG: (tag: string) => `/api/blogs/posts/tag/${tag}`,
        SEARCH: "/api/blogs/posts/search",
        INCREMENT_VIEW: (id: string) => `/api/blogs/posts/${id}/view`,
    },
    PROJECTS: {
        CREATE: "/api/projects",
        GET_ALL: "/api/projects",
        GET_TRENDING_PROJECTS: "/api/projects/trending",
        UPDATE: (id: string) => `/api/projects/${id}`,
        DELETE: (id: string) => `/api/projects/${id}`,
        GET_BY_SLUG: (slug: string) => `/api/projects/slug/${slug}`,
        GET_BY_TAG: (tag: string) => `/api/projects/tag/${tag}`,
        SEARCH: "/api/projects/search",
        INCREMENT_VIEW: (id: string) => `/api/projects/${id}/view`
    },
    NOTES: {
        CREATE: "/api/notes",
        GET_ALL: "/api/notes",
        UPDATE: (id: string) => `/api/notes/${id}`,
        DELETE: (id: string) => `/api/notes/${id}`
    }
};