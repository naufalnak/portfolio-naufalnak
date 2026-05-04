import { useEffect, useRef } from 'react'

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function useStaggeredAnimation(count, baseDelay = 100) {
  const refs = Array.from({ length: count }, () => useRef(null))

  useEffect(() => {
    refs.forEach((ref, i) => {
      const el = ref.current
      if (!el) return

      el.style.transitionDelay = `${i * baseDelay}ms`

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            observer.unobserve(el)
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
    })
  }, [])

  return refs
}
