<script setup lang="ts">
import { useTutorStore } from '../../stores/tutor'
import TutorIcon from './TutorIcon.vue'

const store = useTutorStore()
</script>

<template lang="pug">
section#reviews.reviews-section
  .container
    h2.section-title.text-center Відгуки
    p.section-subtitle.text-center Що говорять учні та їхні батьки про заняття

    .carousel-outer-wrapper
      button.carousel-control-btn.prev(@click="store.prevReview", aria-label="Попередній відгук")
        TutorIcon(name="chevron-left")
      
      .carousel-inner-container
        .review-slide-card(
          v-for="(review, index) in store.reviews"
          :key="index"
          v-show="store.activeReview === index"
        )
          .quote-decorator “
          p.review-text-content {{ review.text }}
          .review-author-info
            h4.review-author-name {{ review.author }}
            p.review-author-meta {{ review.subText }}

      button.carousel-control-btn.next(@click="store.nextReview", aria-label="Наступний відгук")
        TutorIcon(name="chevron-right")

    .carousel-dots
      button.dot-btn(
        v-for="(_, index) in store.reviews"
        :key="index"
        :class="{ 'active-dot': store.activeReview === index }"
        @click="store.setReview(index)"
        :aria-label="'Слайд ' + (index + 1)"
      )
</template>

<style scoped lang="scss">
.reviews-section {
  padding: 80px 0;
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

.carousel-outer-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  max-width: 900px;
  margin: 40px auto 24px;
}

.carousel-inner-container {
  flex: 1;
  min-height: 220px;
  display: flex;
  align-items: center;
}

.review-slide-card {
  background-color: var(--color-bg-card);
  padding: 40px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(226, 232, 240, 0.8);
  width: 100%;
  position: relative;
  animation: fadeIn 0.4s ease-out;
}

.quote-decorator {
  position: absolute;
  top: 10px;
  left: 24px;
  font-size: 80px;
  line-height: 1;
  color: rgba(37, 99, 235, 0.08);
  font-family: Georgia, serif;
  user-select: none;
}

.review-text-content {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-dark);
  font-style: italic;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
}

.review-author-name {
  font-size: 16px;
  margin-bottom: 2px;
}

.review-author-meta {
  font-size: 13px;
  color: var(--color-text-muted);
}

.carousel-control-btn {
  background-color: var(--color-bg-card);
  border: 1px solid rgba(226, 232, 240, 0.8);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  color: var(--color-primary);
  flex-shrink: 0;
  font-size: 20px;

  &:hover {
    background-color: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.dot-btn {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: #cbd5e1;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;

  &.active-dot {
    background-color: var(--color-primary);
    width: 24px;
    border-radius: 5px;
  }
}

@media (max-width: 768px) {
  .carousel-outer-wrapper {
    gap: 12px;
  }

  .carousel-control-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .review-slide-card {
    padding: 24px;
  }

  .review-text-content {
    font-size: 15px;
  }

  .section-title {
    font-size: 28px;
  }
}
</style>
