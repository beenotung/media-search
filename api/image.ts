import { searchBingImage } from './bing'
import {
  DuckDuckGoImageSearchResult,
  searchDuckDuckGoImage,
  searchDuckDuckGoImageNextPage,
} from './duckduckgo'
import { searchGoogleImage } from './google'

export type ImageSearchResult = {
  /** direct url of the image */
  url: string
  height?: number
  width?: number
  thumbnail?: string
  /** website url of the page containing the image */
  site?: string
  /** website title */
  title?: string
}[]

type OnImageResult = 'more' | void

export function searchImage(options: {
  keyword: string
  /** for bing image search */
  region?: 'www' | 'cn'
  onImages(images: ImageSearchResult): OnImageResult | Promise<OnImageResult>
  onError(error: unknown): void
}) {
  let { onImages, onError } = options

  searchGoogleImage(options)
    .then(results =>
      onImages(
        results.map(result => ({
          url: result.url,
          width: result.width,
          height: result.height,
        })),
      ),
    )
    .catch(onError)

  searchBingImage(options)
    .then(json =>
      onImages(
        json.results.map(result => ({
          url: result.imageUrl,
          site: result.sourceUrl,
        })),
      ),
    )
    .catch(onError)

  function onDuckDuckGoImageSearchResult(result: DuckDuckGoImageSearchResult) {
    let res = onImages(
      result.results.map(result => ({
        url: result.image,
        width: result.width,
        height: result.height,
        site: result.url,
        title: result.title,
        thumbnail: result.thumbnail,
      })),
    )
    Promise.resolve(res)
      .catch(onError)
      .then(more => {
        if (more == 'more') {
          searchDuckDuckGoImageNextPage(result)
            .then(onDuckDuckGoImageSearchResult)
            .catch(onError)
        }
      })
  }

  searchDuckDuckGoImage(options)
    .then(onDuckDuckGoImageSearchResult)
    .catch(onError)
}

export async function* searchImageIter(options: {
  keyword: string
  /** for bing image search */
  region?: 'www' | 'cn'
}): AsyncGenerator<ImageSearchResult> {}
