export const feedbackTypes = ['complaint', 'suggestion', 'tip'] as const
export type FeedbackType = (typeof feedbackTypes)[number]

export const feedbackStatuses = ['new', 'inReview', 'approved', 'implemented'] as const
export type FeedbackStatus = (typeof feedbackStatuses)[number]

export type FeedbackItem = {
  id: string
  type: FeedbackType
  title: string
  description: string
  authorName: string | null
  createdAt: string
  status: FeedbackStatus
}

export const initialFeedbackItems: FeedbackItem[] = [
  {
    id: 'fb1',
    type: 'suggestion',
    title: 'Add quieter break room near plant',
    description: 'Noise from the baghouse makes short breaks hard during peak production.',
    authorName: 'Einar Þórsson',
    createdAt: '2026-07-02',
    status: 'new',
  },
  {
    id: 'fb2',
    type: 'complaint',
    title: 'Delayed PPE restock on airside',
    description: 'Gloves and hearing protection ran out twice last week before night shift.',
    authorName: null,
    createdAt: '2026-07-05',
    status: 'new',
  },
  {
    id: 'fb3',
    type: 'tip',
    title: 'Share paving weather checklist',
    description: 'A shared morning checklist would reduce last-minute schedule changes.',
    authorName: 'Guðrún Pálsdóttir',
    createdAt: '2026-06-28',
    status: 'inReview',
  },
  {
    id: 'fb4',
    type: 'suggestion',
    title: 'Extend IT helpdesk hours in season',
    description: 'Field teams often need laptop unlock support after 17:00 in summer.',
    authorName: 'Katrín Björnsdóttir',
    createdAt: '2026-06-20',
    status: 'inReview',
  },
  {
    id: 'fb5',
    type: 'complaint',
    title: 'Parking overflow on Esja mornings',
    description: 'Crew vans block the weighbridge approach between 06:30 and 07:15.',
    authorName: null,
    createdAt: '2026-06-12',
    status: 'approved',
  },
  {
    id: 'fb6',
    type: 'suggestion',
    title: 'Monthly cross-department walkthrough',
    description: 'Short shared site walks would help surface safety tips earlier.',
    authorName: 'Sigríður Jónsdóttir',
    createdAt: '2026-05-30',
    status: 'approved',
  },
  {
    id: 'fb7',
    type: 'tip',
    title: 'Use night-shift radio channel map',
    description: 'Posting channel cards in each cabin reduced wrong-channel calls.',
    authorName: 'Jón Gunnarsson',
    createdAt: '2026-05-08',
    status: 'implemented',
  },
  {
    id: 'fb8',
    type: 'suggestion',
    title: 'Digitize leave request reminders',
    description: 'Automatic reminders three days before leave windows cut missed forms.',
    authorName: 'Ásta Ragnarsdóttir',
    createdAt: '2026-04-18',
    status: 'implemented',
  },
]
