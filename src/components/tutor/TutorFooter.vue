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
.footer-wrapper
  .footer-ticker-wrap
    .ticker-container
      .ticker-track
        .ticker-item Сайт було створено для успішного навчання та якісної підготовки до іспитів. Розробник tg: @zxcmaf1ck
        .ticker-item Сайт було створено для успішного навчання та якісної підготовки до іспитів. Розробник tg: @zxcmaf1ck
        .ticker-item Сайт було створено для успішного навчання та якісної підготовки до іспитів. Розробник tg: @zxcmaf1ck
        .ticker-item Сайт було створено для успішного навчання та якісної підготовки до іспитів. Розробник tg: @zxcmaf1ck
  footer.footer
    .container.footer-grid
      .footer-left
        p.footer-logo MATH_SOFI
        p.footer-author Репетитор: #[strong Соня] · 5+ років досвіду
        p.footer-social-title Мої соцмережі:
        .social-links-group
          a.social-link-item(href="https://t.me/sofimath", target="_blank", rel="noopener noreferrer")
            TutorIcon(name="telegram")
            span Telegram: @sofimath
          a.social-link-item(href="https://instagram.com/math_sofi", target="_blank", rel="noopener noreferrer")
            TutorIcon(name="instagram")
            span Instagram: @math_sofi
          a.social-link-item(href="https://tiktok.com/@math_sofi", target="_blank", rel="noopener noreferrer")
            TutorIcon(name="tiktok")
            span TikTok: @math_sofi

      .footer-right
        .footer-links-row
          .footer-nav
            p.footer-nav-title Навігація
            a(href="#about", @click.prevent="scrollToSection('about')") Про мене
            a(href="#services", @click.prevent="scrollToSection('services')") З чим допомагаю
            a(href="#cases", @click.prevent="scrollToSection('cases')") Кейси
            a(href="#reviews", @click.prevent="scrollToSection('reviews')") Відгуки
            a(href="#consultation", @click.prevent="scrollToSection('consultation')") Консультація
          .footer-legal
            p.footer-nav-title Юридична інформація
            a(href="/privacy.html") Політика конфіденційності
            a(href="/terms.html") Умови користування
        p.copyright-text © 2026 MATH_SOFI. Всі права захищено.
</template>

<style scoped lang="scss">
.footer-wrapper {
  margin-top: auto;
  width: 100%;
}

.footer-ticker-wrap {
  background-color: var(--color-primary-dark);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  overflow: hidden;
  padding: 8px 0;
}

.ticker-container {
  width: 100%;
  overflow: hidden;
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 25s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

.ticker-item {
  font-size: 13px;
  font-weight: 500;
  color: #f8fafc;
  padding: 0 40px;
  white-space: nowrap;
}

@keyframes marquee-scroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-25%, 0, 0);
  }
}

.footer {
  background-color: var(--color-primary);
  color: white;
  padding: 60px 0 30px;
  border-top: none;
}

.footer-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.footer-left {
  min-width: 0;
}

.footer-right {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.footer-links-row {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.footer-nav,
.footer-legal {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-nav-title {
  font-size: 16px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 8px;
}

.footer-nav a,
.footer-legal a {
  font-size: 14px;
  color: #f1f5f9;
  min-height: 44px;
  display: flex;
  align-items: center;
  width: 100%;
  transition: color var(--transition-fast);

  &:hover {
    text-decoration: underline;
    color: white;
  }
}

.copyright-text {
  font-size: 13px;
  color: #cbd5e1;
  margin: 0;
}

@media (min-width: 769px) {
  .footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px 60px;
    align-items: start;
  }

  .footer-right {
    align-items: flex-end;
    text-align: right;
  }

  .footer-links-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    width: 100%;
  }

  .footer-nav,
  .footer-legal {
    align-items: flex-end;
  }

  .footer-nav a,
  .footer-legal a {
    width: auto;
    justify-content: flex-end;
  }

  .copyright-text {
    text-align: right;
    width: 100%;
  }
}

.footer-logo {
  color: white;
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 12px;
}

.footer-author {
  font-size: 15px;
  color: #e2e8f0;
  margin-bottom: 20px;

  strong {
    font-weight: 700;
    color: white;
  }
}

.footer-social-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #e2e8f0;
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
  color: #f1f5f9;
  min-height: 44px;
  transition: color var(--transition-fast);

  &:hover {
    color: white;
    text-decoration: underline;
  }
}
</style>
