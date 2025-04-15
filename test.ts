import { assert } from 'console'
import { searchImage, searchYoutube } from './index'

async function main() {
  let images = await searchImage({ keyword: 'cat' })
  assert(images.length > 0, 'no images found')

  let videos = await searchYoutube({ keyword: 'cat' })
  assert(videos.items.length > 0, 'no videos found')
}
main().catch(e => console.error(e))
