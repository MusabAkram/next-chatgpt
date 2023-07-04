'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [showInput, setShowInput] = useState(false)
  const [slideUp, setSlideUp] = useState(false)
  const [loading, setLoading] = useState(false) // Will be used in the feature, if I ever touch this project again
  const [responses, setResponses] = useState([{ text: '' }])
  const [questions, setQuestions] = useState([''])
  const [userPrompt, setUserPrompt] = useState('')

  const handleButtonClick = () => {
    setShowInput(true)
    setSlideUp(true)
  }

  const handleSendButtonClick = async () => {
    setLoading(true)
    console.log(`Sending message: ${userPrompt}`)
    setQuestions((question) => [...question, userPrompt])
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: userPrompt,
      }),
    }).then((response) => response.json())
    if (response.text !== null) {
      setResponses((responses) => [...responses, response])
    }
    setLoading(false)
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get more info on&nbsp;
          <code className={styles.code}>
            <Link href="https://medium.com/@poatek" className={styles.link}>
              medium.com/@poatek
            </Link>
          </code>
        </p>
        <div className={`${styles.center} ${slideUp ? styles.centerTop : ''}`}>
          <Image
            className={`${styles.logo} ${slideUp ? styles.slideUp : ''}`}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
           
          </div>
        </div>
      </div>

      {showInput &&
        questions.map((questions, i) => (
          <div key={i}>
            <div className={styles.question}>
              
              <p className={styles.questionText}>
                <span className={styles.bold}>My Message:</span> {questions}
              </p>
            </div>
            {responses ? (
              <div className={styles.question}>
                
                <p className={styles.responseText}>
                  <span className={styles.bold}>Robby The bot! Awnser:</span>{' '}
                  {responses[i]?.text}
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}

      {showInput && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.textInput}
            placeholder="Enter your message"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <button className={styles.btnSend} onClick={handleSendButtonClick}>
            Send!
          </button>
        </div>
      )}

      {showInput ? (
        <></>
      ) : (
        <button className={styles.btn} onClick={handleButtonClick}>
          Start Chatting
        </button>
      )}
    </main>
  )
}