import type { SVGProps } from 'react'
import { NavLink } from 'react-router-dom'

interface TabItem {
  to: string
  label: string
  textClassName: string
  iconClassName: string
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

const tabItems: TabItem[] = [
  {
    to: '/',
    label: '作业',
    textClassName: 'text-indigo-500',
    iconClassName: 'bg-indigo-100 text-indigo-500 ring-4 ring-indigo-50',
    Icon: HomeworkIcon,
  },
  {
    to: '/exams',
    label: '考试',
    textClassName: 'text-emerald-500',
    iconClassName: 'bg-emerald-100 text-emerald-500 ring-4 ring-emerald-50',
    Icon: ExamIcon,
  },
  {
    to: '/rewards',
    label: '积分',
    textClassName: 'text-amber-500',
    iconClassName: 'bg-amber-100 text-amber-500 ring-4 ring-amber-50',
    Icon: RewardsIcon,
  },
  {
    to: '/profile',
    label: '我的',
    textClassName: 'text-rose-500',
    iconClassName: 'bg-rose-100 text-rose-500 ring-4 ring-rose-50',
    Icon: ProfileIcon,
  },
]

const joinClasses = (...classes: Array<string | undefined | false>): string =>
  classes.filter((value): value is string => Boolean(value)).join(' ')

function TabNav() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-6">
      <nav
        aria-label="底部导航"
        className="pointer-events-auto mx-auto flex max-w-md items-center justify-around gap-1 rounded-[2rem] bg-white px-3 py-3 shadow-lg shadow-slate-300/40"
      >
        {tabItems.map(({ to, label, textClassName, iconClassName, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={label}
            className="flex flex-1"
          >
            {({ isActive }) => (
              <span className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5">
                <span
                  className={joinClasses(
                    'flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 active:scale-95',
                    isActive ? iconClassName : 'bg-slate-100 text-slate-400',
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span
                  className={joinClasses(
                    'text-xs font-bold leading-none',
                    isActive ? textClassName : 'text-slate-400',
                  )}
                >
                  {label}
                </span>
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function HomeworkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.75 6.75A2.75 2.75 0 0 1 7.5 4h7.56c.73 0 1.43.29 1.94.8l1.2 1.2c.51.51.8 1.21.8 1.93v8.82a2.75 2.75 0 0 1-2.75 2.75H7.5a2.75 2.75 0 0 1-2.75-2.75V6.75Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9.5h8M8 13h5.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m13.5 17.5 4.6-4.6 1.4 1.4-4.6 4.6-2.15.75.75-2.15Z" />
    </svg>
  )
}

function ExamIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="6" y="4.5" width="12" height="15" rx="2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.5h6M9 13h6M9 16.5h3.5" />
    </svg>
  )
}

function RewardsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 3.9 2.25 4.56 5.03.73-3.64 3.55.86 5.01L12 15.38l-4.5 2.37.86-5.01-3.64-3.55 5.03-.73L12 3.9Z" />
    </svg>
  )
}

function ProfileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="8.25" r="3.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.75 18.25a6.25 6.25 0 0 1 12.5 0" />
    </svg>
  )
}

export default TabNav
