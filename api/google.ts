import gis from 'async-g-i-s'
import { array, int, object, url } from 'cast.ts'

export type GoogleImageSearchResult = {
  /** e.g. 'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg' */
  url: string
  /** e.g. 1667 */
  height: number
  /** e.g. 2500 */
  width: number
}[]

let parser = array(
  object({
    url: url(),
    height: int(),
    width: int(),
  }),
)

export async function searchGoogleImage(options: {
  keyword: string
}): Promise<GoogleImageSearchResult> {
  let results = await gis(options.keyword)
  return parser.parse(results)
}
