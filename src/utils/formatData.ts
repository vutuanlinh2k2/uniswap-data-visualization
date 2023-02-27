export const mappingData = <QueryDataType extends { id: string }[]>(
  currentData: QueryDataType,
  oneDayData: QueryDataType,
  oneWeekData: QueryDataType
) => {
  const dataMapping: {
    [address: string]: {
      current: (typeof currentData)[0] | undefined
      oneDay: (typeof oneDayData)[0] | undefined
      oneWeek: (typeof oneWeekData)[0] | undefined
    }
  } = {}

  for (let i = 0; i < currentData.length; i++) {
    const addressCurrent = currentData[i].id
    if (!dataMapping[addressCurrent]) {
      dataMapping[addressCurrent] = {
        current: undefined,
        oneDay: undefined,
        oneWeek: undefined,
      }
    }
    dataMapping[addressCurrent]["current"] = currentData[i]

    if (oneDayData.length === currentData.length) {
      const addressOneDay = oneDayData[i].id
      if (!dataMapping[addressOneDay]) {
        dataMapping[addressOneDay] = {
          current: undefined,
          oneDay: undefined,
          oneWeek: undefined,
        }
      }
      dataMapping[addressOneDay]["oneDay"] = oneDayData[i]
    }

    if (oneWeekData.length === currentData.length) {
      const addressOneWeek = oneWeekData[i].id
      if (!dataMapping[addressOneWeek]) {
        dataMapping[addressOneWeek] = {
          current: undefined,
          oneDay: undefined,
          oneWeek: undefined,
        }
      }
      dataMapping[addressOneWeek]["oneWeek"] = oneWeekData[i]
    }
  }

  return dataMapping
}
