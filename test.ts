import { assert } from 'console'
import { searchImage, searchYoutube } from './index'
import { mkdirSync, writeFileSync } from 'fs'

async function main() {
  mkdirSync('results', { recursive: true })

  let images = await searchImage({ keyword: 'cat' })
  assert(images.length > 0, 'no images found')
  writeFileSync('results/images.json', JSON.stringify(images, null, 2))

  let videos = await searchYoutube({ keyword: 'cat' })
  assert(videos.items.length > 0, 'no videos found')
  writeFileSync('results/videos.json', JSON.stringify(videos, null, 2))
}
main().catch(e => console.error(e))
