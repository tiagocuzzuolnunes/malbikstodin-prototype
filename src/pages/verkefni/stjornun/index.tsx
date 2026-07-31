import { Navigate } from 'react-router-dom'

/** Old projects-nested path → top-level management hub. */
export default function StjornunRedirect() {
  return <Navigate to="/stjornun" replace />
}
