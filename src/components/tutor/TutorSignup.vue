<script setup lang="ts">
import { useTutorStore } from '../../stores/tutor'
import TutorIcon from './TutorIcon.vue'

const store = useTutorStore()
</script>

<template lang="pug">
section#signup.signup-section
  .container
    .signup-card
      h2.signup-title Записатись
      p.signup-subtitle Заповни форму, а я тобі напишу

      form.signup-form(@submit.prevent="store.submitForm")
        // Name Input
        .form-group
          label(for="name") Ваше ім'я #[span.required *]
          input(
            type="text"
            id="name"
            v-model="store.form.name"
            placeholder="Введіть ваше ім'я"
            :class="{ 'input-error': store.errors.name }"
          )
          span.error-msg(v-if="store.errors.name") {{ store.errors.name }}

        // Contact Input
        .form-group
          label(for="contact") Телефон або Telegram нік #[span.required *]
          input(
            type="text"
            id="contact"
            v-model="store.form.contact"
            placeholder="@username або +380..."
            :class="{ 'input-error': store.errors.contact }"
          )
          span.error-msg(v-if="store.errors.contact") {{ store.errors.contact }}

        // Grade Select
        .form-group
          label(for="grade") Клас / Вік дитини
          select(id="grade" v-model="store.form.grade")
            option(value="" disabled selected) Оберіть варіант
            option(value="1-4") Молодша школа (1-4 класи)
            option(value="5-9") Середня школа (5-9 класи)
            option(value="10-11") Старша школа (10-11 класи)
            option(value="student") Студент / Дорослий

        // Goal Select
        .form-group
          label(for="goal") Мета навчання
          select(id="goal" v-model="store.form.goal")
            option(value="" disabled selected) Оберіть мету занять
            option(value="exams") Підготовка до іспитів (НМТ, ЗНО, SAT)
            option(value="school") Підтягнути шкільну програму
            option(value="adaptation") Адаптація за кордоном
            option(value="olympiad") Олімпіадна математика / Логіка

        // Comment Input
        .form-group
          label(for="comment") Додатковий коментар (необов'язково)
          textarea(
            id="comment"
            v-model="store.form.comment"
            rows="3"
            placeholder="Розкажіть трохи про ваші побажання або рівень знань..."
          )

        // Submit Button
        button.btn.btn-primary.btn-submit(type="submit", :disabled="store.isSubmitting")
          span.spinner(v-if="store.isSubmitting")
          span(v-else) Надіслати заявку #[TutorIcon(name="arrow-right")]

        // Submit Error Message
        span.error-msg.text-center(v-if="store.submitError") {{ store.submitError }}

      // Success Modal Overlay
      .success-overlay(v-if="store.isSubmitted")
        .success-card
          .success-icon-box
            TutorIcon(name="check")
          h3 Заявку надіслано!
          p Дякую за звернення! Я зв'яжуся з вами у найближчий час через вказані контакти для узгодження часу консультації.
          button.btn.btn-primary(@click="store.closeSuccessMessage") Зрозуміло
</template>

<style scoped lang="scss">
.signup-section {
  padding: 80px 0;
  background-color: #f8fafc;
}

.signup-card {
  max-width: 650px;
  margin: 0 auto;
  background-color: var(--color-primary);
  color: white;
  padding: 56px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  position: relative;
}

.signup-title {
  color: white;
  font-size: 36px;
  margin-bottom: 8px;
  text-align: center;
}

.signup-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  text-align: center;
  margin-bottom: 40px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 500;
  }
}

.required {
  color: #fca5a5;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 15px;
  transition: all var(--transition-fast);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: white;
    background-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
}

.form-group select option {
  background-color: var(--color-primary);
  color: white;
}

.input-error {
  border-color: #f87171 !important;
  background-color: rgba(239, 68, 68, 0.1) !important;
}

.error-msg {
  font-size: 12px;
  color: #fca5a5;

  &.text-center {
    text-align: center;
    font-size: 14px;
    margin-top: 4px;
    font-weight: 500;
  }
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

.btn-submit {
  background-color: white;
  color: var(--color-primary);
  margin-top: 12px;
  padding: 14px;
  font-size: 17px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f1f5f9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
}

/* Success Overlay */
.success-overlay {
  position: absolute;
  inset: 0;
  background-color: var(--color-primary);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  z-index: 20;
  animation: fadeIn 0.3s ease-out forwards;
}

.success-card {
  text-align: center;
  color: white;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  h3 {
    font-size: 28px;
    color: white;
    margin: 0;
  }

  p {
    font-size: 15px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }

  .btn {
    background-color: white;
    color: var(--color-primary);
    margin-top: 8px;
    width: 100%;

    &:hover {
      background-color: #f1f5f9;
    }
  }
}

.success-icon-box {
  width: 72px;
  height: 72px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  font-size: 36px;
  color: white;
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(37, 99, 235, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .signup-card {
    padding: 32px 20px;
  }
}
</style>
