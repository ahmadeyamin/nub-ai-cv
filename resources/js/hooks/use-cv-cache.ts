import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'nub_cv_cache';
const CACHE_TTL_DAYS = 7;

export interface CvProfile {
    name: string;
    email: string;
    phone: string;
    skills: string[];
    experience: string[];
    education: string[];
    summary: string;
    resume_path: string;
}

interface CvCacheEntry {
    profile: CvProfile;
    cachedAt: string; // ISO date string
}

function readCache(): CvCacheEntry | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        const entry: CvCacheEntry = JSON.parse(raw);
        const cachedAt = new Date(entry.cachedAt);
        const now = new Date();
        const diffDays = (now.getTime() - cachedAt.getTime()) / (1000 * 60 * 60 * 24);

        if (diffDays > CACHE_TTL_DAYS) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }

        return entry;
    } catch {
        return null;
    }
}

export function useCvCache() {
    const [entry, setEntry] = useState<CvCacheEntry | null>(null);

    // Load from localStorage on mount (client-side only)
    useEffect(() => {
        setEntry(readCache());
    }, []);

    const setCache = useCallback((profile: CvProfile) => {
        const newEntry: CvCacheEntry = {
            profile,
            cachedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntry));
        setEntry(newEntry);
    }, []);

    const clearCache = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setEntry(null);
    }, []);

    return {
        /** The parsed CV profile, or null if not cached / expired */
        profile: entry?.profile ?? null,
        /** The server-side file path stored within the profile */
        resumePath: entry?.profile?.resume_path ?? null,
        /** Whether a valid (non-expired) cached CV exists */
        hasCache: entry !== null,
        /** Persist a parsed profile to cache */
        setCache,
        /** Remove the cached CV */
        clearCache,
        /** ISO string of when the cache was last set */
        cachedAt: entry?.cachedAt ?? null,
    };
}
