export function matchesSearch(query, ...fields) {
  const term = query.trim().toLowerCase();
  return fields.filter(Boolean).join(" ").toLowerCase().includes(term);
}
