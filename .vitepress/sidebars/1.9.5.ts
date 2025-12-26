import type { DefaultTheme } from 'vitepress'

export const v195Sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/1.9.5/' },
      { text: 'About immudb', link: '/1.9.5/immudb' },
      { text: 'Playground', link: '/1.9.5/playground' }
    ]
  },
  {
    text: 'Running immudb',
    collapsed: true,
    items: [
      { text: 'Download', link: '/1.9.5/running/download' },
      { text: 'Service', link: '/1.9.5/running/service' },
      { text: 'Build', link: '/1.9.5/running/build' },
      { text: 'Configuration', link: '/1.9.5/running/configuration' }
    ]
  },
  {
    text: 'Running samples',
    collapsed: true,
    items: [
      { text: 'Go Samples', link: '/1.9.5/samples/go' }
    ]
  },
  {
    text: 'immudb in production',
    collapsed: true,
    items: [
      { text: 'Planning', link: '/1.9.5/production/planning' },
      { text: 'Monitoring', link: '/1.9.5/production/monitoring' },
      { text: 'Auditor', link: '/1.9.5/production/auditor' },
      { text: 'Index Maintenance', link: '/1.9.5/production/index-maintenance' },
      { text: 'Backup', link: '/1.9.5/production/backup' },
      { text: 'Replication', link: '/1.9.5/production/replication' },
      { text: 'Sync Replication', link: '/1.9.5/production/sync-replication' },
      { text: 'FIPS', link: '/1.9.5/production/fips' },
      { text: 'S3 Storage', link: '/1.9.5/production/s3-storage' },
      { text: 'Backwards Compatibility', link: '/1.9.5/production/backwards-compatibility' },
      { text: 'Performance Guide', link: '/1.9.5/production/performance-guide' },
      { text: 'Retention', link: '/1.9.5/production/retention' }
    ]
  },
  {
    text: 'Connecting with immudb',
    collapsed: true,
    items: [
      { text: 'Web Console', link: '/1.9.5/connecting/webconsole' },
      { text: 'CLI Tools', link: '/1.9.5/connecting/clitools' },
      { text: 'SDKs', link: '/1.9.5/connecting/sdks' },
      { text: 'immu Gateway', link: '/1.9.5/connecting/immugw' },
      { text: 'Authentication', link: '/1.9.5/connecting/authentication' },
      { text: 'Health Check', link: '/1.9.5/connecting/healthcheck' }
    ]
  },
  {
    text: 'Management',
    collapsed: true,
    items: [
      { text: 'User Management', link: '/1.9.5/management/user' },
      { text: 'Database Management', link: '/1.9.5/management/database' },
      { text: 'State Management', link: '/1.9.5/management/state' }
    ]
  },
  {
    text: 'Develop with Key Value',
    collapsed: true,
    items: [
      { text: 'Reading', link: '/1.9.5/develop/reading' },
      { text: 'Queries & History', link: '/1.9.5/develop/queries-history' },
      { text: 'Indexes', link: '/1.9.5/develop/indexes' },
      { text: 'Transactions', link: '/1.9.5/develop/transactions' },
      { text: 'Deleting', link: '/1.9.5/develop/deleting' },
      { text: 'Expiration', link: '/1.9.5/develop/expiration' },
      { text: 'Streams', link: '/1.9.5/develop/streams' }
    ]
  },
  {
    text: 'Develop with SQL',
    collapsed: true,
    items: [
      { text: 'Transactions', link: '/1.9.5/develop/sql/transactions' },
      { text: 'Data Types', link: '/1.9.5/develop/sql/datatypes' },
      { text: 'Create Tables', link: '/1.9.5/develop/sql/tablescreate' },
      { text: 'Alter Tables', link: '/1.9.5/develop/sql/tablesalter' },
      { text: 'Insert & Update', link: '/1.9.5/develop/sql/insertupdate' },
      { text: 'Indexes', link: '/1.9.5/develop/sql/indexes' },
      { text: 'Querying', link: '/1.9.5/develop/sql/querying' },
      { text: 'Catalog', link: '/1.9.5/develop/sql/catalog' },
      { text: 'SQL Standard Library', link: '/1.9.5/develop/sql/sqlstdlib' },
      { text: 'PostgreSQL Compatibility', link: '/1.9.5/develop/sql/pg' }
    ]
  },
  {
    text: 'Develop with Document',
    collapsed: true,
    items: [
      { text: 'Data Model', link: '/1.9.5/develop/document/datamodel' },
      { text: 'API', link: '/1.9.5/develop/document/api' }
    ]
  },
  {
    text: 'Embedded',
    collapsed: true,
    items: [
      { text: 'Embedding immudb', link: '/1.9.5/embedded/embedding' },
      { text: 'Embedding SQL', link: '/1.9.5/embedded/embeddingSQL' }
    ]
  },
  {
    text: 'Release Notes',
    collapsed: true,
    items: [
      { text: 'Version History', link: '/1.9.5/releasenotes' }
    ]
  }
]
