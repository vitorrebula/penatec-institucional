'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Monitor, LogOut, Menu, X } from 'lucide-react'

const NAV = [
  {
    href: '/produtos',
    label: 'Produtos & Máquinas',
    Icon: Monitor,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden md:flex flex-col flex-shrink-0"
        style={{
          width: 240,
          minHeight: '100dvh',
          backgroundColor: '#17233A',
          borderRight: '1px solid rgba(255,203,8,0.08)',
        }}
      >
        <div style={{ padding: '28px 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 20, color: '#ffffff', letterSpacing: '0.04em' }}>
            PENATEC
          </span>
          <span style={{ display: 'block', fontFamily: 'var(--font-barlow)', fontWeight: 600, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFCB08', marginTop: 2 }}>
            Admin
          </span>
        </div>

        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', padding: '4px 14px 10px' }}>
            Catálogo
          </span>
          {NAV.map(({ href, label, Icon }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link key={href} href={href} className={`sidebar-link${isActive ? ' active' : ''}`}>
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'none', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', transition: 'border-color 0.15s, color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(220,38,38,0.4)'; e.currentTarget.style.color = '#ef4444' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
          >
            <LogOut size={14} />
            Sair
          </button>
        </div>
      </aside>

      {/* ── Mobile Topbar ── */}
      <header
        className="md:hidden flex items-center justify-between sticky top-0 z-50 flex-shrink-0"
        style={{
          height: 56,
          paddingLeft: 20,
          paddingRight: 16,
          backgroundColor: '#17233A',
          borderBottom: '1px solid rgba(255,203,8,0.15)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 6,
              height: 28,
              backgroundColor: '#FFCB08',
              flexShrink: 0,
            }}
          />
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-barlow)',
                fontWeight: 900,
                fontSize: 16,
                color: '#ffffff',
                letterSpacing: '0.06em',
                lineHeight: 1,
              }}
            >
              PENATEC
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-barlow)',
                fontWeight: 600,
                fontSize: 8,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,203,8,0.7)',
                marginTop: 2,
              }}
            >
              Admin
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="flex items-center justify-center transition-all duration-150 active:scale-95"
          style={{
            width: 40,
            height: 40,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          <Menu size={18} strokeWidth={2} />
        </button>
      </header>

      {/* ── Backdrop ── */}
      <div
        className="md:hidden fixed inset-0 z-40"
        aria-hidden="true"
        onClick={() => setOpen(false)}
        style={{
          backgroundColor: 'rgba(6, 12, 22, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.28s ease',
        }}
      />

      {/* ── Drawer ── */}
      <div
        className="md:hidden fixed inset-y-0 left-0 z-50 flex flex-col"
        style={{
          width: 288,
          backgroundColor: '#0D1929',
          borderRight: '1px solid rgba(255,203,8,0.12)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          willChange: 'transform',
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 pt-5 pb-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 3,
                height: 32,
                backgroundColor: '#FFCB08',
              }}
            />
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 900,
                  fontSize: 19,
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                  lineHeight: 1,
                }}
              >
                PENATEC
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 600,
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,203,8,0.65)',
                  marginTop: 3,
                }}
              >
                Admin Panel
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
            className="flex items-center justify-center transition-all duration-150 active:scale-95"
            style={{
              width: 32,
              height: 32,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 px-3 pt-5 overflow-y-auto">
          <p
            className="px-3 mb-2"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 700,
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            Catálogo
          </p>

          {NAV.map(({ href, label, Icon }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 transition-all duration-150 active:scale-[0.98]"
                style={{
                  padding: '13px 12px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '0.01em',
                  color: isActive ? '#FFCB08' : 'rgba(255,255,255,0.55)',
                  backgroundColor: isActive ? 'rgba(255,203,8,0.08)' : 'transparent',
                  borderLeft: `2px solid ${isActive ? '#FFCB08' : 'transparent'}`,
                  marginLeft: -1,
                }}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Drawer footer */}
        <div
          className="px-3 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3.5 transition-colors duration-150 active:scale-[0.98]"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
          >
            <LogOut size={14} strokeWidth={2} />
            Sair da conta
          </button>
        </div>
      </div>
    </>
  )
}
