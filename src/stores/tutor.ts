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
        age: '9 клас',
        goal: 'Підготувала до контрольної роботи',
        startScore: 'Початківець',
        endScore: 'Високий',
        duration: '6 місяців',
        text: 'Спасибо вам большое, очень приятно.Я с каждым годом убеждаюсь что выбрала правильного преподавателя, который со мной на одной волне. До начала наших занятий я боялась урока математика К вам на уроки я всегда иду с удовольствием, так как объясните вы, не объяснял не один преподаватель в школе (а школы я меняла три:)',
        badge: 'Контрольна робота'
      },
      {
        name: 'Тимофій',
        age: '11 клас',
        goal: 'Підготовка до вступу в університет за кордоном',
        startScore: 'Початківець',
        endScore: 'Високий',
        duration: '6 місяців',
        text: 'Привіт, я вступила до університету у Польщі на ІТ зайняла перше місце в рейтингу (я максимальний бал отримала)',
        badge: 'Вступ за кордон'
      },
      {
        name: 'Софія',
        age: '11 клас',
        goal: 'Підготовка до НМТ',
        startScore: 'Початківець',
        endScore: '150 бали',
        duration: '1 рік',
        text: 'Дякую, і за прохідний бал по математиці, а то не було б і мінімального балу в школі',
        badge: 'НМТ'
      },
      {
        name: 'Софія',
        age: '11 клас',
        goal: 'Підготовка до НМТ',
        startScore: 'Початківець',
        endScore: '150 бали',
        duration: '1 рік',
        text: 'Дякую, і за прохідний бал по математиці, а то не було б і мінімального балу в школі',
        badge: 'НМТ'
      },
      // New Cases Added
      {
        name: 'Тимофій',
        age: '11 клас',
        goal: 'Підготовка до НМТ',
        startScore: 'Початківець',
        endScore: '150 балів',
        duration: '8 місяців',
        text: 'Тільки додому приїхав, написав математику на 150, варіант не те щоб складний але були завдання тип яких дуже рідко зустрічався на пробних нмт минулих років, то я їх не зовсім розумів, з параметрами завдання навіть не встиг почати, а так результатом задоволений в принципі, дякую вам за допомогу!',
        badge: 'НМТ'
      },
      {
        name: 'Анна',
        age: '11 клас',
        goal: 'Підготовка до НМТ',
        startScore: '120 балів',
        endScore: '184 бали',
        duration: '1 рік',
        text: 'З математики 184, я дуже тобі вдячна. Більшість що було знала як робити завдяки тобі й нашій роботі!',
        badge: 'НМТ'
      },
      {
        name: 'Ріта',
        age: '1 курс коледжу',
        goal: 'Підготовка до іспитів',
        startScore: '110 балів',
        endScore: '178 балів',
        duration: '6 місяців',
        text: 'Добрий день, прийшли результати з математики, у мене 178 балів. Я дуже рада. Майже у всіх кого я запитую досить низькі результати вийшли. Дякую, без вас я б геометрію взагалі не вирішила))',
        badge: 'Коледж'
      },
      {
        name: 'Михайло',
        age: '2-й курс польського технікуму',
        goal: 'Підготовка до вступу та адаптація',
        startScore: 'Початківець',
        endScore: 'Високий рівень',
        duration: '9 місяців',
        text: 'Привіт, я вступив до технікуму у Польщі на ІТ, зайняв перше місце в рейтингу (я максимальний бал отримав на вступному випробуванні).',
        badge: 'Вступ за кордон'
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
      },
      // New Reviews Added
      {
        author: 'Софія, 11 клас (ЗНО 2020)',
        text: 'Найбільше зміни я відчула в розумінні нових тем у школі, якщо раніше я взагалі не розуміла про що там то зараз набагато легше і впевненості звісно додалось. Результатом я ДУЖЕ задоволена, дуже приємне і комфортне навчання. Математику тепер розумію і не боюсь якихось самостійних або контрольних, дякую що є такі репетитори як Соня',
        subText: 'Підготовка до ЗНО'
      },
      {
        author: 'Мама Влади, 10-й клас німецької школи',
        text: 'Софіє, дуже дякуємо за допомогу з адаптацією в німецькій школі. Влада отримала відмінно за контрольний тест!',
        subText: 'Адаптація за кордоном'
      },
      {
        author: 'Анна, 11 клас',
        text: 'З математики 184, я дуже тобі вдячна. Більшість що було знала як робити завдяки тобі й нашій роботі!',
        subText: 'Підготовка до НМТ'
      },
      {
        author: 'Ріта, 1 курс коледжу',
        text: 'Добрий день, прийшли результати з математики, у мене 178 балів. Я дуже рада! Дякую, без вас я б геометрію взагалі не вирішила))',
        subText: 'Підготовка до іспитів'
      },
      {
        author: 'Тимофій, 11 клас',
        text: 'Тільки додому приїхав, написав математику на 150. Результатом задоволений в принципі, дякую вам за допомогу!',
        subText: 'Підготовка до НМТ'
      }
    ] as Review[],

    // Form data
    form: {
      name: '',
      contact: '',
      grade: '',
      country: '',
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
          country: '',
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
