<script setup lang="ts">
import heroImg from '../../assets/hero.png'
import TutorIcon from './TutorIcon.vue'

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template lang="pug">
section#hero.hero-section
  .container.hero-grid
    .hero-content.fade-in
      h1.hero-title РЕПЕТИТОР З #[span.highlight-blue МАТЕМАТИКИ]
      p.hero-desc Працюю з учнями з України, Польщі, Німеччини та США. Знаю як важко розібратися в новій шкільній програмі, коли ще не до кінця розумієш мову або коли вчорашня «п'ятірка» різко перетворюється на тривожні оцінки.
      .hero-cta-group
        button.btn.btn-primary(@click="scrollToSection('consultation')") Безкоштовна консультація #[TutorIcon(name="arrow-right")]
        button.btn.btn-secondary(@click="scrollToSection('services')") Мої послуги

    .hero-image-wrapper
      .hero-image-circle
        img.tutor-hero-img(:src="heroImg", alt="Софія — Репетитор з математики")
      
      .badge.badge-1
        .badge-icon-box
          TutorIcon(name="graduation")
        div
          p.badge-title ПІДГОТОВКА ДО #[strong ІСПИТІВ] ТА #[strong МІЖНАРОДНИХ] ТЕСТІВ
      
      .badge.badge-2
        .badge-icon-box
          TutorIcon(name="users")
        div
          p.badge-title РОБОТА З УЧНЯМИ #[strong 7-11] КЛАСІВ
      
      .badge.badge-3
        .badge-icon-box
          TutorIcon(name="lightning")
        div
          p.badge-title ДОСВІД РОБОТИ #[strong.color-blue 5+ РОКІВ]
</template>

<style scoped lang="scss">
.hero-section {
  padding: 60px 0;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.hero-title {
  font-size: 52px;
  line-height: 1.15;
  margin-bottom: 24px;
  letter-spacing: -1px;
}

.hero-desc {
  font-size: 18px;
  color: var(--color-text-muted);
  margin-bottom: 36px;
  max-width: 580px;
}

.hero-cta-group {
  display: flex;
  gap: 16px;
}

/*
  --cr = circle radius (половина ширини кола).
  Бейджі позиціонуються через calc(50% ± --cr),
  тому вони ЗАВЖДИ прив'язані до краю кола,
  незалежно від розміру екрану.
*/
.hero-image-wrapper {
  --cr: 220px; /* половина від 440px (desktop) */

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 540px;
}

.hero-image-circle {
  width: calc(var(--cr) * 2);
  height: calc(var(--cr) * 2);
  border-radius: 50%;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tutor-hero-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top center;
}

/* Floating Badges — позиціонуються відносно wrapper */
.badge {
  position: absolute;
  background-color: var(--color-bg-card);
  padding: 12px 18px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 10;
  max-width: 240px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  /* Щоб текст ніколи не переходив на картинку */
  pointer-events: none;
}

/* Уніфікований розмір кола іконки — однаковий у всіх бейджів */
.badge-icon-box {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.badge-title {
  font-size: 12px;
  color: var(--color-text-dark);
  line-height: 1.35;
  margin: 0;

  strong {
    font-weight: 700;
    color: var(--color-primary);
  }
}

/*
  Формула:
  - Лівий бейдж: left: max(0px, calc(50% - var(--cr) - ширина_бейджа))
    → починається лівіше кола, max(0px) не дає вийти за wrapper
  - Правий бейдж: left: min(calc(100% - 200px), calc(50% + var(--cr) - 30px))
    → починається правіше кола, min() не дає вийти за правий край wrapper
*/
.badge-1 {
  top: 10%;
  left: max(0px, calc(50% - var(--cr) - 160px));
  max-width: 210px;
}

.badge-2 {
  top: 42%;
  /* Прив'язаний до ПРАВОГО краю кола: 30px overlap на синьому фоні */
  left: min(calc(100% - 200px), calc(50% + var(--cr) - 30px));
  max-width: 220px;
}

.badge-3 {
  bottom: 10%;
  left: max(0px, calc(50% - var(--cr) - 120px));
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
  pointer-events: auto;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-text-light);
  box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.3);

  &:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px 0 rgba(37, 99, 235, 0.4);
  }
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);

  &:hover {
    background-color: var(--color-primary-light);
    transform: translateY(-2px);
  }
}

@media (max-width: 1150px) {
  .hero-title {
    font-size: 44px;
  }

  .hero-image-wrapper {
    --cr: 165px; /* 330px / 2 */
    height: 440px;
  }
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 38px;
  }

  .hero-image-wrapper {
    --cr: 135px; /* 270px / 2 */
    height: 390px;
  }

  .badge {
    padding: 8px 12px;
  }

  .badge-1 {
    left: max(0px, calc(50% - var(--cr) - 130px));
    max-width: 170px;
  }

  .badge-2 {
    left: min(calc(100% - 165px), calc(50% + var(--cr) - 20px));
    max-width: 175px;
  }

  .badge-3 {
    left: max(0px, calc(50% - var(--cr) - 95px));
    max-width: 170px;
  }
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }

  .hero-desc {
    margin: 0 auto 36px;
  }

  .hero-cta-group {
    justify-content: center;
  }

  .hero-image-wrapper {
    --cr: 145px; /* 290px / 2 */
    order: -1;
    height: 410px;
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
  }

  .badge {
    padding: 8px 12px;
  }

  .badge-1 {
    left: max(0px, calc(50% - var(--cr) - 130px));
    max-width: 175px;
  }

  .badge-2 {
    left: min(calc(100% - 170px), calc(50% + var(--cr) - 20px));
    max-width: 180px;
  }

  .badge-3 {
    left: max(0px, calc(50% - var(--cr) - 100px));
    max-width: 175px;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-cta-group {
    flex-direction: column;
    width: 100%;

    .btn {
      width: 100%;
    }
  }

  .hero-image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    gap: 12px;
    padding-bottom: 12px;
  }

  .hero-image-circle {
    position: relative;
    width: 220px;
    height: 220px;
    top: auto;
    left: auto;
    transform: none;
    margin-bottom: 8px;
  }

  .badge {
    position: static !important;
    max-width: 100% !important;
    width: 100% !important;
    transform: none !important;
    box-shadow: var(--shadow-sm);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 14px;
    text-align: left;
  }

  .badge-icon-box {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    font-size: 16px;
  }

  .badge-title {
    font-size: 12px;
  }
}
</style>
