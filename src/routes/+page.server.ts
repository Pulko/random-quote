import type { PageServerLoad } from './$types';

export type QuoteType = {
    _id: string
    content: string
    author: string
    tags: Array<string>
    authorSlug: string
    length: number
    dateAdded: string
    dateModified: string
}
 
export const load: PageServerLoad = async () => {
  const response = await fetch("https://api.quotable.io/random")
  const data: QuoteType = await response.json()

  return { data }
}