<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTutorStore } from '../../stores/tutor'
import TutorIcon from './TutorIcon.vue'

const store = useTutorStore()

const TRUNCATE_CHARS = 140
const expandedReviews = ref<Set<number>>(new Set())

const isLongReview = (text: string) => text.length > TRUNCATE_CHARS

const isExpanded = (index: number) => expandedReviews.value.has(index)

const toggleExpand = (index: number) => {
  const next = new Set(expandedReviews.value)
  if (next.has(index)) {
    next.delete(index)
  } else {
    next.add(index)
  }
  expandedReviews.value = next
}

watch(
  () => store.activeReview,
  () => {
    expandedReviews.value = new Set()
  },
)
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
          .review-body
            p.review-text-content(
              :class="{ collapsed: isLongReview(review.text) && !isExpanded(index), expanded: isLongReview(review.text) && isExpanded(index) }"
            ) {{ review.text }}
            button.read-more-btn(
              v-if="isLongReview(review.text)"
              type="button"
              @click="toggleExpand(index)"
            ) {{ isExpanded(index) ? 'Згорнути' : 'Читати далі' }}
          .review-author-info
            p.review-author-name {{ review.author }}
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
  position: relative;
  flex: 1;
  width: 100%;
  min-height: 280px;
}

.review-slide-card {
  background-color: var(--color-bg-card);
  padding: 40px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  min-height: 280px;
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

.review-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}

.review-text-content {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-dark);
  font-style: italic;
  margin: 0;
  min-height: 6.4em;

  &.collapsed {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 6.4em;
  }

  &.expanded {
    min-height: 0;
  }
}

.read-more-btn {
  align-self: flex-start;
  margin-top: 10px;
  padding: 0;
  border: none;
  background: none;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  flex-shrink: 0;

  &:hover {
    color: var(--color-primary-hover);
  }
}

.review-author-info {
  flex-shrink: 0;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.review-author-name {
  font-size: 16px;
  font-weight: 700;
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
  flex-wrap: nowrap;
  gap: 2px;
  max-width: 100%;
  margin: 16px auto 0;
  overflow: hidden;
}

.dot-btn {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #94a3b8;
    transition: all var(--transition-fast);
  }

  &.active-dot::after {
    background-color: var(--color-primary);
    width: 18px;
    height: 8px;
    border-radius: 4px;
  }
}

@media (max-width: 768px) {
  .carousel-outer-wrapper {
    gap: 8px;
    margin-left: 0;
    margin-right: 0;
  }

  .carousel-inner-container,
  .review-slide-card {
    min-height: 240px;
  }

  .carousel-control-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .carousel-dots {
    gap: 2px;
    padding: 0;
  }

  .dot-btn {
    width: 24px;
    height: 24px;
  }

  .review-slide-card {
    padding: 24px;
  }

  .review-text-content {
    font-size: 15px;
    min-height: 4.8em;

    &.collapsed {
      -webkit-line-clamp: 3;
      min-height: 4.8em;
    }
  }

  .section-title {
    font-size: 28px;
  }
}
</style>
