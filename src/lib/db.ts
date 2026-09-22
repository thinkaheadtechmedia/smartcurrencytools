import { Pool } from 'pg';

export interface RateAlert {
  id: number;
  email: string;
  from_currency: string;
  to_currency: string;
  target_rate: string;
  direction: string;
  is_triggered: boolean;
  created_at: Date;
}

export interface DbBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  alt_text: string;
  date: Date;
}

// In-memory fallback data store for AI Studio container environment
const globalForDb = globalThis as unknown as {
  mockAlerts?: RateAlert[];
  mockPosts?: DbBlogPost[];
  dbPool?: Pool | null;
  dbPoolInitialized?: boolean;
};

if (!globalForDb.mockAlerts) {
  globalForDb.mockAlerts = [];
}
if (!globalForDb.mockPosts) {
  globalForDb.mockPosts = [];
}

function isValidDatabaseUrl(urlStr: string | undefined): boolean {
  if (!urlStr || typeof urlStr !== 'string') return false;
  const trimmed = urlStr.trim();
  if (
    !trimmed ||
    trimmed.includes('[') ||
    trimmed.includes(']') ||
    trimmed.includes('<') ||
    trimmed.includes('>') ||
    trimmed.includes('YOUR-PASSWORD') ||
    trimmed.includes('PROJECT-REF') ||
    trimmed.includes('POOLER-HOST')
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'postgres:' || parsed.protocol === 'postgresql:';
  } catch {
    return false;
  }
}

export function getDbPool(): Pool | null {
  if (globalForDb.dbPoolInitialized) {
    return globalForDb.dbPool ?? null;
  }
  globalForDb.dbPoolInitialized = true;

  if (isValidDatabaseUrl(process.env.DATABASE_URL)) {
    try {
      globalForDb.dbPool = new Pool({ connectionString: process.env.DATABASE_URL!.trim() });
    } catch {
      globalForDb.dbPool = null;
    }
  } else {
    globalForDb.dbPool = null;
  }
  return globalForDb.dbPool ?? null;
}

export async function queryDb<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<{ rows: T[] }> {
  const pool = getDbPool();
  if (pool) {
    try {
      const res = await pool.query(sql, params as (string | number | boolean | null | undefined)[]);
      return res as unknown as { rows: T[] };
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('Invalid URL')) {
        globalForDb.dbPool = null;
      } else {
        console.warn('[SmartCurrencyTools] Database query failed — falling back to in-memory store:', err instanceof Error ? err.message : err);
      }
    }
  }

  // In-memory mock handler for supported queries
  const cleanSql = sql.trim().toLowerCase();

  // Blog posts queries
  if (cleanSql.includes('select * from blog_posts where slug =')) {
    const slug = params[0];
    const post = globalForDb.mockPosts?.find(p => p.slug === slug);
    return { rows: post ? ([post] as unknown as T[]) : [] };
  }

  if (cleanSql.includes('select * from blog_posts order by date desc') || cleanSql.includes('select * from blog_posts')) {
    const list = [...(globalForDb.mockPosts || [])].sort((a, b) => b.date.getTime() - a.date.getTime());
    return { rows: list as unknown as T[] };
  }

  if (cleanSql.includes('insert into blog_posts')) {
    const [slug, title, excerpt, content, image_url, alt_text] = params as string[];
    const existingIndex = (globalForDb.mockPosts || []).findIndex(p => p.slug === slug);
    const postRecord: DbBlogPost = {
      id: existingIndex >= 0 ? globalForDb.mockPosts![existingIndex].id : Date.now(),
      slug,
      title,
      excerpt,
      content,
      image_url,
      alt_text,
      date: new Date()
    };
    if (existingIndex >= 0) {
      globalForDb.mockPosts![existingIndex] = postRecord;
    } else {
      globalForDb.mockPosts!.push(postRecord);
    }
    return { rows: [postRecord] as unknown as T[] };
  }

  // Rate alerts queries
  if (cleanSql.includes('insert into rate_alerts')) {
    const [email, from, to, target, direction] = params as [string, string, string, string | number, string];
    const alertRecord: RateAlert = {
      id: Date.now(),
      email,
      from_currency: from,
      to_currency: to,
      target_rate: String(target),
      direction,
      is_triggered: false,
      created_at: new Date()
    };
    globalForDb.mockAlerts!.push(alertRecord);
    return { rows: [alertRecord] as unknown as T[] };
  }

  if (cleanSql.includes('select * from rate_alerts where is_triggered = false')) {
    const pending = (globalForDb.mockAlerts || []).filter(a => !a.is_triggered);
    return { rows: pending as unknown as T[] };
  }

  if (cleanSql.includes('update rate_alerts set is_triggered = true where id =')) {
    const id = params[0];
    const target = (globalForDb.mockAlerts || []).find(a => a.id === id);
    if (target) {
      target.is_triggered = true;
    }
    return { rows: [] };
  }

  return { rows: [] };
}
