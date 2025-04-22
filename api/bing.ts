import { array, object, string, url } from 'cast.ts'

export type BingSearchResult = {
  results: {
    imageUrl: string
    sourceUrl: string
    /** e.g. 'www.example.com', without 'https://' part */
    sourceDomain: string
  }[]
}

let parser = object({
  results: array(
    object({
      imageUrl: url(),
      sourceUrl: url(),
      sourceDomain: string(),
    }),
  ),
})

export async function searchBing(options: {
  keyword: string
  /** default: 'www' */
  region?: 'www' | 'cn'
}): Promise<BingSearchResult> {
  let region = options.region || 'www'
  let params = new URLSearchParams({ q: options.keyword })
  // e.g. `https://www.bing.com/images/vsasync?q={keyword}`
  // e.g. `https://cn.bing.com/images/vsasync?q={keyword}`
  let url = `https://${region}.bing.com/images/vsasync?${params}`
  let res = await fetch(url)
  let json = await res.json()
  return parser.parse(json)
}
