import { readFileSync } from 'fs'

export type DuckDuckGoImageSearchResult = {
  /** e.g. `i.js?q=react%20typescript&o=json&p=1&s=100&u=bing&l=us-en` */
  next: string
  query: string
  queryEncoded: string
  response_type: 'images'
  results: {
    /** e.g. 'https://example.com/cover-image.png' */
    image: string
    width: number
    height: number
    /** e.g. 'https://example.com/my-blog' */
    url: string
    /** e.g. 'React and Typescript: Getting Started' */
    title: string
    /** e.g. 'https://bing.net/the-token?pid=Api' */
    thumbnail: string
    /** e.g. 'Bing' */
    source: string
    image_token: string
    thumbnail_token: string
  }[]
}

// reference https://github.com/KshitijMhatre/duckduckgo-images-api
export async function searchDuckDuckGoImage(options: {
  keyword: string
  // TODO test if it is starting from 1 or zero
  /** starting from 1, default: `1` */
  page?: number
}): Promise<DuckDuckGoImageSearchResult> {
  let page = options.page || 1
  let params = new URLSearchParams({ q: options.keyword })
  // e.g. `https://duckduckgo.com/?q={keyword}`
  let url = `https://duckduckgo.com/?${params}`
  let res = await fetch(url)
  let html = await res.text()
  let token = parseToken(html)
  let lang = parseLang(html)

  params = new URLSearchParams({
    o: 'json',
    q: options.keyword,
    l: lang,
    vqd: token,
    p: page.toString(),
  })
  // e.g. `https://duckduckgo.com/i.js?o=json&q={keyword}&l=us-en&vqd={token}&p={page}`
  url = `https://duckduckgo.com/i.js?${params}`
  res = await fetch(url)
  let json = await res.json()
  return json
}

export async function searchDuckDuckGoImageNextPage(options: {
  next: DuckDuckGoImageSearchResult['next']
}) {
  let url = options.next
  if (url.startsWith('i.js?')) {
    url = `https://duckduckgo.com/${url}`
  }
  if (!url.startsWith('https://')) {
    throw new Error(`invalid url: "${url}" for next page`)
  }
  let res = await fetch(url)
  let json = await res.json()
  return json
}

function parseToken(html: string) {
  let pattern = '&vqd='
  let index = html.indexOf(pattern)
  if (index == -1)
    throw new Error(
      `failed to locate start of token pattern "${pattern}" in html response`,
    )
  let start = index + pattern.length
  let end = html.indexOf('&', start)
  if (end == -1)
    throw new Error(
      `failed to locate end of token pattern "&" in html response`,
    )
  let token = html.slice(start, end)
  if (!token) throw new Error(`empty token in html response`)
  let complete = !html.includes(`,vqd="${token}"`)
  if (!complete) console.warn(`warning: token may be incomplete`)
  return token
}

function parseLang(html: string) {
  let pattern = '&l='
  let index = html.indexOf(pattern)
  if (index == -1)
    throw new Error(
      `failed to locate start of language pattern "${pattern}" in html response`,
    )
  let start = index + pattern.length
  let end = html.indexOf('&', start)
  if (end == -1)
    throw new Error(
      `failed to locate end of language pattern "&" in html response`,
    )
  let lang = html.slice(start, end)
  return lang
}

function test() {
  let html = readFileSync('results/ddg.html', 'utf-8')
  let token = parseToken(html)
  let lang = parseLang(html)
  console.log({ token, lang })
}
// test()
