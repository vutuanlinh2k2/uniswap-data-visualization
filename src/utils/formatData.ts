export const mappingData = <QueryDataType extends { id: string }[]>(
  currentData: QueryDataType,
  oneDayData: QueryDataType
) => {
  const dataMapping: {
    [address: string]: {
      current: (typeof currentData)[0] | undefined
      oneDay: (typeof oneDayData)[0] | undefined
    }
  } = {}

  for (let i = 0; i < currentData.length; i++) {
    const addressCurrent = currentData[i].id
    if (!dataMapping[addressCurrent]) {
      dataMapping[addressCurrent] = {
        current: undefined,
        oneDay: undefined,
      }
    }
    dataMapping[addressCurrent]["current"] = currentData[i]

    const addressOneDay = oneDayData[i].id
    if (!dataMapping[addressOneDay]) {
      dataMapping[addressOneDay] = {
        current: undefined,
        oneDay: undefined,
      }
    }
    dataMapping[addressOneDay]["oneDay"] = oneDayData[i]
  }

  return dataMapping
}
