const GITHUB_API = 'https://api.github.com'

function getUserFriendlyError(err: unknown, fallbackMessage: string): string {
  if (err instanceof Error) {
    if (err.message.includes('GitHub 配置缺失')) {
      return 'GitHub 数据配置缺失，请先在仓库 Variables/Secrets 中配置并重新部署。'
    }

    if (err.message.includes('401')) {
      return 'GitHub Token 无效或已过期，请检查仓库 Secret 配置。'
    }

    if (err.message.includes('403')) {
      return 'GitHub 请求被拒绝，请检查 Token 权限或稍后再试。'
    }

    if (err.message.includes('404')) {
      return 'GitHub 数据文件或仓库路径不存在，请检查数据仓库名称、分支和文件结构。'
    }
  }

  return fallbackMessage
}

function getConfig() {
  const owner = import.meta.env.VITE_GITHUB_OWNER as string
  const repo = import.meta.env.VITE_GITHUB_DATA_REPO as string
  const token = import.meta.env.VITE_GITHUB_TOKEN as string
  const branch = (import.meta.env.VITE_GITHUB_BRANCH as string) || 'main'

  if (!owner || !repo || !token) {
    throw new Error('GitHub 配置缺失：请设置 VITE_GITHUB_OWNER, VITE_GITHUB_DATA_REPO, VITE_GITHUB_TOKEN')
  }

  return { owner, repo, token, branch }
}

function headers() {
  const { token } = getConfig()
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  }
}

interface FileMetadata {
  sha: string
  content: string
}

function decodeBase64Utf8(content: string): string {
  const normalizedContent = content.replace(/\n/g, '')
  const binary = atob(normalizedContent)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return new TextDecoder('utf-8').decode(bytes)
}

async function getRawFile(path: string): Promise<FileMetadata | null> {
  const { owner, repo, branch } = getConfig()
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`

  const res = await fetch(url, { headers: headers() })

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error(`GitHub API 错误: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return {
    sha: data.sha as string,
    content: decodeBase64Utf8(data.content as string),
  }
}

export async function readJsonFile<T>(path: string): Promise<T | null> {
  try {
    const file = await getRawFile(path)
    if (!file) return null
    return JSON.parse(file.content) as T
  } catch (err) {
    console.error(`读取文件失败: ${path}`, err)
    throw new Error(getUserFriendlyError(err, '无法读取数据，请检查网络连接'))
  }
}

export async function writeJsonFile<T>(path: string, data: T, message?: string): Promise<void> {
  try {
    const { owner, repo, branch } = getConfig()
    const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))

    const res = await fetch(url, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        message: message || `更新 ${path}`,
        content,
        branch,
      }),
    })

    if (!res.ok) {
      throw new Error(`GitHub API 错误: ${res.status}`)
    }
  } catch (err) {
    console.error(`写入文件失败: ${path}`, err)
    throw new Error(getUserFriendlyError(err, '无法保存数据，请检查网络连接'))
  }
}

export async function updateJsonFile<T>(path: string, data: T, message?: string): Promise<void> {
  try {
    const { owner, repo, branch } = getConfig()
    const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`

    const existing = await getRawFile(path)
    if (!existing) {
      throw new Error(`文件不存在: ${path}`)
    }

    const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))

    const res = await fetch(url, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        message: message || `更新 ${path}`,
        content,
        sha: existing.sha,
        branch,
      }),
    })

    if (!res.ok) {
      throw new Error(`GitHub API 错误: ${res.status}`)
    }
  } catch (err) {
    console.error(`更新文件失败: ${path}`, err)
    throw new Error(getUserFriendlyError(err, '无法更新数据，请检查网络连接'))
  }
}

export async function upsertJsonFile<T>(path: string, data: T, message?: string): Promise<void> {
  try {
    const { owner, repo, branch } = getConfig()
    const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`

    const existing = await getRawFile(path)
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))

    const body: Record<string, string> = {
      message: message || `更新 ${path}`,
      content,
      branch,
    }

    if (existing) {
      body.sha = existing.sha
    }

    const res = await fetch(url, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error(`GitHub API 错误: ${res.status}`)
    }
  } catch (err) {
    console.error(`upsert 文件失败: ${path}`, err)
    throw new Error(getUserFriendlyError(err, '无法保存数据，请检查网络连接'))
  }
}
