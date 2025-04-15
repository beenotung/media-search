import gis from 'async-g-i-s'
let youtubeSearchAPI = require('youtube-search-api')

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

export type YoutubeSearchResult = {
  items: {
    /** e.g. 'aZ9-35Gmt5k' */
    id: string
    type: 'video' | 'channel' | 'playlist' | 'movie'
    thumbnail: {
      thumbnails: {
        url: string
        width: number
        height: number
      }[]
    }
    title: string
    /** e.g. 'Birder King' */
    channelTitle: string
    shortBylineText: {
      runs: {
        /** e.g. 'Birder King' */
        text: string
        navigationEndpoint: {
          commandMetadata: {
            webCommandMetadata: {
              /** e.g. '/@BirderKing' */
              url: string
              /** e.g. 'WEB_PAGE_TYPE_CHANNEL' */
              webPageType: string
              /** e.g. '/youtubei/v1/browse' */
              apiUrl: string
            }
          }
        }
      }[]
    }
    /** empty string if is live */
    length:
      | ''
      | {
          accessibility: {
            accessibilityData: {
              /** e.g. '15 分鐘' */
              label: string
            }
          }
          /** e.g. '15:00' */
          simpleText: string
        }
    isLive: boolean
  }[]
  nextPage: {
    nextPageToken: string
    nextPageContext: {
      context: {
        client: {
          /** e.g. 'zh-HK' */
          hl: string
          /** e.g. 'HK' */
          gl: string
        }
      }
      continuation: string
    }
  }
}

export async function searchYoutube(options: {
  keyword: string
  playlist?: boolean
  limit?: number
  options?: { type: 'video' | 'channel' | 'playlist' | 'movie' }[]
}): Promise<YoutubeSearchResult> {
  // youtubeSearchAPI.GetListByKeyword("<keywords>",[playlist boolean],[limit number],[options JSONArray])
  // {items:[],nextPage:{nextPageToken:"xxxxxxxx",nextPageContext:{}}}
  let results = await youtubeSearchAPI.GetListByKeyword(
    options.keyword,
    options.playlist,
    options.limit,
    options.options,
  )
  return results
}
