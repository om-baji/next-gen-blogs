import React from 'react'
import { StarsBackground } from './ui/stars-background'

type Props = {
    children: React.ReactNode
}

const BackgroundProvider = ({children} : Props) => {
    return (
        <div>
            {children}
            <StarsBackground />
        </div>
    )
}

export default BackgroundProvider
