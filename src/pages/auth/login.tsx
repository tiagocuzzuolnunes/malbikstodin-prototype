import { useTranslation } from 'react-i18next'

export default function LoginPage() {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('auth.loginTitle')}</h1>
      <p>{t('auth.loginDescription')}</p>
    </>
  )
}
