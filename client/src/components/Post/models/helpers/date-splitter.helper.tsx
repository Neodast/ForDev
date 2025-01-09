export function dataSplitterHelper(date: Date) {
  return new Date(date).toLocaleString().split(':').slice(0, 2).join(':');
}
