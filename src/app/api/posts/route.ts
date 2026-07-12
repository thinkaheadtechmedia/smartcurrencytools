import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function POST(req: Request) {
  try {
    const { password, slug, title, excerpt, content, image_url, alt_text } = await req.json();

    // Verify admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!slug || !title || !excerpt || !content || !image_url || !alt_text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const query = `
      INSERT INTO blog_posts (slug, title, excerpt, content, image_url, alt_text)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (slug) DO UPDATE SET 
        title = $2, excerpt = $3, content = $4, image_url = $5, alt_text = $6
    `;
    const values = [slug, title, excerpt, content, image_url, alt_text];
    
    await pool.query(query, values);
    await pool.end();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}