export type GreetingPeriod = 'morning' | 'afternoon' | 'evening' | 'night'

export function getGreetingPeriod(date = new Date()): GreetingPeriod {
  const hour = date.getHours()

  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 22) return 'evening'
  return 'night'
}
