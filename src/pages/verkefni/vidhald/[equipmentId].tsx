import { Navigate, useParams } from 'react-router-dom'
import EquipmentMaintenance from '../../../components/verkefni/EquipmentMaintenance'
import { getMaintenanceEquipment } from '../../../data/equipmentMaintenance'

export default function EquipmentDetailPage() {
  const { equipmentId } = useParams<{ equipmentId: string }>()
  const machine = equipmentId ? getMaintenanceEquipment(equipmentId) : null

  if (!machine) {
    return <Navigate to="/verkefni/vidhald" replace />
  }

  return <EquipmentMaintenance machine={machine} />
}
