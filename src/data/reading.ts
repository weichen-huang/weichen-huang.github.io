import entries from './reading.json'

export interface ReadingEntry {
  title: string
  author?: string
  kind: 'Book' | 'Film'
  status: 'To read' | 'Reading' | 'Read' | 'To watch' | 'Watched'
  url?: string
  note?: string
}
// Identifiable titles from the Notion Books database; duplicate titles are merged.
export const readingList = entries as ReadingEntry[]
