
export function prepareFables(fables) {
  const set = new Set();
  const result = fables.filter(fable => {
    const key = fable.fableNumber; // distinct by fableNumber
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
  set.clear();
  result.sort((a,b) => a.fableNumber - b.fableNumber); // sort by fableNumber
  return result;
}