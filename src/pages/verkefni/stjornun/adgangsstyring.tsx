import { Navigate } from 'react-router-dom'

/** Old projects-nested path → top-level access controls. */
export default function AdgangsstyringRedirect() {
  return <Navigate to="/stjornun/adgangsstyring" replace />
}
