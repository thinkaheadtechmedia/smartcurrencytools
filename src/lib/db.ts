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
};

if (!globalForDb.mockAlerts) {
  globalForDb.mockAlerts = [];
}
if (!globalForDb.mockPosts) {
  globalForDb.mockPosts = [];
}

let pgPool: Pool | null = null;
if (process.env.DATABASE_URL) {
  try {
    pgPool = new Pool({ connectionString: process.env.DATABASE_URL });
  } catch (err) {
    console.warn('[AI Studio] PostgreSQL pool failed to initialize — falling back to mock DB', err);
    pgPool = null;
  }
}

export function getDbPool(): Pool | null {
  return pgPool;
}

export async function queryDb<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<{ rows: T[] }> {
  if (process.env.DATABASE_URL && pgPool) {
    try {
      const res = await pgPool.query(sql, params as (string | number | boolean | null | undefined)[]);
      return res as unknown as { rows: T[] };
    } catch (err) {
      console.warn('[AI Studio] Database query failed — falling back to in-memory store:', err);
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
