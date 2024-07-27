export function toTitleCase(str) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function toSnakeCase(str) {
  return str.toLowerCase().replace(/ /g, '_');
}