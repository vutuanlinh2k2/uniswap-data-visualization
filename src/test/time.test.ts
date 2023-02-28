import { getTimePast } from "../utils"

describe("getTimePast", () => {
  it("returns '1 second ago' when input is 1 second before current time", () => {
    const input = Date.now() / 1000 - 1
    const output = getTimePast(input)
    expect(output).toEqual("1 second ago")
  })

  it("returns '59 seconds ago' when input is 59 seconds before current time", () => {
    const input = Date.now() / 1000 - 59
    const output = getTimePast(input)
    expect(output).toEqual("59 seconds ago")
  })

  it("returns '1 minute ago' when input is 60 seconds before current time", () => {
    const input = Date.now() / 1000 - 60
    const output = getTimePast(input)
    expect(output).toEqual("1 minute ago")
  })

  it("returns '2 minutes ago' when input is 120 seconds before current time", () => {
    const input = Date.now() / 1000 - 120
    const output = getTimePast(input)
    expect(output).toEqual("2 minutes ago")
  })

  it("returns '1 hour ago' when input is 3600 seconds before current time", () => {
    const input = Date.now() / 1000 - 3600
    const output = getTimePast(input)
    expect(output).toEqual("1 hour ago")
  })

  it("returns '2 hours ago' when input is 7200 seconds before current time", () => {
    const input = Date.now() / 1000 - 7200
    const output = getTimePast(input)
    expect(output).toEqual("2 hours ago")
  })

  it("returns '1 day ago' when input is 86400 seconds before current time", () => {
    const input = Date.now() / 1000 - 86400
    const output = getTimePast(input)
    expect(output).toEqual("1 day ago")
  })

  it("returns '2 days ago' when input is 172800 seconds before current time", () => {
    const input = Date.now() / 1000 - 172800
    const output = getTimePast(input)
    expect(output).toEqual("2 days ago")
  })
})
