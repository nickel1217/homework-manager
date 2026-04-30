import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

interface HomeworkFormProps {
  onSave: (subject: string, content: string, duration: number, imageUrl?: string) => Promise<void>
  duration: number
}

const SUBJECT_OPTIONS = ['语文', '数学', '英语', '科学', '其他'] as const

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result

      if (typeof result === 'string') {
        resolve(result)
        return
      }

      reject(new Error('无法读取图片'))
    }

    reader.onerror = () => {
      reject(new Error('无法读取图片'))
    }

    reader.readAsDataURL(file)
  })
}

function HomeworkForm({ onSave, duration }: HomeworkFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [saving, setSaving] = useState(false)

  const isFormValid = subject.trim() !== '' && content.trim() !== ''

  const resetForm = () => {
    setSubject('')
    setContent('')
    setImageUrl(undefined)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      setImageUrl(undefined)
      return
    }

    try {
      const dataUrl = await readFileAsDataUrl(file)
      setImageUrl(dataUrl)
    } catch {
      setImageUrl(undefined)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid || saving) {
      return
    }

    setSaving(true)

    try {
      await onSave(subject, content.trim(), duration, imageUrl)
      resetForm()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-base font-semibold text-slate-700" htmlFor="homework-subject">
          作业科目
        </label>
        <select
          id="homework-subject"
          className="w-full appearance-none rounded-[1.75rem] border border-indigo-200/80 bg-white px-5 py-4 text-lg font-semibold text-slate-800 shadow-[0_12px_28px_rgba(99,102,241,0.10)] outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          disabled={saving}
          onChange={(event) => setSubject(event.target.value)}
          value={subject}
        >
          <option value="">请选择科目</option>
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-base font-semibold text-slate-700" htmlFor="homework-content">
          作业内容
        </label>
        <textarea
          id="homework-content"
          className="min-h-36 w-full rounded-3xl border border-sky-200 bg-white px-4 py-4 text-lg text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          disabled={saving}
          onChange={(event) => setContent(event.target.value)}
          placeholder="写下今天的作业内容..."
          value={content}
        />
      </div>

      <div className="space-y-3">
        <span className="block text-base font-semibold text-slate-700">拍照上传</span>
        <input
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          className="sr-only"
          disabled={saving}
          id="homework-photo"
          onChange={handleFileChange}
          type="file"
        />

        <div className="flex items-center gap-3">
          <label
            className="inline-flex min-h-14 flex-1 cursor-pointer items-center justify-center rounded-[1.75rem] bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-400 px-4 py-4 text-lg font-black text-white shadow-lg shadow-rose-200 transition hover:scale-[1.02] hover:from-fuchsia-400 hover:via-rose-400 hover:to-orange-300 active:scale-95"
            htmlFor="homework-photo"
          >
            📸 打开相机
          </label>

          {imageUrl ? (
            <img
              alt="作业照片预览"
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-amber-200"
              src={imageUrl}
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-2xl ring-2 ring-amber-100">
              🖼️
            </div>
          )}
        </div>
      </div>

      <button
        className="w-full rounded-3xl bg-indigo-500 px-4 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        disabled={!isFormValid || saving}
        type="submit"
      >
        {saving ? '保存中...' : '保存作业'}
      </button>
    </form>
  )
}

export default HomeworkForm
