'use client'

import Image from 'next/image'
import { ProsCons } from './sub/pros-cons'
import { Button } from '@radix-ui/themes'
import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { FeedbackAnalysis } from './feedback-analysis'
import { companyUrl } from '@/lib/constants/config'
import { BotCard } from '../stocks'
import { UserMessage } from '../stocks/message'
import { useWindowSize } from 'usehooks-ts'
import { EmailInputMessage } from './email-input-message'
import { useFreeChatContext } from '@/lib/hooks/use-free-chat'
import { EmailCodeInputMessage } from './email-code-input-message'

export function Comparison() {
  const [_, setMessages] = useUIState<typeof AI>()
  const { width: windowWidth } = useWindowSize()
  const { userEmail, isEmailVerified } = useFreeChatContext()

  const onClick = async (index: number) => {
    if (index === 0) {
      setMessages(currentMessages => [
        ...currentMessages,
        {
          id: nanoid(),
          display: <UserMessage>Feedback Analysis</UserMessage>
        },
        {
          id: nanoid(),
          display: (
            <BotCard>
              <FeedbackAnalysis />
            </BotCard>
          )
        }
      ])
    } else {
      window.open(companyUrl, '_blank')
    }
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <Image
          src="/vitamin/logos/renzo.png"
          height={80}
          width={80}
          alt="renzo-loading"
          style={{
            height: windowWidth > 768 ? 80 : 64,
            width: windowWidth > 768 ? 80 : 64
          }}
        />
        <div>
          <h1 className="text-lg md:text-3xl font-bold mb-4">
            Renzo&apos;s, Your Report is Ready.
          </h1>
          <p className="text-[10px] md:text-sm">
            Antelope&apos;s platform has evaluated over 2.3 million data points
            accross ten channels and 12 of your closest competitors in the
            children&apos;s vitamin space. Below is a summary of findings:
          </p>
        </div>
      </div>
      <div
        className={`p-5 rounded-md flex flex-col gap-6 bg-gradient-to-b relative ${isEmailVerified ? 'bg-[#1E333A]' : 'opacity-gradient h-[260px]'}`}
      >
        <ProsCons
          flag="pros"
          title="Renzo's Strengths"
          description="Renzo's strengths lie in their sentiment, media, and organic reach, demonstrating a robust market presence and customer loyalty across multiple platforms:"
          scores={[
            {
              title: 'Influencer Activity',
              value: 90,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            },
            {
              title: 'Ratings',
              value: 80,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            },
            {
              title: 'Testimonials',
              value: 75,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            },
            {
              title: 'Earn Media',
              value: 60,
              tooltipDescription:
                'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
            }
          ]}
        />
        {isEmailVerified && (
          <ProsCons
            flag="cons"
            title="Renzo's Weaknesses"
            description="Renzo's weaknesses are limited product variety and higher pricing compared to competitors, which may hinder market expansion and customer acquisition:"
            scores={[
              {
                title: 'Influencer Activity',
                value: 30,
                tooltipDescription:
                  'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
              },
              {
                title: 'Ratings',
                value: 25,
                tooltipDescription:
                  'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
              },
              {
                title: 'Testimonials',
                value: 20,
                tooltipDescription:
                  'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
              },
              {
                title: 'Earn Media',
                value: 10,
                tooltipDescription:
                  'Influencer activity looks at the relative share of sponsored mentions and engagement among competitors'
              }
            ]}
          />
        )}
      </div>
      {isEmailVerified ? (
        <>
          <p className="text-[10px] md:text-sm">
            Renzo&apos;s strengths and weaknesses highlight strong reviews yet
            comparatively poor content performance, with brands like Flintstones
            and MaryRuth&apos;s leading. Would you like to drill further into
            the analysis, or learn more about Antelope&apos;s reporting
            solutions?
          </p>
          <div className="flex flex-wrap">
            {availableButtons.map((availableButton, index) => (
              <div className="p-1 w-full md:w-[50%]" key={index}>
                <Button
                  onClick={() => onClick(index)}
                  size={windowWidth > 768 ? '3' : '1'}
                  style={{
                    width: '100%'
                  }}
                >
                  {availableButton.caption}
                </Button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6 mt-[-48px] z-10">
          <EmailInputMessage />
          {userEmail && <EmailCodeInputMessage />}
        </div>
      )}
    </div>
  )
}

const availableButtons = [
  {
    caption: 'Feedback Analysis'
  },
  {
    caption: 'Tell Me More About Antelope'
  },
  {
    caption: 'Book a Demo'
  },
  {
    caption: 'Show Me Case Studies'
  }
]
