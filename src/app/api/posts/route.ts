import { NextResponse } from 'next/server';
import { queryDb } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { password, slug, title, excerpt, content, image_url, alt_text } = await req.json();

    // Verify admin password
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!slug || !title || !excerpt || !content || !image_url || !alt_text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const query = `
      INSERT INTO blog_posts (slug, title, excerpt, content, image_url, alt_text)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (slug) DO UPDATE SET 
        title = $2, excerpt = $3, content = $4, image_url = $5, alt_text = $6
    `;
    const values = [slug, title, excerpt, content, image_url, alt_text];
    
    await queryDb(query, values);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}