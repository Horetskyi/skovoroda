import clientPromise from '../../lib/database/mongodb';

function group(list, groupByKey) {
  const map = {};
  list.forEach(item => {
    const keyValue = item[groupByKey] || 'Other';
    if (!map[keyValue]) {
      map[keyValue] = 0;
    }
    map[keyValue]++;
  });
  const aggregated = {
    labels: Object.keys(map),
    counts: Object.values(map),
  };
  return aggregated;
}

function groupByDay(list, dateKey) {
  const map = {};
  let minDate = null;
  let maxDate = null;
  list.forEach(item => {
    if (!item[dateKey]) return;
    const date = new Date(item[dateKey]);
    const dateStr = date.toISOString().slice(0, 10);
    if (!map[dateStr]) map[dateStr] = 0;
    map[dateStr]++;
    if (!minDate || date < minDate) minDate = date;
    if (!maxDate || date > maxDate) maxDate = date;
  });
  if (!minDate || !maxDate) return { labels: [], counts: [] };
  // Fill gaps between minDate and maxDate
  const labels = [];
  const counts = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    labels.push(dateStr);
    counts.push(map[dateStr] || 0);
  }
  return { labels, counts };
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const downloads = await db.collection('SkFileDownloads').find({}).toArray();
    const files = await db.collection('SkFiles').find({}).toArray();

    downloads.forEach(download => {
      const file = files.find(f => f._id.toString() === download.fileId.toString());
      if (file) {
        download.fileName = file.fileName;
        download.fileExtension = file.fileExtension;
      }
    });

    const downloadsByTextId = group(downloads, 'textId');
    const downloadsByFileName = group(downloads, 'fileName');
    const downloadsByFileExtension = group(downloads, 'fileExtension');
    const downloadsByDevice = group(downloads, 'device');
    const downloadsByDay = groupByDay(downloads, 'timestamp');

    res.status(200).json({ 
      downloadsByTextId,
      downloadsByFileName,
      downloadsByFileExtension,
      downloadsByDevice,
      downloadsByDay,
    });
    
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
