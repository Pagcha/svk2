import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setupRevealOnViewport(
  target: Element | null,
  reveal: () => void | (() => void),
  options?: { threshold?: number; viewportFactor?: number },
) {
  if (!target) return undefined

  const threshold = options?.threshold ?? 0.2
  const viewportFactor = options?.viewportFactor ?? 0.9
  const hasIntersectionObserver =
    typeof window !== 'undefined' && 'IntersectionObserver' in window

  const resetRevealState = () => {
    target.querySelectorAll('.is-visible').forEach((element) => {
      element.classList.remove('is-visible')
    })
  }

  if (!hasIntersectionObserver) {
    let hasBeenTriggered = false
    let activeCleanup: (() => void) | undefined

    const handleScroll = () => {
      const rect = target.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight * viewportFactor

      if (isInViewport) {
        if (!hasBeenTriggered) {
          resetRevealState()
          const result = reveal()
          if (typeof result === 'function') activeCleanup = result
          hasBeenTriggered = true
        }
        return
      }

      // left viewport: remove visible classes and cancel any pending timers
      if (hasBeenTriggered) {
        if (activeCleanup) activeCleanup()
        resetRevealState()
      }

      hasBeenTriggered = false
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (activeCleanup) activeCleanup()
    }
  }

  let hasBeenTriggered = false
  let activeCleanup: (() => void) | undefined

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!hasBeenTriggered) {
            resetRevealState()
            const result = reveal()
            if (typeof result === 'function') activeCleanup = result
            hasBeenTriggered = true
          }
          return
        }

        // element left viewport: cancel pending timers and remove visible classes
        if (hasBeenTriggered) {
          if (activeCleanup) activeCleanup()
          resetRevealState()
        }

        hasBeenTriggered = false
      })
    },
    { threshold },
  )

  observer.observe(target)

  return () => {
    if (activeCleanup) activeCleanup()
    observer.disconnect()
  }
}
