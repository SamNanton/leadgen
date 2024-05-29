'use client'

import { useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'
import { Comparison } from './comparison'
import { antelopeEndpoint, renzoClientID } from '@/lib/constants/config'
import { useEffect, useState } from 'react'
import { fetcher, showPrompts } from '@/lib/utils'
import { ContentTemplate, IContainer } from '../content-template'
import { FooterButtonGroup } from './footer-button-group'

export function DataOverview() {
  const [_, setMessages] = useUIState<typeof AI>()
  const [content, setContent] = useState<IContainer | null>(null)

  //  TODO: combine with server component
  useEffect(() => {
    fetcher(
      `${antelopeEndpoint}/chatbots/overview?origin=leadgen&clientID=${renzoClientID}&brand=Renzo%27s%20Vitamins&since=20230401&until=20240401`
    )
      .then(res => {
        setContent(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  const onClick = async () => {
    await showPrompts('Start Comparison', <Comparison />, setMessages)
  }

  return (
    <>
      {content ? (
        <ContentTemplate
          {...content}
          footer={
            <FooterButtonGroup
              submitCaption="Start Comparison"
              onSubmit={onClick}
            />
          }
        />
      ) : null}
    </>
  )
}
