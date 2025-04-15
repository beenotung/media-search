# media-search

A lightweight package for searching images and YouTube videos. Provides simple Typescript APIs to search for images using Google Images and videos using YouTube's search API.

[![npm Package Version](https://img.shields.io/npm/v/media-search)](https://www.npmjs.com/package/media-search)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/media-search)](https://bundlephobia.com/package/media-search)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/media-search)](https://bundlephobia.com/package/media-search)

## Features

- Search Google Images with simple API
- Search YouTube videos, channels, and playlists
- Typescript support
- Isomorphic package: works in Node.js and browsers

## Installation

```bash
npm install media-search
```

You can also install `media-search` with [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [slnpm](https://github.com/beenotung/slnpm)

## Usage Example

```typescript
import { searchImage, searchYoutube } from 'media-search'

// Search for images
const images = await searchImage({ keyword: 'cats' })
// Returns array of image results with URLs and dimensions

// Search YouTube
const videos = await searchYoutube({
  keyword: 'cats',
  limit: 10,
  options: [{ type: 'video' }],
})
// Returns YouTube search results with video details
```

## Typescript Signature

```typescript
export function searchImage(options: {
  keyword: string
}): Promise<ImageSearchResult>

export function searchYoutube(options: {
  keyword: string
  playlist?: boolean
  limit?: number
  options?: { type: 'video' | 'channel' | 'playlist' | 'movie' }[]
}): Promise<YoutubeSearchResult>

export type ImageSearchResult = {
  /** e.g. 'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg' */
  url: string
  /** e.g. 1667 */
  height: number
  /** e.g. 2500 */
  width: number
}[]

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
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
