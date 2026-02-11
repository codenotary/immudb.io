export default version => {
  let sidebar = []

  /* WELCOME SECTION START */
  const introduction = {
    title: 'Introduction',
    collapsable: true,
    sidebarDepth: 1,
    initialOpenGroupIndex: -1,
    children: [
      `${version}/`,
      `${version}/immudb`,
    ]
  };
  /* WELCOME SECTION END */

  /* RUNNING IMMUDB SECTION START */
  const runningImmudb = {
    title: 'Running immudb',
    collapsable: true,
    children: [
    ]
  };

  runningImmudb.children.push(`${version}/running/download`);
  runningImmudb.children.push(`${version}/running/service`);
  runningImmudb.children.push(`${version}/running/build`);
  runningImmudb.children.push(`${version}/running/configuration`);
  /* RUNNING IMMUDB SECTION END */

  /* IMMUDB IN PRODUCTION SECTION START */
  const immudbInProduction = {
    title: 'immudb in production',
    collapsable: true,
    children: [
    ]
  };

  immudbInProduction.children.push(`${version}/production/planning`);
  immudbInProduction.children.push(`${version}/production/monitoring`);
  immudbInProduction.children.push(`${version}/production/auditor`);
  immudbInProduction.children.push(`${version}/production/index-maintenance`);
  immudbInProduction.children.push(`${version}/production/backup`);
  immudbInProduction.children.push(`${version}/production/replication`);
  immudbInProduction.children.push(`${version}/production/sync-replication`);
  immudbInProduction.children.push(`${version}/production/fips`);
  immudbInProduction.children.push(`${version}/production/s3-storage`);
  immudbInProduction.children.push(`${version}/production/backwards-compatibility`);
  immudbInProduction.children.push(`${version}/production/performance-guide`);
  /* RUNNING IMMUDB IN PRODUCTION SECTION END */

  /* CONNECTING SECTION START */
  let connecting = {
      title: 'Connecting with immudb',
      collapsable: true,
      children: [
      ]
  };

  connecting.children.push(`${version}/connecting/webconsole`);
  connecting.children.push(`${version}/connecting/clitools`);
  connecting.children.push(`${version}/connecting/sdks`);
  connecting.children.push(`${version}/connecting/immugw`);
  connecting.children.push(`${version}/connecting/authentication`);
  connecting.children.push(`${version}/connecting/healthcheck`);

  /* CONNECTING SECTION END */

  /* MANAGEMENT SECTION START */
  const management = {
    title: 'Management',
    collapsable: true,
    children: [
      `${version}/management/user`,
      `${version}/management/database`,
      `${version}/management/state`,
    ]
  };
  /* MANAGEMENT SECTION END */

  /* DEVELOP KV SECTION START */
  let developKV = {
      title: 'Develop with Key Value',
      collapsable: true,
      children: [
      ]
  };

  developKV.children.push(`${version}/develop/reading`);
  developKV.children.push(`${version}/develop/queries-history`);
  developKV.children.push(`${version}/develop/indexes`);
  developKV.children.push(`${version}/develop/transactions`);
  developKV.children.push(`${version}/develop/deleting`);
  developKV.children.push(`${version}/develop/expiration`);
  developKV.children.push(`${version}/develop/streams`);

  /* DEVELOP KV SECTION END */

  /* DEVELOP SQL SECTION START */
  let developSQL = {
      title: 'Develop with SQL',
      collapsable: true,
      children: [
      ]
  };

  developSQL.children.push(`${version}/develop/sql/transactions`);
  developSQL.children.push(`${version}/develop/sql/datatypes`);
  developSQL.children.push(`${version}/develop/sql/tablescreate`);
  developSQL.children.push(`${version}/develop/sql/tablesalter`);
  developSQL.children.push(`${version}/develop/sql/insertupdate`);
  developSQL.children.push(`${version}/develop/sql/indexes`);
  developSQL.children.push(`${version}/develop/sql/querying`);
  developSQL.children.push(`${version}/develop/sql/catalog`);
  developSQL.children.push(`${version}/develop/sql/sqlstdlib`);
  developSQL.children.push(`${version}/develop/sql/pg`);
  
  /* DEVELOP SQL SECTION END */

  /* EMBEDDED SECTION START */
  let embedded = {
    title: 'Embedded',
    collapsable: true,
    children: [
      `${version}/embedded/embedding`,
      `${version}/embedded/embeddingSQL`,
    ]
  };
  /* EMBEDDED SECTION END */

  /* RELEASE NOTES SECTION START */
  let releaseNotes = {
    title: 'Release Notes',
    collapsable: true,
    children: [
    ]
  };

  releaseNotes.children.push(`${version}/releasenotes`);
  
  /* RELEASE NOTES SECTION END */

  sidebar.push(introduction);
  sidebar.push(runningImmudb);
  sidebar.push(immudbInProduction);
  sidebar.push(connecting);
  sidebar.push(management);
  sidebar.push(developKV);
  sidebar.push(developSQL);
  sidebar.push(embedded);
  sidebar.push(releaseNotes);
  
  return sidebar;
}