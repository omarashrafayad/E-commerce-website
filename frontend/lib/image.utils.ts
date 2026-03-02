// import { BASE_URL } from "./constants";

// export function getImageUrl(path: string | null | undefined): string | null {
//     if (!path) return null;

//     if (path.startsWith("http") || path.startsWith("data:")) {
//         return path;
//     }

//     const cleanPath = path.startsWith("/") ? path : `/${path}`;
//     const finalPath = cleanPath.startsWith("/uploads") ? cleanPath : `/uploads${cleanPath}`;
//     return `${BASE_URL}${finalPath}`;
// }

// export function getImageUrls(
//     paths: (string | null | undefined)[]
// ): string[] {
//     return paths
//         .map(getImageUrl)
//         .filter((url): url is string => url !== null);
// }
