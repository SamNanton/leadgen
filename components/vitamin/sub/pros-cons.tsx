import React from 'react'
import Image from 'next/image'
import { ProsConsScore, Score } from './pros-cons-score'

interface ProsConsProps {
  flag: 'pros' | 'cons'
  title: string
  description: string
  scores: Score[]
}

export function ProsCons({ flag, title, description, scores }: ProsConsProps) {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <h2 className="text-lg md:text-2xl font-bold">{title}</h2>
      <p>{description}</p>
      <div className="flex flex-col gap-3 w-full">
        {scores.map((score, index) => (
          <ProsConsScore flag={flag} {...score} key={index} />
        ))}
      </div>
      <div className="flex flex-wrap">
        <div className="w-[190px] hidden md:block" />

        <Image
          src="/image-icons/ruler.png"
          height={36}
          width={420}
          alt="ruler"
        />
      </div>
    </div>
  )
}
