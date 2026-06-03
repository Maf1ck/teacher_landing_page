export interface CaseStudy {
  name: string
  age: string
  goal: string
  startScore: string
  endScore: string
  duration: string
  text: string
  badge: string
}

export interface Review {
  author: string
  text: string
  subText: string
}

export interface ContactForm {
  name: string
  contact: string
  grade: string
  goal: string
  comment: string
}

export interface ContactFormErrors {
  name: string
  contact: string
}
