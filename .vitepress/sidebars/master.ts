import type { DefaultTheme } from 'vitepress'

export const masterSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/master/' },
      { text: 'About immudb', link: '/master/immudb' },
      { text: 'Playground', link: '/master/playground' }
    ]
  },
  {
    text: 'Running immudb',
    collapsed: true,
    items: [
      { text: 'Download', link: '/master/running/download' },
      { text: 'Service', link: '/master/running/service' },
      { text: 'Build', link: '/master/running/build' },
      { text: 'Configuration', link: '/master/running/configuration' }
    ]
  },
  {
    text: 'Running samples',
    collapsed: true,
    items: [
      { text: 'Go Samples', link: '/master/samples/go' }
    ]
  },
  {
    text: 'immudb in production',
    collapsed: true,
    items: [
      { text: 'Planning', link: '/master/production/planning' },
      { text: 'Monitoring', link: '/master/production/monitoring' },
      { text: 'Auditor', link: '/master/production/auditor' },
      { text: 'Index Maintenance', link: '/master/production/index-maintenance' },
      { text: 'Backup', link: '/master/production/backup' },
      { text: 'Replication', link: '/master/production/replication' },
      { text: 'Sync Replication', link: '/master/production/sync-replication' },
      { text: 'FIPS', link: '/master/production/fips' },
      { text: 'S3 Storage', link: '/master/production/s3-storage' },
      { text: 'Backwards Compatibility', link: '/master/production/backwards-compatibility' },
      { text: 'Performance Guide', link: '/master/production/performance-guide' },
      { text: 'Retention', link: '/master/production/retention' },
      { text: 'Request Metadata', link: '/master/production/request-metadata' }
    ]
  },
  {
    text: 'Connecting with immudb',
    collapsed: true,
    items: [
      { text: 'Web Console', link: '/master/connecting/webconsole' },
      { text: 'CLI Tools', link: '/master/connecting/clitools' },
      { text: 'SDKs', link: '/master/connecting/sdks' },
      { text: 'immu Gateway', link: '/master/connecting/immugw' },
      { text: 'Authentication', link: '/master/connecting/authentication' },
      { text: 'Health Check', link: '/master/connecting/healthcheck' }
    ]
  },
  {
    text: 'Management',
    collapsed: true,
    items: [
      { text: 'User Management', link: '/master/management/user' },
      { text: 'Database Management', link: '/master/management/database' },
      { text: 'State Management', link: '/master/management/state' }
    ]
  },
  {
    text: 'Develop with Key Value',
    collapsed: true,
    items: [
      { text: 'Reading', link: '/master/develop/reading' },
      { text: 'Queries & History', link: '/master/develop/queries-history' },
      { text: 'Indexes', link: '/master/develop/indexes' },
      { text: 'Transactions', link: '/master/develop/transactions' },
      { text: 'Deleting', link: '/master/develop/deleting' },
      { text: 'Expiration', link: '/master/develop/expiration' },
      { text: 'Streams', link: '/master/develop/streams' }
    ]
  },
  {
    text: 'Develop with SQL',
    collapsed: true,
    items: [
      { text: 'Transactions', link: '/master/develop/sql/transactions' },
      { text: 'Data Types', link: '/master/develop/sql/datatypes' },
      { text: 'Create Tables', link: '/master/develop/sql/tablescreate' },
      { text: 'Alter Tables', link: '/master/develop/sql/tablesalter' },
      { text: 'Drop Tables', link: '/master/develop/sql/tablesdrop' },
      { text: 'Insert & Update', link: '/master/develop/sql/insertupdate' },
      { text: 'Indexes', link: '/master/develop/sql/indexes' },
      { text: 'Querying', link: '/master/develop/sql/querying' },
      { text: 'Users', link: '/master/develop/sql/users' },
      { text: 'Privileges', link: '/master/develop/sql/privileges' },
      { text: 'Catalog', link: '/master/develop/sql/catalog' },
      { text: 'SQL Standard Library', link: '/master/develop/sql/sqlstdlib' },
      { text: 'PostgreSQL Compatibility', link: '/master/develop/sql/pg' }
    ]
  },
  {
    text: 'Develop with Document',
    collapsed: true,
    items: [
      { text: 'Data Model', link: '/master/develop/document/datamodel' },
      { text: 'API', link: '/master/develop/document/api' }
    ]
  },
  {
    text: 'Embedded',
    collapsed: true,
    items: [
      { text: 'Embedding immudb', link: '/master/embedded/embedding' },
      { text: 'Embedding SQL', link: '/master/embedded/embeddingSQL' }
    ]
  },
  {
    text: 'Release Notes',
    collapsed: true,
    items: [
      { text: 'Version History', link: '/master/releasenotes' }
    ]
  }
]
