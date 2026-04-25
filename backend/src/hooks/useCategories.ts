// // backend/src/hooks/useCategories.ts
// "use client";

// import { useState, useEffect } from "react";

// interface Category {
//   id: number;
//   name: string;
//   description?: string;
//   _count?: {
//     menus: number;
//   };
// }

// export function useCategories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch("/api/categories");
//         if (!response.ok) throw new Error("Failed to fetch");
//         const data = await response.json();
//         setCategories(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCategories();
//   }, []);

//   return { categories, loading, error };
// }
