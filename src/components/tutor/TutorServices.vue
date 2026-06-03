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
section#services.services-section
  .container
    .services-grid
      // Title Card
      .service-card.title-card(@click="scrollToSection('signup')")
        h2.service-title-text З ЧИМ Я ДОПОМАГАЮ
        .service-arrow
          TutorIcon(name="arrow-up-right")

      // Card 1
      .service-card
        .service-card-header
          span.service-num 01
          h3.service-name ІСПИТИ
        p.service-desc-text Підготовка до іспитів та міжнародних тестів (НМТ, egzamin ósmoklasisty, SAT тощо)

      // Card 2
      .service-card
        .service-card-header
          span.service-num 02
          h3.service-name ШКОЛА
        p.service-desc-text Закриття прогалин у знаннях та впевнене засвоєння шкільної програми

      // Card 3
      .service-card
        .service-card-header
          span.service-num 03
          h3.service-name АДАПТАЦІЯ
        p.service-desc-text Допомога під час адаптації в новій школі та мовному середовищі

      // Card 4
      .service-card
        .service-card-header
          span.service-num 04
          h3.service-name КОНТРОЛЬНІ
        p.service-desc-text Підготовка до контрольних і важливих тестів без стресу та паніки

      // Card 5
      .service-card
        .service-card-header
          span.service-num 05
          h3.service-name ЛОГІКА
        p.service-desc-text Розвиток логічного мислення, системного підходу та впевненості у своїх силах
</template>

<style scoped lang="scss">
.services-section {
  padding: 60px 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-card {
  background-color: var(--color-bg-card);
  padding: 32px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(37, 99, 235, 0.2);
  }
}

.title-card {
  background-color: var(--color-primary);
  color: white;
  justify-content: space-between;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: var(--color-primary-hover);
    box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4);
  }
}

.service-title-text {
  color: white;
  font-size: 28px;
  line-height: 1.25;
}

.service-arrow {
  align-self: flex-end;
  background-color: rgba(255, 255, 255, 0.15);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  transition: transform var(--transition-fast);
  font-size: 20px;
}

.title-card:hover .service-arrow {
  transform: translate(3px, -3px) scale(1.05);
  background-color: rgba(255, 255, 255, 0.25);
}

.service-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.service-num {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
}

.service-name {
  font-size: 20px;
  text-transform: uppercase;
}

.service-desc-text {
  font-size: 15px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
