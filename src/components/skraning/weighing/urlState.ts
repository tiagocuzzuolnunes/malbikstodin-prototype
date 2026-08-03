import type { WeighbridgeId, WeighingDirection } from '../../../data/weighingDispatch'

export type DispatchView = 'register' | 'list'

const plantScaleIds = ['wb-asphalt-1', 'wb-asphalt-2'] as const satisfies readonly WeighbridgeId[]

export function parseDispatchView(value: string | null): DispatchView {
  return value === 'list' ? 'list' : 'register'
}

export function parseWeighbridgeId(value: string | null): WeighbridgeId {
  return plantScaleIds.includes(value as (typeof plantScaleIds)[number])
    ? (value as WeighbridgeId)
    : 'wb-asphalt-1'
}

export function parseWeighingDirection(value: string | null): WeighingDirection {
  return value === 'in' ? 'in' : 'out'
}

/** Keep other weighing params; drop keys when they match the page defaults. */
export function patchWeighingSearchParams(
  prev: URLSearchParams,
  patch: {
    view?: DispatchView
    scale?: WeighbridgeId
    direction?: WeighingDirection
  },
) {
  const next = new URLSearchParams(prev)

  if (patch.view !== undefined) {
    if (patch.view === 'register') next.delete('view')
    else next.set('view', patch.view)
  }

  if (patch.scale !== undefined) {
    if (patch.scale === 'wb-asphalt-1') next.delete('scale')
    else next.set('scale', patch.scale)
  }

  if (patch.direction !== undefined) {
    if (patch.direction === 'out') next.delete('direction')
    else next.set('direction', patch.direction)
  }

  return next
}
