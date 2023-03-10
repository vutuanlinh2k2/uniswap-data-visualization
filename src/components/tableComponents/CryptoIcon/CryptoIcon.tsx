import React, { useState, useEffect, useMemo } from "react"

import { checksumAddress } from "../../../utils/ethereum"
import { AiFillQuestionCircle } from "react-icons/ai"

const CryptoIcon = ({ address, size }: { address: string; size: number }) => {
  const [imageExists, setImageExists] = useState(false)

  const imgSrc = useMemo(() => {
    const formattedAddress = checksumAddress(address)
    return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/${formattedAddress}/logo.png`
  }, [address])

  useEffect(() => {
    const img = new Image()
    img.src = imgSrc

    const handleImageLoad = () => {
      setImageExists(true)
    }

    const handleImageError = () => {
      setImageExists(false)
    }

    img.addEventListener("load", handleImageLoad)
    img.addEventListener("error", handleImageError)

    return () => {
      img.removeEventListener("load", handleImageLoad)
      img.removeEventListener("error", handleImageError)
    }
  }, [imgSrc])

  return !imageExists ? (
    <AiFillQuestionCircle size={size} color="#ffffff" />
  ) : (
    <img
      src={imgSrc}
      className="rounded-full"
      style={{
        width: size,
        height: size,
      }}
    />
  )
}

export default CryptoIcon
