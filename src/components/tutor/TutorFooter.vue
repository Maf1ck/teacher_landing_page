<script setup lang="ts">
import TutorIcon from './TutorIcon.vue'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template lang="pug">
footer.footer
  .container.footer-grid
    .footer-left
      h3.footer-logo MATH_SOFI
      p.footer-social-title Мої соцмережі:
      .social-links-group
        a.social-link-item(href="https://t.me/sofimath", target="_blank")
          TutorIcon(name="telegram")
          span Telegram: @sofimath
        a.social-link-item(href="https://instagram.com/math_sofi", target="_blank")
          TutorIcon(name="instagram")
          span Instagram: @math_sofi
        a.social-link-item(href="https://tiktok.com/@math_sofi", target="_blank")
          TutorIcon(name="tiktok")
          span TikTok: @math_sofi

    .footer-right
      .footer-nav
        h4 Навігація
        a(href="#about", @click.prevent="scrollToSection('about')") Про мене
        a(href="#services", @click.prevent="scrollToSection('services')") З чим допомагаю
        a(href="#cases", @click.prevent="scrollToSection('cases')") Кейси
        a(href="#reviews", @click.prevent="scrollToSection('reviews')") Відгуки
      p.copyright-text © 2026 MATH_SOFI. Всі права захищено.
</template>

<style scoped lang="scss">
.footer {
  background-color: var(--color-primary);
  color: white;
  padding: 60px 0 30px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.footer-logo {
  color: white;
  font-size: 28px;
  margin-bottom: 24px;
}

.footer-social-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.85);
}

.social-links-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-link-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  transition: color var(--transition-fast);

  &:hover {
    color: white;
    text-decoration: underline;
  }
}

.footer-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;

  h4 {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 6px;
  }

  a {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);

    &:hover {
      text-decoration: underline;
    }
  }
}

.copyright-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 30px;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-right {
    align-items: flex-start;
  }

  .footer-nav {
    align-items: flex-start;
  }

  .copyright-text {
    margin-top: 20px;
  }
}
</style>
