export const getTimeSinceEpoch = (epochSeconds: number): string => {
  const now = Date.now() / 1000 // convert current time to seconds
  const secondsAgo = now - epochSeconds

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
