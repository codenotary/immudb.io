import type { DefaultTheme } from 'vitepress'

export const v131Sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/1.3.1/' },
      { text: 'About immudb', link: '/1.3.1/immudb' },
      { text: 'Playground', link: '/1.3.1/playground' }
    ]
  },
  {
    text: 'Running immudb',
    collapsed: true,
    items: [
      { text: 'Download', link: '/1.3.1/running/download' },
      { text: 'Service', link: '/1.3.1/running/service' },
      { text: 'Build', link: '/1.3.1/running/build' },
      { text: 'Configuration', link: '/1.3.1/running/configuration' }
    ]
  },
  {
    text: 'immudb in production',
    collapsed: true,
    items: [
      { text: 'Planning', link: '/1.3.1/production/planning' },
      { text: 'Monitoring', link: '/1.3.1/production/monitoring' },
      { text: 'Auditor', link: '/1.3.1/production/auditor' },
      { text: 'Index Maintenance', link: '/1.3.1/production/index-maintenance' },
      { text: 'Backup', link: '/1.3.1/production/backup' },
      { text: 'Replication', link: '/1.3.1/production/replication' },
      { text: 'Sync Replication', link: '/1.3.1/production/sync-replication' },
      { text: 'FIPS', link: '/1.3.1/production/fips' },
      { text: 'S3 Storage', link: '/1.3.1/production/s3-storage' },
      { text: 'Backwards Compatibility', link: '/1.3.1/production/backwards-compatibility' },
      { text: 'Performance Guide', link: '/1.3.1/production/performance-guide' }
    ]
  },
  {
    text: 'Connecting with immudb',
    collapsed: true,
    items: [
      { text: 'Web Console', link: '/1.3.1/connecting/webconsole' },
      { text: 'CLI Tools', link: '/1.3.1/connecting/clitools' },
      { text: 'SDKs', link: '/1.3.1/connecting/sdks' },
      { text: 'immu Gateway', link: '/1.3.1/connecting/immugw' },
      { text: 'Authentication', link: '/1.3.1/connecting/authentication' },
      { text: 'Health Check', link: '/1.3.1/connecting/healthcheck' }
    ]
  },
  {
    text: 'Management',
    collapsed: true,
    items: [
      { text: 'User Management', link: '/1.3.1/management/user' },
      { text: 'Database Management', link: '/1.3.1/management/database' },
      { text: 'State Management', link: '/1.3.1/management/state' }
    ]
  },
  {
    text: 'Develop',
    collapsed: true,
    items: [
      { text: 'Connection', link: '/1.3.1/develop/connection' },
      { text: 'Operations', link: '/1.3.1/develop/operations' },
      { text: 'Management', link: '/1.3.1/develop/management' },
      { text: 'immu Gateway', link: '/1.3.1/develop/immugw' },
      { text: 'APIs', link: '/1.3.1/develop/apis' }
    ]
  },
  {
    text: 'Develop with Key Value',
    collapsed: true,
    items: [
      { text: 'Reading', link: '/1.3.1/develop/reading' },
      { text: 'History', link: '/1.3.1/develop/history' },
      { text: 'Indexes', link: '/1.3.1/develop/indexes' },
      { text: 'Transactions', link: '/1.3.1/develop/transactions' },
      { text: 'Deleting', link: '/1.3.1/develop/deleting' },
      { text: 'Expiration', link: '/1.3.1/develop/expiration' },
      { text: 'Embedding', link: '/1.3.1/develop/embedding' },
      { text: 'Streams', link: '/1.3.1/develop/streams' }
    ]
  },
  {
    text: 'Develop with SQL',
    collapsed: true,
    items: [
      { text: 'Transactions', link: '/1.3.1/develop/sql/transactions' },
      { text: 'Data Types', link: '/1.3.1/develop/sql/datatypes' },
      { text: 'Create Tables', link: '/1.3.1/develop/sql/tablescreate' },
      { text: 'Alter Tables', link: '/1.3.1/develop/sql/tablesalter' },
      { text: 'Insert & Update', link: '/1.3.1/develop/sql/insertupdate' },
      { text: 'Indexes', link: '/1.3.1/develop/sql/indexes' },
      { text: 'Querying', link: '/1.3.1/develop/sql/querying' },
      { text: 'Catalog', link: '/1.3.1/develop/sql/catalog' },
      { text: 'SQL Standard Library', link: '/1.3.1/develop/sql/sqlstdlib' },
      { text: 'PostgreSQL Compatibility', link: '/1.3.1/develop/sql/pg' },
      { text: 'Embedding SQL', link: '/1.3.1/develop/sql/embeddingSQL' }
    ]
  },
  {
    text: 'Release Notes',
    collapsed: true,
    items: [
      { text: 'Version History', link: '/1.3.1/releasenotes' }
    ]
  }
]
