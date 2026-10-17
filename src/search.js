export function matchesSearch(query, ...fields) {
  const term = query.trim().toLowerCase();
  const text = fields.filter(Boolean).join(" ").toLowerCase();
  return text.includes(term) || (
    term.startsWith("@") && term.length > 1 && text.includes(term.slice(1))
  );
}
