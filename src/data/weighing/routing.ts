import type {
  ManualRouteOption,
  WeighingDirection,
  WeighingDispatchRow,
} from './types'

export function getManualRouteOptions(
  direction: WeighingDirection,
): ManualRouteOption[] {
  if (direction === 'in') {
    return [
      {
        value: 'purchase',
        kind: 'purchaseAwaitingInvoice',
        labelKey: 'weighingDispatch.routeOptions.purchase',
        status: 'awaitingInvoice',
        recipientKey: 'weighingDispatch.recipient.supplierSite',
        recipientParams: { site: 'Bolaöldur', supplier: 'Björgun' },
        supplierDeliveryId: 'sd-1',
      },
      {
        value: 'supplier-invoice',
        kind: 'supplierInvoice',
        labelKey: 'weighingDispatch.routeOptions.supplierInvoice',
        status: 'discrepancy',
        labelParams: { tonnes: 31.2 },
        recipientKey: 'weighingDispatch.recipient.supplierSite',
        recipientParams: { site: 'Bolaöldur', supplier: 'Björgun' },
        supplierDeliveryId: 'sd-2',
      },
    ]
  }

  return [
    {
      value: 'trip',
      kind: 'tripOnJob',
      labelKey: 'weighingDispatch.routeOptions.tripOnJob',
      status: 'routed',
      labelParams: { trip: '91 220' },
      recipientKey: 'weighingDispatch.recipient.job',
      recipientParams: { job: '26-0412', place: 'Hringbraut, south lane' },
      tripId: '91-220',
      jobNumber: '26-0412',
    },
    {
      value: 'docket',
      kind: 'docketToBuyer',
      labelKey: 'weighingDispatch.routeOptions.docketToBuyer',
      status: 'awaitingDocket',
      recipientKey: 'weighingDispatch.recipient.buyer',
      recipientParams: { buyer: 'Steypustöðin ehf.' },
      deliveryNoteId: 'dn-1',
    },
  ]
}

export function applyManualRoute(
  row: WeighingDispatchRow,
  option: ManualRouteOption,
): WeighingDispatchRow {
  return {
    ...row,
    recipientKey: option.recipientKey ?? row.recipientKey,
    recipientParams: option.recipientParams
      ? { ...option.recipientParams }
      : row.recipientParams,
    route: {
      kind: option.kind,
      labelKey:
        option.kind === 'tripOnJob'
          ? 'weighingDispatch.route.tripOnJob'
          : option.kind === 'docketToBuyer'
            ? 'weighingDispatch.route.docketToBuyer'
            : option.kind === 'purchaseAwaitingInvoice'
              ? 'weighingDispatch.route.purchaseAwaitingInvoice'
              : option.kind === 'supplierInvoice'
                ? 'weighingDispatch.route.supplierInvoice'
                : 'weighingDispatch.route.tripJobMissing',
      labelParams: option.labelParams ? { ...option.labelParams } : undefined,
      tripId: option.tripId,
      jobNumber: option.jobNumber,
      deliveryNoteId: option.deliveryNoteId,
      supplierDeliveryId: option.supplierDeliveryId,
    },
    status: option.status,
  }
}
