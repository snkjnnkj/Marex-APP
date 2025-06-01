import { createApp } from 'vue'
import PhotoViewer from '@/composables/PhotoViewer/PhotoViewer.vue'
import { move } from '@/utils/static.js'

export function ShowPhotoViewer(res, onClick) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp(PhotoViewer, {
    res,
    onClick(move) {
      move()
      onClick(() => {
        app.unmount()
        div.remove()
      })
    },
  })
  app.mount(div)
}
