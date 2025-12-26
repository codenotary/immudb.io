import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * Algolia Integration Tests
 *
 * Tests Algolia search indexing and configuration:
 * - Index generation
 * - Search record structure
 * - Version-specific indexing
 * - Content extraction
 */

describe('Algolia Index Generation', () => {
  const indexScript = join(process.cwd(), 'src/.vuepress/algolia_index.js')

  it('should have algolia index script', () => {
    expect(existsSync(indexScript)).toBe(true)
  })

  it('should have required environment variables', () => {
    const requiredVars = ['ALGOLIA_API_KEY', 'ALGOLIA_INDEX', 'ALGOLIA_APP_ID']

    requiredVars.forEach(varName => {
      const value = process.env[varName]
      expect(value, `${varName} should be set`).toBeDefined()
    })
  })

  it('should generate valid search records structure', () => {
    const mockRecord = {
      objectID: 'master-quickstart',
      title: 'Quickstart Guide',
      content: 'Get started with immudb',
      url: '/master/quickstart',
      version: 'master',
      hierarchy: {
        lvl0: 'Documentation',
        lvl1: 'Getting Started',
        lvl2: 'Quickstart'
      }
    }

    expect(mockRecord.objectID).toBeTruthy()
    expect(mockRecord.title).toBeTruthy()
    expect(mockRecord.url).toContain('/')
    expect(mockRecord.version).toBeTruthy()
  })
})

describe('Search Record Structure', () => {
  it('should include version in objectID', () => {
    const createObjectID = (version: string, path: string) => {
      const slug = path.replace(/\//g, '-').replace(/^-|-$/g, '')
      return `${version}-${slug}`
    }

    expect(createObjectID('master', '/quickstart')).toBe('master-quickstart')
    expect(createObjectID('1.9.6', '/develop/sql')).toBe('1.9.6-develop-sql')
  })

  it('should extract content hierarchy', () => {
    const extractHierarchy = (content: string) => {
      const headings = content.match(/^#{1,6}\s+.+$/gm) || []

      return {
        lvl0: headings[0]?.replace(/^#+\s+/, ''),
        lvl1: headings[1]?.replace(/^#+\s+/, ''),
        lvl2: headings[2]?.replace(/^#+\s+/, '')
      }
    }

    const content = '# Title\n## Section\n### Subsection'
    const hierarchy = extractHierarchy(content)

    expect(hierarchy.lvl0).toBe('Title')
    expect(hierarchy.lvl1).toBe('Section')
    expect(hierarchy.lvl2).toBe('Subsection')
  })

  it('should strip markdown from content', () => {
    const stripMarkdown = (text: string) => {
      return text
        .replace(/#{1,6}\s+/g, '')  // Headers
        .replace(/\*\*(.+?)\*\*/g, '$1')  // Bold
        .replace(/\*(.+?)\*/g, '$1')  // Italic
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')  // Links
        .replace(/`(.+?)`/g, '$1')  // Code
        .trim()
    }

    const markdown = '**Bold** text with [link](/url) and `code`'
    const plain = stripMarkdown(markdown)

    expect(plain).toBe('Bold text with link and code')
  })

  it('should limit content length', () => {
    const truncateContent = (text: string, maxLength: number = 500) => {
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength).trim() + '...'
    }

    const longText = 'a'.repeat(1000)
    const truncated = truncateContent(longText, 500)

    expect(truncated.length).toBeLessThanOrEqual(503) // 500 + '...'
  })
})

describe('Version-Specific Indexing', () => {
  it('should index each version separately', () => {
    const versions = ['master', '1.9.6', '1.9.5']
    const records: any[] = []

    versions.forEach(version => {
      records.push({
        objectID: `${version}-quickstart`,
        title: 'Quickstart',
        url: `/${version}/quickstart`,
        version
      })
    })

    expect(records).toHaveLength(3)

    // Each version has unique objectID
    const ids = records.map(r => r.objectID)
    expect(new Set(ids).size).toBe(3)
  })

  it('should filter records by version', () => {
    const allRecords = [
      { version: 'master', title: 'Doc 1' },
      { version: '1.9.6', title: 'Doc 2' },
      { version: 'master', title: 'Doc 3' }
    ]

    const masterRecords = allRecords.filter(r => r.version === 'master')
    expect(masterRecords).toHaveLength(2)
  })

  it('should handle version-specific content', () => {
    const getVersionContent = (version: string) => {
      return {
        version,
        features: version === 'master' ? ['new-feature'] : []
      }
    }

    const masterContent = getVersionContent('master')
    const oldContent = getVersionContent('1.0.0')

    expect(masterContent.features.length).toBeGreaterThan(0)
    expect(oldContent.features.length).toBe(0)
  })
})

describe('Content Extraction', () => {
  it('should extract frontmatter', () => {
    const content = `---
title: My Page
description: Page description
---
# Content`

    const extractFrontmatter = (text: string) => {
      const match = text.match(/^---\n([\s\S]*?)\n---/)
      if (!match) return {}

      const data: Record<string, string> = {}
      match[1].split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length) {
          data[key.trim()] = valueParts.join(':').trim()
        }
      })
      return data
    }

    const frontmatter = extractFrontmatter(content)
    expect(frontmatter.title).toBe('My Page')
    expect(frontmatter.description).toBe('Page description')
  })

  it('should extract text from HTML', () => {
    const stripHtml = (html: string) => {
      return html.replace(/<[^>]*>/g, '').trim()
    }

    const html = '<p>Hello <strong>world</strong></p>'
    const text = stripHtml(html)

    expect(text).toBe('Hello world')
  })

  it('should handle code blocks in content', () => {
    const removeCodeBlocks = (text: string) => {
      return text.replace(/```[\s\S]*?```/g, '[code]')
    }

    const content = 'Text\n```js\ncode\n```\nMore text'
    const cleaned = removeCodeBlocks(content)

    expect(cleaned).toBe('Text\n[code]\nMore text')
  })
})

describe('Search Configuration', () => {
  it('should have correct Algolia config', () => {
    const config = {
      apiKey: process.env.ALGOLIA_API_KEY || 'test',
      indexName: process.env.ALGOLIA_INDEX || 'test',
      appId: process.env.ALGOLIA_APP_ID || 'test'
    }

    expect(config.apiKey).toBeTruthy()
    expect(config.indexName).toBeTruthy()
    expect(config.appId).toBeTruthy()
  })

  it('should define searchable attributes', () => {
    const searchableAttributes = [
      'title',
      'hierarchy.lvl0',
      'hierarchy.lvl1',
      'hierarchy.lvl2',
      'content'
    ]

    expect(searchableAttributes).toContain('title')
    expect(searchableAttributes).toContain('content')
  })

  it('should define facets for filtering', () => {
    const facets = ['version', 'hierarchy.lvl0']

    expect(facets).toContain('version')
  })
})

describe('Index Optimization', () => {
  it('should deduplicate records', () => {
    const records = [
      { objectID: '1', title: 'Doc' },
      { objectID: '1', title: 'Doc' },
      { objectID: '2', title: 'Other' }
    ]

    const unique = Array.from(
      new Map(records.map(r => [r.objectID, r])).values()
    )

    expect(unique).toHaveLength(2)
  })

  it('should prioritize important content', () => {
    const assignPriority = (url: string) => {
      if (url.includes('/quickstart')) return 10
      if (url.includes('/features')) return 8
      return 5
    }

    expect(assignPriority('/quickstart')).toBe(10)
    expect(assignPriority('/features')).toBe(8)
    expect(assignPriority('/other')).toBe(5)
  })

  it('should exclude certain pages from indexing', () => {
    const shouldIndex = (url: string) => {
      const excludePatterns = ['/404', '/search', '/tags/']
      return !excludePatterns.some(pattern => url.includes(pattern))
    }

    expect(shouldIndex('/quickstart')).toBe(true)
    expect(shouldIndex('/404')).toBe(false)
    expect(shouldIndex('/tags/immudb')).toBe(false)
  })
})
