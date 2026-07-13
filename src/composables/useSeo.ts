import { watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { defaultSeo, mathToolsSeo, SITE_URL } from '../config/seo'

type SeoMeta = {
  title: string
  description: string
  path?: string
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = url
}

export function applySeo(meta: SeoMeta) {
  const path = meta.path ?? '/'
  const url = `${SITE_URL}${path === '/' ? '' : path}`

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', url)
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setCanonical(url)
}

export function useSeo(_page?: () => string) {
  const route = useRoute()

  const update = () => {
    const isTools = route.path.startsWith('/calculators')
    if (isTools) {
      applySeo({
        title: mathToolsSeo.title,
        description: mathToolsSeo.description,
        path: route.path,
      })
    } else {
      applySeo({ title: defaultSeo.title, description: defaultSeo.description, path: '/' })
    }
  }

  onMounted(update)
  watch(() => route.path, update)
}
