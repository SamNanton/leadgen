'use client'

import * as React from 'react'

interface FreeChatContext {
  linkedinPosts: string //  TODO: parse linkedin posts
  userEmail: string
  isEmailVerified: boolean
  setLinkedinPosts: (posts: string) => void
  setUserEmail: (email: string) => void
  setEmailVerified: (verified: boolean) => void
}

const FreeChatContext = React.createContext<FreeChatContext>({
  linkedinPosts: '',
  userEmail: '',
  isEmailVerified: false,
  setLinkedinPosts: () => {},
  setUserEmail: () => {},
  setEmailVerified: () => {}
})

export function useFreeChatContext() {
  const context = React.useContext(FreeChatContext)
  if (!context) {
    throw new Error('useFreeChatContext must be used within a FreeChatProvider')
  }
  return context
}

interface FreeChatProviderProps {
  children: React.ReactNode
}

export function FreeChatProvider({ children }: FreeChatProviderProps) {
  const [linkedinPosts, setLinkedinPosts] = React.useState('')
  const [userEmail, setUserEmail] = React.useState('')
  const [isEmailVerified, setEmailVerified] = React.useState(false)

  return (
    <FreeChatContext.Provider
      value={{
        linkedinPosts,
        userEmail,
        isEmailVerified,
        setLinkedinPosts,
        setUserEmail,
        setEmailVerified
      }}
    >
      {children}
    </FreeChatContext.Provider>
  )
}
