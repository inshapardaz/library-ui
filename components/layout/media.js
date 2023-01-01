import { createMedia } from '@artsy/fresnel'

const media = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

// Generate CSS to be injected into the head
export const mediaStyle = media.createMediaStyle()
export const { Media, MediaContextProvider } = media