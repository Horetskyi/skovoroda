// LIBRARY: https://www.npmjs.com/package/next-sitemap

function customIgnoreFunction(path) {
  if (path.includes('-mobile')) {
    return true; // Ignore mobile paths
  }
  return false; // Do not ignore other paths
}

function excludeList() {
  const baseList = [
    '/utils1', 
    '/website_statistics',
    '/bio-experimental',
    '/test',
  ];
  const fullList = [];
  baseList.forEach(item => {
    fullList.push(item);
    fullList.push(item + '-desktop'); 
    fullList.push(item + '-mobile'); 
  });
  return fullList;
}

const customPriorities = new Map([
  [ '/about-us', 0.6 ],
  [ '/contact', 0.2 ],
  [ '/copyright', 0.1 ],
  [ '/source', 0.9 ],
]);

const customChangefreq = new Map([
  [ '/about-us', 'monthly' ],
  [ '/contact', 'monthly' ],
  [ '/copyright', 'monthly' ],
  [ '/source', 'monthly' ],
]);

module.exports = {
  siteUrl: 'https://www.skovoroda.club',
  generateRobotsTxt: false, 
  exclude: excludeList(),
  transform: async (config, path) => {
    
    if (customIgnoreFunction(path)) return null;

    const loc = path.replace('-desktop', '');
    const priority = customPriorities.has(loc) ? customPriorities.get(loc) : config.priority;
    const changefreq = customChangefreq.has(loc) ? customChangefreq.get(loc) : config.changefreq;
    
    return {
      loc: loc, 
      changefreq: changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  }, 
  generateIndexSitemap: false,
  priority: 1,
}