'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (authError) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.')
      setLoading(false)
      return
    }

    router.push('/produtos')
    router.refresh()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#17233A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFCB08" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div
        style={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#ffffff',
          padding: '40px 36px',
          position: 'relative',
        }}
      >
        {/* Logo area */}
        <div style={{ marginBottom: 32, borderBottom: '3px solid #FFCB08', paddingBottom: 24 }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: 22,
              color: '#17233A',
              letterSpacing: '0.04em',
            }}
          >
            PENATEC
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(23,35,58,0.45)',
              marginTop: 2,
            }}
          >
            Painel Administrativo
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 800,
            fontSize: 26,
            color: '#17233A',
            marginBottom: 6,
            lineHeight: 1.1,
          }}
        >
          Entrar
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 13,
            color: 'rgba(23,35,58,0.5)',
            marginBottom: 28,
          }}
        >
          Acesso restrito a administradores
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label className="form-label" htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@penatec.com.br"
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div>
            <label className="form-label" htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: 'rgba(220,38,38,0.06)',
                border: '1px solid rgba(220,38,38,0.2)',
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                color: '#dc2626',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              backgroundColor: loading ? 'rgba(255,203,8,0.6)' : '#FFCB08',
              color: '#17233A',
              border: 'none',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.15s',
              marginTop: 4,
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
