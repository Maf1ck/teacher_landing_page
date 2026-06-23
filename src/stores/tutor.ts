import { defineStore } from 'pinia'
import type { CaseStudy, Review, ContactForm, ContactFormErrors } from '../types/tutor'

export const useTutorStore = defineStore('tutor', {
  state: () => ({
    currentPage: 'landing' as 'landing' | 'math-quadratic' | 'math-percentage' | 'math-trig-circle' | 'math-right-triangle' | 'math-graph-plotter' | 'math-formulas',
    isMobileMenuOpen: false,
    activeCase: 0,
    activeReview: 0,
    isSubmitting: false,
    isSubmitted: false,
    
    // Cases Data
    cases: [
      {
        name: 'Марія',
        age: '11 клас',
        goal: 'Підготовка до НМТ',
        startScore: '115 балів',
        endScore: '192 бали',
        duration: '6 місяців',
        text: 'Соня допомогла мені розібратися зі складними темами з тригонометрії та комбінаторики, які в школі пояснювали занадто складно. Заняття проходили у дуже дружній атмосфері, без стресу. Результат перевершив мої очікування — 192 бали на НМТ та вступ на бюджет!',
        badge: 'НМТ 190+'
      },
      {
        name: 'Тимофій',
        age: '8 клас',
        goal: 'Підтягнути оцінки та шкільну програму',
        startScore: '5 балів',
        endScore: '10 балів',
        duration: '3 місяці',
        text: 'У Тимофія були серйозні прогалини з алгебри після дистанційного навчання. Соня знайшла підхід до сина з першого заняття. Замість сухої теорії вони вирішували цікаві задачі та розбирали логіку кожного правила. Оцінки в школі виросли з 5 до 10 балів!',
        badge: 'Шкільна програма'
      },
      {
        name: 'Олексій',
        age: '9 клас',
        goal: 'Адаптація до школи в Польщі (Egzamin ósmoklasisty)',
        startScore: 'Початківець',
        endScore: '88% успішності',
        duration: '4 місяці',
        text: 'Переїхали до Польщі, і син дуже хвилювався через різницю у термінології та мовний бар\'єр. Соня допомогла адаптуватися до польських вимог з математики, розібрала всі специфічні завдання іспиту ósmoklasisty. Олексій склав іспит дуже впевнено.',
        badge: 'Міжнародні тести'
      }
    ] as CaseStudy[],

    // Reviews Data
    reviews: [
      {
        author: 'Мама Марії',
        text: 'З математики 184, я дуже тобі вдячна. Більшість що було знала як робити завдяки тобі й нашій роботі ❤️',
        subText: 'Підготовка до НМТ'
      },
      {
        author: 'Ірина (учениця)',
        text: 'Дякую тобі, за твої уроки я завжди ходила із задоволенням! Ти найкраща вчителька математики!',
        subText: 'Шкільний курс'
      },
      {
        author: 'Тимофій',
        text: 'Тимофію дуже сподобалось. Сказав, що дуже гарно пояснюєте і нарешті все стало зрозуміло.',
        subText: '8 клас'
      },
      {
        author: 'Мама Анастасії',
        text: 'Софіє, дуже дякуємо за допомогу з адаптацією в німецькій школі. Настя отримала відмінно за контрольний тест!',
        subText: 'Адаптація за кордоном'
      }
    ] as Review[],

    // Form data
    form: {
      name: '',
      contact: '',
      grade: '',
      goal: '',
      comment: ''
    } as ContactForm,

    // Form validation errors
    errors: {
      name: '',
      contact: ''
    } as ContactFormErrors,

    // Form submission error
    submitError: ''
  }),

  actions: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },

    setCase(index: number) {
      this.activeCase = index
    },

    setReview(index: number) {
      this.activeReview = index
    },

    nextReview() {
      this.activeReview = (this.activeReview + 1) % this.reviews.length
    },

    prevReview() {
      this.activeReview = (this.activeReview - 1 + this.reviews.length) % this.reviews.length
    },

    validateForm(): boolean {
      let isValid = true
      this.errors.name = ''
      this.errors.contact = ''
      this.submitError = ''

      if (!this.form.name.trim()) {
        this.errors.name = 'Будь ласка, вкажіть ваше ім\'я'
        isValid = false
      }

      if (!this.form.contact.trim()) {
        this.errors.contact = 'Вкажіть номер телефону або Telegram нік'
        isValid = false
      }

      return isValid
    },

    async submitForm() {
      if (!this.validateForm()) return

      this.isSubmitting = true
      this.submitError = ''
      
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await fetch(`${apiUrl}/api/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Не вдалося надіслати заявку.')
        }

        this.isSubmitted = true
        
        // Reset form inputs
        this.form = {
          name: '',
          contact: '',
          grade: '',
          goal: '',
          comment: ''
        }
      } catch (error: any) {
        console.error('Submission error:', error)
        this.submitError = error.message || 'Не вдалося надіслати заявку. Перевірте з\'єднання або спробуйте пізніше.'
      } finally {
        this.isSubmitting = false
      }
    },

    closeSuccessMessage() {
      this.isSubmitted = false
    },

    setCurrentPage(page: 'landing' | 'math-quadratic' | 'math-percentage' | 'math-trig-circle' | 'math-right-triangle' | 'math-graph-plotter' | 'math-formulas') {
      this.currentPage = page
      // Reset scroll on view change
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }
})
