export function formatUsage(usage: number | null) {
  if (usage === null) return '';
  if (usage < 1024) {
    return `${usage.toFixed(1)} MB`;
  }
  return `${(usage / 1024).toFixed(1)} GB`;
}
