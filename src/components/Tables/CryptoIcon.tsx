import React, { useState, useEffect, useMemo } from "react"

import { checksumAddress } from "../../utils/ethereumAddress"
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
    <AiFillQuestionCircle size={size * 4} color="#ffffff" />
  ) : (
    <img src={imgSrc} className={`w-${size} h-${size} rounded-full`} />
  )
}

export default CryptoIcon
