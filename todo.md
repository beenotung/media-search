## bing image search

`https://www.bing.com/images/vsasync?q={keyword}`

## duckduckgo image search

reference https://github.com/KshitijMhatre/duckduckgo-images-api

1. goto `https://duckduckgo.com/?q={keyword}`
2. get the token from html `&vqd=...` or `vqd="..."`
3. goto `https://duckduckgo.com/i.js?o=json&q={keyword}&l=us-en&vqd={token}&p={page}`
