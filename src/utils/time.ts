export const getTimePast = (unix: number): string => {
  const now = Date.now() / 1000
  const secondsAgo = now - unix

  if (secondsAgo < 60) {
    return `${Math.floor(secondsAgo)} seconds ago`
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60)
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600)
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400)
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`
  }
}

export const getTimestamp24h = (): number => {
  const now = new Date().getTime()
  const oneDayAgo = now - 24 * 60 * 60 * 1000
  const roundedOneDayAgo = Math.round(oneDayAgo / (60 * 1000)) * (60 * 1000)
  return Math.floor(roundedOneDayAgo / 1000)
}

export const getTimestamp7d = (): number => {
  const now = new Date().getTime()
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000
  const roundedOneWeekAgo = Math.round(oneWeekAgo / (60 * 1000)) * (60 * 1000)
  return Math.floor(roundedOneWeekAgo / 1000)
}
