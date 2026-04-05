export type AnalyticsEventName = 'cta_click' | 'phone_click' | 'form_submit'

export interface EventPayload {
  page: string
  element_id: string
  element_text: string
}
