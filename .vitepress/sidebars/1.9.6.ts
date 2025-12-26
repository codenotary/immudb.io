import type { DefaultTheme } from 'vitepress'

export const v196Sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/1.9.6/' },
      { text: 'About immudb', link: '/1.9.6/immudb' },
      { text: 'Playground', link: '/1.9.6/playground' }
    ]
  },
  {
    text: 'Running immudb',
    collapsed: true,
    items: [
      { text: 'Download', link: '/1.9.6/running/download' },
      { text: 'Service', link: '/1.9.6/running/service' },
      { text: 'Build', link: '/1.9.6/running/build' },
      { text: 'Configuration', link: '/1.9.6/running/configuration' }
    ]
  },
  {
    text: 'Running samples',
    collapsed: true,
    items: [
      { text: 'Go Samples', link: '/1.9.6/samples/go' }
    ]
  },
  {
    text: 'immudb in production',
    collapsed: true,
    items: [
      { text: 'Planning', link: '/1.9.6/production/planning' },
      { text: 'Monitoring', link: '/1.9.6/production/monitoring' },
      { text: 'Auditor', link: '/1.9.6/production/auditor' },
      { text: 'Index Maintenance', link: '/1.9.6/production/index-maintenance' },
      { text: 'Backup', link: '/1.9.6/production/backup' },
      { text: 'Replication', link: '/1.9.6/production/replication' },
      { text: 'Sync Replication', link: '/1.9.6/production/sync-replication' },
      { text: 'FIPS', link: '/1.9.6/production/fips' },
      { text: 'S3 Storage', link: '/1.9.6/production/s3-storage' },
      { text: 'Backwards Compatibility', link: '/1.9.6/production/backwards-compatibility' },
      { text: 'Performance Guide', link: '/1.9.6/production/performance-guide' },
      { text: 'Retention', link: '/1.9.6/production/retention' },
      { text: 'Request Metadata', link: '/1.9.6/production/request-metadata' }
    ]
  },
  {
    text: 'Connecting with immudb',
    collapsed: true,
    items: [
      { text: 'Web Console', link: '/1.9.6/connecting/webconsole' },
      { text: 'CLI Tools', link: '/1.9.6/connecting/clitools' },
      { text: 'SDKs', link: '/1.9.6/connecting/sdks' },
      { text: 'immu Gateway', link: '/1.9.6/connecting/immugw' },
      { text: 'Authentication', link: '/1.9.6/connecting/authentication' },
      { text: 'Health Check', link: '/1.9.6/connecting/healthcheck' }
    ]
  },
  {
    text: 'Management',
    collapsed: true,
    items: [
      { text: 'User Management', link: '/1.9.6/management/user' },
      { text: 'Database Management', link: '/1.9.6/management/database' },
      { text: 'State Management', link: '/1.9.6/management/state' }
    ]
  },
  {
    text: 'Develop with Key Value',
    collapsed: true,
    items: [
      { text: 'Reading', link: '/1.9.6/develop/reading' },
      { text: 'Queries & History', link: '/1.9.6/develop/queries-history' },
      { text: 'Indexes', link: '/1.9.6/develop/indexes' },
      { text: 'Transactions', link: '/1.9.6/develop/transactions' },
      { text: 'Deleting', link: '/1.9.6/develop/deleting' },
      { text: 'Expiration', link: '/1.9.6/develop/expiration' },
      { text: 'Streams', link: '/1.9.6/develop/streams' }
    ]
  },
  {
    text: 'Develop with SQL',
    collapsed: true,
    items: [
      { text: 'Transactions', link: '/1.9.6/develop/sql/transactions' },
      { text: 'Data Types', link: '/1.9.6/develop/sql/datatypes' },
      { text: 'Create Tables', link: '/1.9.6/develop/sql/tablescreate' },
      { text: 'Alter Tables', link: '/1.9.6/develop/sql/tablesalter' },
      { text: 'Drop Tables', link: '/1.9.6/develop/sql/tablesdrop' },
      { text: 'Insert & Update', link: '/1.9.6/develop/sql/insertupdate' },
      { text: 'Indexes', link: '/1.9.6/develop/sql/indexes' },
      { text: 'Querying', link: '/1.9.6/develop/sql/querying' },
      { text: 'Users', link: '/1.9.6/develop/sql/users' },
      { text: 'Privileges', link: '/1.9.6/develop/sql/privileges' },
      { text: 'Catalog', link: '/1.9.6/develop/sql/catalog' },
      { text: 'SQL Standard Library', link: '/1.9.6/develop/sql/sqlstdlib' },
      { text: 'PostgreSQL Compatibility', link: '/1.9.6/develop/sql/pg' }
    ]
  },
  {
    text: 'Develop with Document',
    collapsed: true,
    items: [
      { text: 'Data Model', link: '/1.9.6/develop/document/datamodel' },
      { text: 'API', link: '/1.9.6/develop/document/api' }
    ]
  },
  {
    text: 'Embedded',
    collapsed: true,
    items: [
      { text: 'Embedding immudb', link: '/1.9.6/embedded/embedding' },
      { text: 'Embedding SQL', link: '/1.9.6/embedded/embeddingSQL' }
    ]
  },
  {
    text: 'Release Notes',
    collapsed: true,
    items: [
      { text: 'Version History', link: '/1.9.6/releasenotes' }
    ]
  }
]
