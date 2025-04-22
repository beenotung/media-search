let youtubeSearchAPI = require('youtube-search-api')

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

export async function searchYoutubeNextPage(options: {
  nextPage: YoutubeSearchResult['nextPage']
  playlist?: boolean
  limit?: number
}): Promise<YoutubeSearchResult> {
  let results = await youtubeSearchAPI.NextPage(
    options.nextPage,
    options.playlist,
    options.limit,
  )
  return results
}
