'use client'
import { useEffect, useState } from 'react'
import { lyricsData } from './data/lyrics'

const STORAGE_KEY = 'lyrics-expanded-state'

export default function Home() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setOpenSections(JSON.parse(saved))
      } catch {
        setOpenSections({})
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(openSections))
  }, [openSections])

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <main style={{ fontFamily: 'sans-serif' }}>
      {/* Hero section */}
      <div
        style={{
          position: 'relative',
          height: '300px',
          backgroundImage: 'url(/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '0 0 8px rgba(0,0,0,0.7)',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            padding: '0 1rem',
            maxWidth: '90%',
          }}
        >
          Ættarmót í Tunguseli 2025
        </h1>
      </div>

      {/* Lyrics list */}
      <section style={{ padding: '2rem' }}>
        {lyricsData.map(({ id, title, lyrics }) => {
          const isOpen = openSections[id]

          return (
            <section
              key={id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '6px',
                marginBottom: '1rem',
                padding: '1rem',
                transition: 'all 0.3s ease',
              }}
            >
              <button
                onClick={() => toggleSection(id)}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#0070f3',
                }}
                aria-expanded={isOpen}
                aria-controls={`lyrics${id}`}
              >
                {isOpen ? '▼' : '▶'} {title}
              </button>

              <div
                id={`lyrics${id}`}
                style={{
                  maxHeight: isOpen ? '1000px' : '0',
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                }}
              >
                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    marginTop: '1rem',
                    lineHeight: 1.5,
                  }}
                >
                  {lyrics}
                </pre>
              </div>
            </section>
          )
        })}
      </section>
    </main>
  )
}
