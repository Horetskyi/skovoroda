import { dbFileNameToExtension, dbGetRequestIpAddress } from '../../lib/database/databaseShared';
import clientPromise from '../../lib/database/mongodb';

export default async function handler(req, res) {

  // VALIDATION {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { fileName, device, textId } = req.body;
  if (!fileName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // VALIDATION }
  
  const fileExtension = dbFileNameToExtension(fileName);

  try {
    const client = await clientPromise;
    const db = client.db();

    // GET OR CREATE FILE {
    let file = await db.collection('SkFiles').findOne({ fileName, fileExtension, textId });
    if (!file) {
      const insertResult = await db.collection('SkFiles').insertOne({ fileName, fileExtension, textId });
      file = { ...req.body, id: insertResult.insertedId };
    }
    // GET OR CREATE FILE }

    // SAVE {
    const ip = dbGetRequestIpAddress(req);
    const downloadDoc = {
      fileId: file._id || file.id,
      fileExtension,
      textId,
      device: device || null,
      userAgent: req.headers['user-agent'] || null,
      ip: ip,
      timestamp: new Date(),
    };
    const result = await db.collection('SkFileDownloads').insertOne(downloadDoc);
    // SAVE }

    res.status(200).json({ success: true, downloadId: result.insertedId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
