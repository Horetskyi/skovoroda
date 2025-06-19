
export function dbFileNameToExtension(fileName) {
  if (!fileName || !fileName.length) {
    return '';
  }
  const extMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);
  const fileExtension = (extMatch && extMatch.length >= 2 && extMatch[1]) ? extMatch[1].toLowerCase() : '';
  return fileExtension;
}

export function dbGetRequestIpAddress(req) {
  
  if (!req) {
    return null;
  }

  try {
    if (req.headers && req.headers['x-forwarded-for']) {
      const x = req.headers['x-forwarded-for'];
      const ip1 = x?.split(',')[0]?.trim();
      if (ip1 && ip1.length) {
        return ip1;
      }
    }
  } catch(error) {
    console.warn('Error parsing x-forwarded-for header:', error);
  }
  
  try {
    return req.socket?.remoteAddress || req.connection?.remoteAddress || null;
  } catch (error) {
    console.warn('Error parsing request headers:', error);
  }
  
  return null;
}