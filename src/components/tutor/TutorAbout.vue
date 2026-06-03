<script setup lang="ts">
import aboutImg from '../../assets/about.jpg'
</script>

<template lang="pug">
section#about.about-section
  .container
    .about-container-card
      h2.about-main-title Про мене
      
      .about-grid
        .about-photo-wrapper
          img.about-tutor-img(:src="aboutImg", alt="Соня")
        
        .about-speech-bubbles
          .speech-bubble
            p Привіт! Мене звати #[span.highlight-inline Соня], і я #[span.highlight-inline допомагаю] дітям #[span.highlight-inline полюбити] математику та повірити в себе, навіть якщо зараз вони думають, що це «не їх предмет».
          .speech-bubble
            p Зараз здобуваю ступінь магістра за спеціальністю #[span.highlight-inline «Середня освіта (математика)»].
          .speech-bubble
            p #[span.highlight-inline Моя мета] - допомогти дитині відчути, що математика може бути зрозумілою, цікавою і навіть улюбленою дисципліною.
</template>

<style scoped lang="scss">
.about-section {
  padding: 40px 0;
}

.about-container-card {
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--radius-xl);
  padding: 48px;
  box-shadow: var(--shadow-xl);
}

.about-main-title {
  color: white;
  font-size: 36px;
  margin-bottom: 32px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.about-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 48px;
  align-items: center;
}

.about-photo-wrapper {
  width: 100%;
  height: 420px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.about-tutor-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about-speech-bubbles {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.speech-bubble {
  background-color: white;
  color: var(--color-text-dark);
  padding: 24px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  font-size: 16px;
  line-height: 1.55;
  border-bottom-left-radius: 4px;

  p {
    margin: 0;
  }
}

.speech-bubble:nth-child(even) {
  border-bottom-left-radius: var(--radius-md);
  border-bottom-right-radius: 4px;
}

.highlight-inline {
  color: var(--color-primary);
  font-weight: 700;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 280px 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .about-photo-wrapper {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .about-container-card {
    padding: 24px 16px;
  }

  .about-main-title {
    font-size: 28px;
    margin-bottom: 24px;
  }
}
</style>
