import React, { PropsWithChildren, useEffect, useRef } from 'react'

interface IVisitor {
  onVisible: () => void
}

export const Visitor: React.FC<IVisitor & PropsWithChildren> = ({ onVisible, children }) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const elementRef = useRef<HTMLDivElement | null>(null)
  // TODO: check
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onVisible()
      }
    })

    if (elementRef.current) {
      observer.current.observe(elementRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [onVisible])

  return <div ref={elementRef}>{children}</div>
}
