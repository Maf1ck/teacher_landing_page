import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const hero = sharp('src/assets/hero.png')
const about = sharp('src/assets/about.jpg')

const tasks = [
  hero.clone().resize(400).webp({ quality: 80 }).toFile('public/hero-400.webp'),
  hero.clone().resize(800).webp({ quality: 82 }).toFile('public/hero-800.webp'),
  hero
    .clone()
    .resize(1200, 630, { fit: 'cover', position: 'top' })
    .webp({ quality: 85 })
    .toFile('public/og-image.webp'),
  about.clone().resize(400).webp({ quality: 80 }).toFile('public/about-400.webp'),
  about.clone().resize(700).webp({ quality: 82 }).toFile('public/about-700.webp'),
  // Legacy paths kept for backwards compatibility
  hero.clone().resize(800).webp({ quality: 82 }).toFile('public/hero.webp'),
  about.clone().resize(700).webp({ quality: 82 }).toFile('public/about.webp'),
]

await mkdir('public', { recursive: true })
await Promise.all(tasks)
console.log('Images optimized: hero-400/800, about-400/700, og-image')
