import { getTreatisesListSchemaOrg } from "./treatisesListSchema";

export function getSchemaByPageKey(pageKey) {
  if (!pageKey) return null;
  if (pageKey.pageKey) pageKey = pageKey.pageKey;
  if (!pageKey) return null;
  const schemaString = getSchemaByPageKeyInner(pageKey);
  if (!schemaString) return null;
  return JSON.stringify(schemaString);
}

function getSchemaByPageKeyInner(pageKey) {
  if (!pageKey) return null;
  switch (pageKey) {
    case 'Treatise': return getTreatisesListSchemaOrg();
    default: return null;
  }
}