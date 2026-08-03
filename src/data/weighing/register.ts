import type {
  RegisterWeighingInput,
  WeighbridgeId,
  WeighingDispatchRow,
} from './types'

/** Weighbridge scales available for registration. */
export const weighbridges = [
  { id: 'wb-asphalt-1', labelKey: 'weighingDispatch.scales.asphalt1' },
  { id: 'wb-asphalt-2', labelKey: 'weighingDispatch.scales.asphalt2' },
  { id: 'wb-quarry', labelKey: 'weighingDispatch.scales.quarry' },
] as const

export const weighingProducts = [
  { id: '1204', code: '1204', nameKey: 'weighingDispatch.products.asphaltY16' },
  { id: '1211', code: '1211', nameKey: 'weighingDispatch.products.binderCourseTh11' },
  { id: '3002', code: '3002', nameKey: 'weighingDispatch.products.gravel016' },
] as const

export const weighingJobs = [
  {
    id: '26-0412',
    number: '26-0412',
    placeKey: 'weighingDispatch.jobs.hringbraut',
  },
  {
    id: '26-0388',
    number: '26-0388',
    placeKey: 'weighingDispatch.jobs.kaltakot',
  },
  {
    id: '26-0401',
    number: '26-0401',
    placeKey: 'weighingDispatch.jobs.plantYard',
  },
] as const

/** Simulated live scale reading once a weighbridge is selected. */
export function simulateScaleReading(scaleId: WeighbridgeId | '') {
  if (!scaleId) {
    return { netTonnes: 0, grossTonnes: 0 }
  }

  const seed = scaleId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const net = 16 + (seed % 120) / 10
  const tare = 12 + (seed % 40) / 10
  return {
    netTonnes: Math.round(net * 100) / 100,
    grossTonnes: Math.round((net + tare) * 100) / 100,
  }
}

export function createRegisteredWeighing(
  input: RegisterWeighingInput,
  sequence: number,
): WeighingDispatchRow {
  const product = weighingProducts.find((item) => item.id === input.productId)
  const job = weighingJobs.find((item) => item.id === input.jobId)
  const now = new Date()
  const time = now.toLocaleTimeString('is-IS', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const weighingNo = `V-26-${String(18500 + sequence).padStart(5, '0')}`

  return {
    id: `w-reg-${Date.now()}-${sequence}`,
    time,
    weighingNo,
    direction: input.direction,
    vehicle: input.vehiclePlate,
    productCode: product?.code ?? input.productId,
    productNameKey: product?.nameKey ?? 'weighingDispatch.products.asphaltY16',
    recipientKey: job
      ? 'weighingDispatch.recipient.job'
      : 'weighingDispatch.recipient.none',
    recipientParams: job
      ? { job: job.number, place: job.placeKey }
      : undefined,
    netTonnes: input.netTonnes,
    route: {
      kind: 'none',
      labelKey: 'weighingDispatch.route.noRouteFound',
    },
    status: 'unrouted',
  }
}
