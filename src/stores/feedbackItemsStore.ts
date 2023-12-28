import { create } from 'zustand'
import { TFeedbackItem } from '../lib/types'

type Store = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  selectedCompany: string
  getCompanyList: () => string[]
  getFilteredFeedbackItems: () => TFeedbackItem[]
  addItemToList: (text: string) => void
  selectCompany: (company: string) => void
  fetchFeedbackItems: () => void
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  getCompanyList: () => {
    return get()
      .feedbackItems.map(item => item.company)
      .filter((company, index, array) => {
        //filter out duplicates
        return array.indexOf(company) === index
      })
  },
  getFilteredFeedbackItems: () => {
    const state = get()
    return state.selectedCompany
      ? state.feedbackItems.filter(item => item.company === selectedCompany)
      : state.feedbackItems
  },
  addItemToList: async (text: string) => {
    const companyName = text
      .split(' ')
      .find(word => word.includes('#'))!
      .substring(1)

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      company: companyName,
      text: text,
      daysAgo: 0
    }

    set(state => ({ feedbackItems: [...state.feedbackItems, newItem] }))
    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      }
    )
  },
  selectCompany: (company: string) => {
    // setSelectedCompany(company)
    set(state => ({ selectedCompany: company }))
  },
  fetchFeedbackItems: async () => {
    set(state => ({ isLoading: true }))

    try {
      const response = await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
      )

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()
      set(state => ({ feedbackItems: data.feedbacks }))
    } catch (error) {
      set(state => ({
        errorMessage: 'Something went wrong. Please try again later.'
      }))
    }

    set(state => ({ isLoading: false }))
  }
}))
