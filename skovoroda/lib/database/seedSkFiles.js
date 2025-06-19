// lib/seedSkFiles.js
import clientPromise from './mongodb';
import { readAllTreatises } from '../dataReaders/treatisesReader';
import { dbFileNameToExtension } from './databaseShared';

export async function seedSkFiles() {
  const client = await clientPromise;
  const db = client.db();
  const treatises = readAllTreatises({ excludeContent: true });
  const files = [];
  for (const t of treatises) {
    if (Array.isArray(t.versions)) {
      for (const version of t.versions) {
        if (Array.isArray(version.fileNames)) {
          for (const fileName of version.fileNames) {
            const fileExtension = dbFileNameToExtension(fileName);
            files.push({
              fileName,
              fileExtension,
              textId: t.urlId,
            });
          }
        }
      }
    }
  }
  for (const file of files) {
    const exists = await db.collection('SkFiles').findOne({ fileName: file.fileName, fileExtension: file.fileExtension, textId: file.textId });
    if (!exists) {
      await db.collection('SkFiles').insertOne(file);
    }
  }
  return files.length;
}
