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
div
  // Top Banner Quote
  .banner-quote
    .container
      p.quote-text Я не просто пояснюю теми, а вчу дитину #[span.highlight-white мислити] в математиці, #[span.highlight-white розуміти], як будувати рішення, і #[span.highlight-white не боятися] помилятися.

  // Consultation Section
  section#consultation.consultation-section
    .watermark-bg КОНСУЛЬТАЦІЯ
    .container.relative-z
      h2.section-title.text-center КОНСУЛЬТАЦІЯ
      p.section-subtitle.text-center Ваша дитина губиться в математиці, і Ви не знаєте, з чого почати? Почнімо з простого — з розуміння ситуації, тому я пропоную #[span.highlight-underline(@click="scrollToSection('signup')") безкоштовну консультацію].

      h3.sub-section-title.text-center ЗА 30-35 ХВИЛИН МИ:
      .consultation-grid
        .consult-card
          .consult-icon-box
            TutorIcon(name="chat")
          p.consult-card-text #[span.highlight-blue-inline Знайомимось] у спокійному, приємному форматі
        
        .consult-card
          .consult-icon-box
            TutorIcon(name="search")
          p.consult-card-text Проводимо коротку #[span.highlight-blue-inline діагностику] рівня знань
        
        .consult-card
          .consult-icon-box
            TutorIcon(name="lightbulb")
          p.consult-card-text #[span.highlight-blue-inline Розбираємо] одну з тем, яка зараз "просідає" або викликає труднощі

      h3.sub-section-title.text-center ПІСЛЯ ЗУСТРІЧІ ВИ ЧІТКО ЗРОЗУМІЄТЕ:
      .results-pills
        .result-pill На якому рівні дитина зараз
        .result-pill З чого варто почати
        .result-pill Як далі рухатись, щоб навчання дало результат, а не просто "години занять"

      .text-center.cta-consult-container
        button.btn.btn-primary.btn-large(@click="scrollToSection('signup')") Записатись на консультацію #[TutorIcon(name="arrow-right")]
</template>

<style scoped lang="scss">
/* Banner Quote */
.banner-quote {
  background-color: var(--color-primary);
  color: white;
  padding: 48px 0;
  text-align: center;
}

.quote-text {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.5;
  max-width: 900px;
  margin: 0 auto;
}

.highlight-white {
  color: white;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Consultation Section */
.consultation-section {
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.watermark-bg {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 120px;
  font-weight: 900;
  color: rgba(37, 99, 235, 0.035);
  user-select: none;
  pointer-events: none;
  font-family: var(--font-heading);
  white-space: nowrap;
}

.section-title {
  font-size: 36px;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: var(--color-text-muted);
  max-width: 800px;
  margin: 0 auto 48px;
}

.highlight-underline {
  cursor: pointer;
  font-weight: 700;
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}
.highlight-underline:hover {
  color: var(--color-primary-hover);
  border-bottom: 2px solid var(--color-primary-hover);
}

.sub-section-title {
  font-size: 16px;
  letter-spacing: 1.5px;
  color: var(--color-text-muted);
  margin-bottom: 28px;
  text-transform: uppercase;
}

.consultation-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-bottom: 56px;
}

.consult-card {
  background-color: var(--color-bg-card);
  padding: 32px 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(226, 232, 240, 0.8);
  text-align: center;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: rgba(37, 99, 235, 0.15);
  }
}

.consult-icon-box {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.consult-card-text {
  font-size: 16px;
  color: var(--color-text-dark);
  line-height: 1.5;
}

.highlight-blue-inline {
  color: var(--color-primary);
  font-weight: 700;
}

.results-pills {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto 48px;
}

.result-pill {
  background-color: var(--color-bg-card);
  color: var(--color-text-dark);
  padding: 16px 28px;
  border-radius: 50px;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(226, 232, 240, 0.8);
  text-align: center;
  width: 100%;
}

.cta-consult-container {
  margin-top: 24px;
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

.btn-large {
  padding: 16px 36px;
  font-size: 18px;
}

@media (max-width: 768px) {
  .consultation-grid {
    grid-template-columns: 1fr;
  }

  .watermark-bg {
    font-size: 70px;
  }

  .section-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .result-pill {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 20px;
  }

  .quote-text {
    font-size: 18px;
  }
  
  .btn-large {
    width: 100%;
    font-size: 16px;
    padding: 14px 20px;
  }
}
</style>
