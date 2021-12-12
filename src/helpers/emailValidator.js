export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "E-mail ne peut pas être vide."
  if (!re.test(email)) return 'Ooops! E-mail est invalide.'
  return ''
}
