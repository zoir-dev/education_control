'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const NotFound = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default NotFound