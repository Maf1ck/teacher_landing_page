export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://mathsofi.com'
export const SITE_NAME = 'MATH_SOFI'

export const defaultSeo = {
  title: 'Репетитор з математики | Підготовка до НМТ та міжнародних іспитів',
  description:
    'Онлайн-репетитор з математики для учнів 7–11 класів. Підготовка до НМТ, SAT, Abitur та адаптація за кордоном. Безкоштовна консультація 30 хв.',
  ogImage: `${SITE_URL}/og-image.webp`,
  locale: 'uk_UA',
} as const

export const mathToolsSeo = {
  title: 'Математичні калькулятори | MATH_SOFI — репетитор з математики',
  description:
    'Безкоштовні онлайн-калькулятори: квадратні рівняння, відсотки, тригонометрія, графіки та довідник формул. Інструменти для підготовки до НМТ.',
} as const

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Соня',
      alternateName: 'Sofia',
      jobTitle: 'Репетитор з математики',
      description:
        'Репетитор з математики з досвідом 5+ років. Підготовка до НМТ, міжнародних іспитів та адаптація учнів за кордоном.',
      url: SITE_URL,
      image: `${SITE_URL}/hero.webp`,
      sameAs: [
        'https://t.me/sofimath',
        'https://instagram.com/math_sofi',
        'https://tiktok.com/@math_sofi',
      ],
      knowsAbout: ['Математика', 'НМТ', 'SAT', 'Abitur', 'Шкільна програма'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: defaultSeo.description,
      inLanguage: 'uk',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: SITE_URL,
      description: defaultSeo.description,
      provider: { '@id': `${SITE_URL}/#person` },
      areaServed: ['Україна', 'Польща', 'Німеччина', 'США'],
      serviceType: 'Репетиторство з математики',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        url: 'https://t.me/sofimath',
        availableLanguage: ['Ukrainian', 'English'],
      },
    },
  ],
}
