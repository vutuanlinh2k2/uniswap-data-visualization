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

export const getUnix24h = (): number => {
  // Get the current Unix time in milliseconds
  const now = new Date().getTime()

  // Calculate the Unix time 1 day ago (in milliseconds)
  const oneDayAgo = now - 24 * 60 * 60 * 1000

  // Round the Unix time to the nearest minute
  const roundedOneDayAgo = Math.round(oneDayAgo / (60 * 1000)) * (60 * 1000)

  // Convert the Unix time to seconds and return it
  return Math.floor(roundedOneDayAgo / 1000)
}

export const getUnix7d = (): number => {
  // Get the current Unix time in milliseconds
  const now = new Date().getTime()

  // Calculate the Unix time 1 day ago (in milliseconds)
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000

  // Round the Unix time to the nearest minute
  const roundedOneWeekAgo = Math.round(oneWeekAgo / (60 * 1000)) * (60 * 1000)

  // Convert the Unix time to seconds and return it
  return Math.floor(roundedOneWeekAgo / 1000)
}
