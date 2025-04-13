const today = new Date()
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
}
export const formattedDate = today.toLocaleDateString("es-CO", options)