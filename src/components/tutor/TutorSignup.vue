<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useTutorStore } from '../../stores/tutor'
import TutorIcon from './TutorIcon.vue'
import FormSelect from './FormSelect.vue'

const store = useTutorStore()

// Validation schema
const schema = yup.object({
  name: yup
    .string()
    .required("Будь ласка, вкажіть ваше ім'я")
    .min(2, "Ім'я має містити щонайменше 2 символи"),
  contact: yup
    .string()
    .required('Вкажіть номер телефону або Telegram нік')
    .test('phone-or-telegram', 'Вкажіть телефон (+380...) або Telegram (@нік)', (val) => {
      if (!val) return false
      return val.startsWith('@') || /^\+?\d[\d\s\-()]{6,}$/.test(val)
    }),
  grade: yup.string().optional(),
  goal: yup.string().optional(),
  country: yup.string().optional(),
  comment: yup.string().optional(),
})

const { handleSubmit, isSubmitting: formSubmitting } = useForm({ validationSchema: schema })

const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: contact, errorMessage: contactError } = useField<string>('contact')
const { value: grade } = useField<string>('grade')
const { value: goal } = useField<string>('goal')
const { value: country } = useField<string>('country')
const { value: comment } = useField<string>('comment')

const gradeOptions = [
  { value: '5-9', label: 'Середня школа (5-9 класи)' },
  { value: '10-11', label: 'Старша школа (10-11 класи)' },
  { value: 'student', label: 'Студент / Дорослий' },
]

const goalOptions = [
  { value: 'exams', label: 'Підготовка до іспитів (НМТ, ЗНО, SAT)' },
  { value: 'school', label: 'Підтягнути шкільну програму' },
  { value: 'adaptation', label: 'Адаптація за кордоном' },
  { value: 'olympiad', label: 'Олімпіадна математика / Логіка' },
]

const countryOptions = [
  { value: 'ukraine', label: 'Україна' },
  { value: 'poland', label: 'Польща' },
  { value: 'germany', label: 'Німеччина' },
  { value: 'austria', label: 'Австрія' },
  { value: 'usa', label: 'США' },
]

const onSubmit = handleSubmit(async (values) => {
  store.form.name = values.name
  store.form.contact = values.contact
  store.form.grade = values.grade || ''
  store.form.goal = values.goal || ''
  store.form.country = values.country || ''
  store.form.comment = values.comment || ''
  await store.submitForm()
})
</script>

<template lang="pug">
section#signup.signup-section
  .container
    .signup-card
      h2.signup-title Записатись
      p.signup-subtitle Заповни форму, а я тобі напишу

      form.signup-form(@submit.prevent="onSubmit")
        // Name Input
        .form-group
          label(for="name") Ваше ім'я #[span.required *]
          input(
            type="text"
            id="name"
            v-model="name"
            placeholder="Введіть ваше ім'я"
            :class="{ 'input-error': nameError }"
          )
          transition(name="err")
            span.error-msg(v-if="nameError") {{ nameError }}

        // Contact Input
        .form-group
          label(for="contact") Телефон або Telegram нік #[span.required *]
          input(
            type="text"
            id="contact"
            v-model="contact"
            placeholder="@username або +380..."
            :class="{ 'input-error': contactError }"
          )
          transition(name="err")
            span.error-msg(v-if="contactError") {{ contactError }}

        // Grade Select
        .form-group
          label Клас / Вік дитини
          FormSelect(
            v-model="grade"
            :options="gradeOptions"
            placeholder="Оберіть варіант"
            id="grade"
          )

        // Goal Select
        .form-group
          label Мета навчання
          FormSelect(
            v-model="goal"
            :options="goalOptions"
            placeholder="Оберіть мету занять"
            id="goal"
          )

        // Country Select
        .form-group
          label Програма навчання якої країни
          FormSelect(
            v-model="country"
            :options="countryOptions"
            placeholder="Оберіть країну"
            id="country"
          )

        // Comment Input
        .form-group
          label(for="comment") Додатковий коментар (необов'язково)
          textarea(
            id="comment"
            v-model="comment"
            rows="3"
            placeholder="Розкажіть трохи про ваші побажання або рівень знань..."
          )

        // Submit Button
        button.btn.btn-submit(
          type="submit"
          :disabled="store.isSubmitting || formSubmitting"
        )
          span.spinner(v-if="store.isSubmitting || formSubmitting")
          span(v-else) Надіслати заявку #[TutorIcon(name="arrow-right")]

        // Submit Error Message
        transition(name="err")
          span.error-msg.text-center(v-if="store.submitError") {{ store.submitError }}

      // Success Modal Overlay
      .success-overlay(v-if="store.isSubmitted")
        .success-card
          .success-icon-box
            TutorIcon(name="check")
          h3 Заявку надіслано!
          p Дякую за звернення! Я зв'яжуся з вами у найближчий час через вказані контакти для узгодження часу консультації.
          button.btn.btn-success-close(@click="store.closeSuccessMessage") Зрозуміло
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
    color: rgba(255, 255, 255, 0.9);
  }
}

.required {
  color: #fca5a5;
}

.form-group input,
.form-group textarea {
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background-color: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 15px;
  transition: all 0.2s ease;
  font-family: inherit;

  &::placeholder {
    color: rgba(255, 255, 255, 0.55);
  }

  &:focus {
    outline: none;
    border-color: white;
    background-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.12);
  }
}

.form-group textarea {
  resize: none;
}

.input-error {
  border-color: #f87171 !important;
  background-color: rgba(239, 68, 68, 0.12) !important;
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

/* Error transition */
.err-enter-active,
.err-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.err-enter-from,
.err-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-family: inherit;
  width: 100%;
  margin-top: 12px;
}

.btn-submit {
  background-color: white;
  color: var(--color-primary);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);

  &:hover:not(:disabled) {
    background-color: #f1f5f9;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
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
}

.btn-success-close {
  background-color: white;
  color: var(--color-primary);
  padding: 12px 32px;
  margin-top: 8px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    transform: translateY(-1px);
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
  border: 3px solid rgba(37, 99, 235, 0.25);
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
