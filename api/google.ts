import gis from 'async-g-i-s'

export type ImageSearchResult = {
  /** e.g. 'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg' */
  url: string
  /** e.g. 1667 */
  height: number
  /** e.g. 2500 */
  width: number
}[]

export async function searchImage(options: {
  keyword: string
}): Promise<ImageSearchResult> {
  let results = await gis(options.keyword)
  return results
}
