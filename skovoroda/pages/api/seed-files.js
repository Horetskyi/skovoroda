// pages/api/seed-files.js
import { seedSkFiles } from '../../lib/database/seedSkFiles';

export default async function handler(req, res) {
  console.log('Seeding SkFiles request *1');
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    console.log('Seeding SkFiles request *2');
    const count = await seedSkFiles();
    console.log('Seeding SkFiles request *3');
    res.status(200).json({ success: true, count });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
