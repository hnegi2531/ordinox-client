import { useState, useEffect, useRef } from 'react'

const FORWARD = 'forward'
const BACKWARD = 'backward'

// const WorkWrapper = styled.div<{ colorCode: string }>`
//   display: inline-block;

//   .word span {
//     position: relative;
//     color: ${props => props.colorCode};

//     &::after {
//       content: '';
//       width: 3px;
//       height: 100%;
//       display: block;
//       background: ${props => props.colorCode};
//       position: absolute;
//       right: -5px;
//       top: 0;
//     }
//   }

//   .word.empty {
//     visibility: hidden;

//     span::after {
//       visibility: visible;
//       right: 0;
//     }
//   }
// `
interface IUseTypingTextProps {
  words: string[]
  keySpeed?: number
  maxPauseAmount?: number
  color?: string
}

export const useTypingText = ({
  words,
  keySpeed = 1000,
  maxPauseAmount = 10,
  color = '#fff',
}: IUseTypingTextProps) => {
  //* State & Hooks
  const [wordIndex, setWordIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState(words[wordIndex].split(''))
  const [isStopped, setIsStopped] = useState(false)
  const direction = useRef(BACKWARD)
  const typingInterval = useRef<any>()
  const letterIndex = useRef<any>()

  //* Function [Stop]
  const stop = () => {
    clearInterval(typingInterval.current)
    setIsStopped(true)
  }

  //* [UseEffect]
  useEffect(() => {
    //* Start at 0
    // @param : set pause counter zero & check if isStopped state (true) then return
    let pauseCounter = 0
    if (isStopped) return

    // @param : Calculate when typing should forward and backward
    const typeLetter = () => {
      if (letterIndex.current >= words[wordIndex].length) {
        direction.current = BACKWARD

        // @param : Begin pause by setting the maxPauseAmount prop equal to the counter
        pauseCounter = maxPauseAmount
        return
      }

      const segment = words[wordIndex].split('')
      setCurrentWord(currentWord.concat(segment[letterIndex.current]))
      letterIndex.current += 1
    }

    // @param : Handle backspace effect
    const backspace = () => {
      if (letterIndex.current === 0) {
        const isOnLastWord = wordIndex === words.length - 1

        setWordIndex(!isOnLastWord ? wordIndex + 1 : 0)
        direction.current = FORWARD

        return
      }

      const segment = currentWord.slice(0, currentWord.length - 1)
      setCurrentWord(segment)
      letterIndex.current = currentWord.length - 1
    }

    // @param : set typing interval and speed
    typingInterval.current = setInterval(() => {
      // @param wait until counter hits 0 to do any further action
      if (pauseCounter > 0) {
        pauseCounter -= 1
        return
      }

      if (direction.current === FORWARD) {
        typeLetter()
      } else {
        backspace()
      }
    }, keySpeed)

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(typingInterval.current)
    }
  }, [currentWord, wordIndex, keySpeed, words, maxPauseAmount, isStopped])

  return {
    word: (
      <div className='inline-block'>
        <span className={`word ${currentWord.length ? 'full' : 'empty'}`}>
          <span className='relative'>{currentWord.length ? currentWord.join('') : ''}</span>
        </span>
      </div>
    ),
    start: () => setIsStopped(false),
    stop,
  }
}
