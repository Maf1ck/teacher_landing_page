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
          p.badge-title РОБОТА З УЧНЯМИ  ДО #[strong 7-11] КЛАСІВ
      
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

.hero-image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 540px;
}

.hero-image-circle {
  width: 440px;
  height: 440px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tutor-hero-img {
  width: auto;
  height: 100%;
  object-fit: contain;
  object-position: top center;
}

/* Floating Badges */
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
  max-width: 250px;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.badge-icon-box {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
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

.badge-1 {
  top: 15%;
  left: -10%;
  max-width: 200px;
}

.badge-2 {
  right: -5%;
  top: 40%;
}

.badge-3 {
  bottom: 12%;
  left: 2%;
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

@media (max-width: 1024px) {
  .hero-title {
    font-size: 40px;
  }

  .hero-image-circle {
    width: 360px;
    height: 360px;
  }

  .hero-image-wrapper {
    height: 460px;
  }

  .badge-1 {
    left: -2%;
  }

  .badge-2 {
    right: -2%;
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
    order: -1;
    height: 360px;
    width: 100%;
    max-width: 440px;
    margin: 0 auto;
  }

  .badge-1 {
    top: 10%;
    left: 0;
  }

  .badge-2 {
    right: 0;
    top: 40%;
  }

  .badge-3 {
    bottom: 5%;
    left: 8px;
  }
}

@media (max-width: 480px) {
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

  .hero-image-circle {
    width: 300px;
    height: 300px;
  }

  .hero-image-wrapper {
    height: 380px;
    max-width: 380px;
  }

  .badge {
    padding: 8px 12px;
    max-width: 135px;
  }

  .badge-icon-box {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .badge-title {
    font-size: 10px;
  }

  .badge-1 {
    top: 5%;
    left: -8px;
  }

  .badge-2 {
    right: -8px;
    top: 40%;
  }

  .badge-3 {
    bottom: 5%;
    left: 0;
  }
}
</style>
