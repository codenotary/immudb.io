# Protocol Documentation
<a name="top"></a>

<a name="immudb.schema.ImmuService"></a>

### ImmuService
Here a list of services exposed by immudb GRPc interface

#### Database services
immudb gRPC &amp; REST service
IMPORTANT: All get and safeget functions return base64-encoded keys and values, while all set and safeset functions expect base64-encoded inputs.

#### Database operational services
Following methods grant the basic immudb capabilities.
`Set` and `Get` are the primitive.
`SafeSet` and `SafeGet` counterparts do the primitive job but in addition they produce also  inclusion and consistency proofs.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Set | [KeyValue](#immudb.schema.KeyValue) | [Index](#immudb.schema.Index) |  |
| SafeSet | [SafeSetOptions](#immudb.schema.SafeSetOptions) | [Proof](#immudb.schema.Proof) |  |
| Get | [Key](#immudb.schema.Key) | [Item](#immudb.schema.Item) |  |
| SafeGet | [SafeGetOptions](#immudb.schema.SafeGetOptions) | [SafeItem](#immudb.schema.SafeItem) |  |

#### Insertion order index services
Following methods rely on internal immudb insertion order index.
Insertion order index is a special index appended on every leaf in the merkle tree. With this we benefit of the internal merkle tree natural insertion order index.
When we retrieve elements by index a first lookup is made on the leaf at the same index to discover the element key, then a second lookup is realized to retrieve the value.
`BySafeIndex` counterpart produces also the inclusion and consistency proofs.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| ByIndex | [Index](#immudb.schema.Index) | [Item](#immudb.schema.Item) |  |
| BySafeIndex | [SafeIndexOptions](#immudb.schema.SafeIndexOptions) | [SafeItem](#immudb.schema.SafeItem) |  |

#### Secondary indexes services
Thanks to the lexicographical order in which internal data is structured we exposed following methods.
`Reference` is like a "tag" operation, it append a reference on a key. As a consequence when we retrieve that reference/key with a `Get` or `SafeGet` the value retrieved will be the original value associated to the original key.
`SafeReference` counterpart is the same but in addition it produces also the inclusion and consistency proofs.
`ZAdd` operates internally in a similar manner to `Reference` but it introduces the concept of set. Inside a set we can organize collection of similar elements.
When we add an elements to a collection we can specify his score using a float value.
In `ZAdd` It's possible to specify also the index of the reference. In this way if there are multiple equals keys it will be inserted in the set the specified version.
To retrieve elements we can use `Zscan` methods with return elements sorted by their score. If elements are inserted with same score they are returned in a lexicographical order.
`SafeZAdd` counterpart produces also the inclusion and consistency proofs.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Reference | [ReferenceOptions](#immudb.schema.ReferenceOptions) | [Index](#immudb.schema.Index) |  |
| SafeReference | [SafeReferenceOptions](#immudb.schema.SafeReferenceOptions) | [Proof](#immudb.schema.Proof) |  |
| ZAdd | [ZAddOptions](#immudb.schema.ZAddOptions) | [Index](#immudb.schema.Index) |  |
| ZScan | [ZScanOptions](#immudb.schema.ZScanOptions) | [ItemList](#immudb.schema.ItemList) |  |
| SafeZAdd | [SafeZAddOptions](#immudb.schema.SafeZAddOptions) | [Proof](#immudb.schema.Proof) |  |

#### Tamperproofing services

`Inclusion` returns a path of nodes that can be used to prove that a node was correctly inserted inside the merkle tree.
`Consistency` returns a path of nodes that can be used to prove that a subtree contained in the main merkle tree is still the same.
`CurrentRoot` the last root of the tree.
The suggest approach to detect malicious action is to use an SDK and safe* family methods.

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Inclusion | [Index](#immudb.schema.Index) | [InclusionProof](#immudb.schema.InclusionProof) |  |
| Consistency | [Index](#immudb.schema.Index) | [ConsistencyProof](#immudb.schema.ConsistencyProof) |  |
| CurrentRoot | [.google.protobuf.Empty](#google.protobuf.Empty) | [Root](#immudb.schema.Root) |  |

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| IScan | [IScanOptions](#immudb.schema.IScanOptions) | [Page](#immudb.schema.Page) |  |
| Scan | [ScanOptions](#immudb.schema.ScanOptions) | [ItemList](#immudb.schema.ItemList) |  |
| Count | [KeyPrefix](#immudb.schema.KeyPrefix) | [ItemsCount](#immudb.schema.ItemsCount) |  |
| History | [Key](#immudb.schema.Key) | [ItemList](#immudb.schema.ItemList) |  |

#### Administrative services

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Health | [.google.protobuf.Empty](#google.protobuf.Empty) | [HealthResponse](#immudb.schema.HealthResponse) |  |
| ListUsers | [.google.protobuf.Empty](#google.protobuf.Empty) | [UserList](#immudb.schema.UserList) |  |
| CreateUser | [CreateUserRequest](#immudb.schema.CreateUserRequest) | [UserResponse](#immudb.schema.UserResponse) |  |
| ChangePassword | [ChangePasswordRequest](#immudb.schema.ChangePasswordRequest) | [.google.protobuf.Empty](#google.protobuf.Empty) |  |
| UpdateAuthConfig | [AuthConfig](#immudb.schema.AuthConfig) | [.google.protobuf.Empty](#google.protobuf.Empty) |  |
| UpdateMTLSConfig | [MTLSConfig](#immudb.schema.MTLSConfig) | [.google.protobuf.Empty](#google.protobuf.Empty) |  |
| PrintTree | [.google.protobuf.Empty](#google.protobuf.Empty) | [Tree](#immudb.schema.Tree) |  |
| Login | [LoginRequest](#immudb.schema.LoginRequest) | [LoginResponse](#immudb.schema.LoginResponse) |  |
| Logout | [.google.protobuf.Empty](#google.protobuf.Empty) | [.google.protobuf.Empty](#google.protobuf.Empty) |  |
| Dump | [.google.protobuf.Empty](#google.protobuf.Empty) | [.pb.KVList](#pb.KVList) stream |  |
| CreateDatabase | [Database](#immudb.schema.Database) | [CreateDatabaseReply](#immudb.schema.CreateDatabaseReply) | todo(joe-dz): Enable restore when the feature is required again 	rpc Restore(stream pb.KVList) returns (ItemsCount) { 		option (google.api.http) = { 			post: &#34;/v1/immurestproxy/restore&#34; 			body: &#34;*&#34; 		}; 	} |
| UseDatabase | [Database](#immudb.schema.Database) | [UseDatabaseReply](#immudb.schema.UseDatabaseReply) |  |
| ChangePermission | [ChangePermissionRequest](#immudb.schema.ChangePermissionRequest) | [Error](#immudb.schema.Error) |  |
| SetActiveUser | [SetActiveUserRequest](#immudb.schema.SetActiveUserRequest) | [.google.protobuf.Empty](#google.protobuf.Empty) |  |
| DatabaseList | [.google.protobuf.Empty](#google.protobuf.Empty) | [DatabaseListResponse](#immudb.schema.DatabaseListResponse) |  |


## Table of Contents

- [schema.proto](#schema.proto)
    - [AuthConfig](#immudb.schema.AuthConfig)
    - [ChangePasswordRequest](#immudb.schema.ChangePasswordRequest)
    - [ChangePermissionRequest](#immudb.schema.ChangePermissionRequest)
    - [ConsistencyProof](#immudb.schema.ConsistencyProof)
    - [Content](#immudb.schema.Content)
    - [CreateDatabaseReply](#immudb.schema.CreateDatabaseReply)
    - [CreateUserRequest](#immudb.schema.CreateUserRequest)
    - [Database](#immudb.schema.Database)
    - [DatabaseListResponse](#immudb.schema.DatabaseListResponse)
    - [Error](#immudb.schema.Error)
    - [HealthResponse](#immudb.schema.HealthResponse)
    - [IScanOptions](#immudb.schema.IScanOptions)
    - [InclusionProof](#immudb.schema.InclusionProof)
    - [Index](#immudb.schema.Index)
    - [Item](#immudb.schema.Item)
    - [ItemList](#immudb.schema.ItemList)
    - [ItemsCount](#immudb.schema.ItemsCount)
    - [KVList](#immudb.schema.KVList)
    - [Key](#immudb.schema.Key)
    - [KeyList](#immudb.schema.KeyList)
    - [KeyPrefix](#immudb.schema.KeyPrefix)
    - [KeyValue](#immudb.schema.KeyValue)
    - [Layer](#immudb.schema.Layer)
    - [LoginRequest](#immudb.schema.LoginRequest)
    - [LoginResponse](#immudb.schema.LoginResponse)
    - [MTLSConfig](#immudb.schema.MTLSConfig)
    - [Node](#immudb.schema.Node)
    - [Page](#immudb.schema.Page)
    - [Permission](#immudb.schema.Permission)
    - [Proof](#immudb.schema.Proof)
    - [ReferenceOptions](#immudb.schema.ReferenceOptions)
    - [Root](#immudb.schema.Root)
    - [SKVList](#immudb.schema.SKVList)
    - [SPage](#immudb.schema.SPage)
    - [SafeGetOptions](#immudb.schema.SafeGetOptions)
    - [SafeIndexOptions](#immudb.schema.SafeIndexOptions)
    - [SafeItem](#immudb.schema.SafeItem)
    - [SafeReferenceOptions](#immudb.schema.SafeReferenceOptions)
    - [SafeSetOptions](#immudb.schema.SafeSetOptions)
    - [SafeSetSVOptions](#immudb.schema.SafeSetSVOptions)
    - [SafeStructuredItem](#immudb.schema.SafeStructuredItem)
    - [SafeZAddOptions](#immudb.schema.SafeZAddOptions)
    - [ScanOptions](#immudb.schema.ScanOptions)
    - [SetActiveUserRequest](#immudb.schema.SetActiveUserRequest)
    - [StructuredItem](#immudb.schema.StructuredItem)
    - [StructuredItemList](#immudb.schema.StructuredItemList)
    - [StructuredKeyValue](#immudb.schema.StructuredKeyValue)
    - [Tree](#immudb.schema.Tree)
    - [UseDatabaseReply](#immudb.schema.UseDatabaseReply)
    - [User](#immudb.schema.User)
    - [UserList](#immudb.schema.UserList)
    - [UserRequest](#immudb.schema.UserRequest)
    - [UserResponse](#immudb.schema.UserResponse)
    - [ZAddOptions](#immudb.schema.ZAddOptions)
    - [ZScanOptions](#immudb.schema.ZScanOptions)

    - [ErrorCodes](#immudb.schema.ErrorCodes)
    - [PermissionAction](#immudb.schema.PermissionAction)

    - [ImmuService](#immudb.schema.ImmuService)

- [Scalar Value Types](#scalar-value-types)



<a name="schema.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## schema.proto



<a name="immudb.schema.AuthConfig"></a>

### AuthConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kind | [uint32](#uint32) |  |  |






<a name="immudb.schema.ChangePasswordRequest"></a>

### ChangePasswordRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user | [bytes](#bytes) |  |  |
| oldPassword | [bytes](#bytes) |  |  |
| newPassword | [bytes](#bytes) |  |  |






<a name="immudb.schema.ChangePermissionRequest"></a>

### ChangePermissionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| action | [PermissionAction](#immudb.schema.PermissionAction) |  |  |
| username | [string](#string) |  |  |
| database | [string](#string) |  |  |
| permission | [uint32](#uint32) |  |  |






<a name="immudb.schema.ConsistencyProof"></a>

### ConsistencyProof



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| first | [uint64](#uint64) |  |  |
| second | [uint64](#uint64) |  |  |
| firstRoot | [bytes](#bytes) |  |  |
| secondRoot | [bytes](#bytes) |  |  |
| path | [bytes](#bytes) | repeated |  |






<a name="immudb.schema.Content"></a>

### Content



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| timestamp | [uint64](#uint64) |  |  |
| payload | [bytes](#bytes) |  |  |






<a name="immudb.schema.CreateDatabaseReply"></a>

### CreateDatabaseReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error | [Error](#immudb.schema.Error) |  |  |






<a name="immudb.schema.CreateUserRequest"></a>

### CreateUserRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user | [bytes](#bytes) |  |  |
| password | [bytes](#bytes) |  |  |
| permission | [uint32](#uint32) |  |  |
| database | [string](#string) |  |  |






<a name="immudb.schema.Database"></a>

### Database



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| databasename | [string](#string) |  |  |






<a name="immudb.schema.DatabaseListResponse"></a>

### DatabaseListResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| databases | [Database](#immudb.schema.Database) | repeated |  |






<a name="immudb.schema.Error"></a>

### Error



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| errorcode | [ErrorCodes](#immudb.schema.ErrorCodes) |  |  |
| errormessage | [string](#string) |  |  |






<a name="immudb.schema.HealthResponse"></a>

### HealthResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [bool](#bool) |  |  |
| version | [string](#string) |  |  |






<a name="immudb.schema.IScanOptions"></a>

### IScanOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| pageSize | [uint64](#uint64) |  |  |
| pageNumber | [uint64](#uint64) |  |  |






<a name="immudb.schema.InclusionProof"></a>

### InclusionProof



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| at | [uint64](#uint64) |  |  |
| index | [uint64](#uint64) |  |  |
| root | [bytes](#bytes) |  |  |
| leaf | [bytes](#bytes) |  |  |
| path | [bytes](#bytes) | repeated |  |






<a name="immudb.schema.Index"></a>

### Index



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  |  |






<a name="immudb.schema.Item"></a>

### Item



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [bytes](#bytes) |  |  |
| value | [bytes](#bytes) |  |  |
| index | [uint64](#uint64) |  |  |






<a name="immudb.schema.ItemList"></a>

### ItemList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| items | [Item](#immudb.schema.Item) | repeated |  |






<a name="immudb.schema.ItemsCount"></a>

### ItemsCount



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| count | [uint64](#uint64) |  |  |






<a name="immudb.schema.KVList"></a>

### KVList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| KVs | [KeyValue](#immudb.schema.KeyValue) | repeated |  |






<a name="immudb.schema.Key"></a>

### Key



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [bytes](#bytes) |  |  |






<a name="immudb.schema.KeyList"></a>

### KeyList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| keys | [Key](#immudb.schema.Key) | repeated |  |






<a name="immudb.schema.KeyPrefix"></a>

### KeyPrefix



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| prefix | [bytes](#bytes) |  |  |






<a name="immudb.schema.KeyValue"></a>

### KeyValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [bytes](#bytes) |  |  |
| value | [bytes](#bytes) |  |  |






<a name="immudb.schema.Layer"></a>

### Layer



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| l | [Node](#immudb.schema.Node) | repeated |  |






<a name="immudb.schema.LoginRequest"></a>

### LoginRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user | [bytes](#bytes) |  |  |
| password | [bytes](#bytes) |  |  |






<a name="immudb.schema.LoginResponse"></a>

### LoginResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| token | [bytes](#bytes) |  |  |
| warning | [bytes](#bytes) |  |  |






<a name="immudb.schema.MTLSConfig"></a>

### MTLSConfig



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| enabled | [bool](#bool) |  |  |






<a name="immudb.schema.Node"></a>

### Node



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| i | [bytes](#bytes) |  |  |
| h | [bytes](#bytes) |  |  |
| refk | [bytes](#bytes) |  |  |
| ref | [bool](#bool) |  |  |
| cache | [bool](#bool) |  |  |
| root | [bool](#bool) |  |  |






<a name="immudb.schema.Page"></a>

### Page



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| items | [Item](#immudb.schema.Item) | repeated |  |
| more | [bool](#bool) |  |  |






<a name="immudb.schema.Permission"></a>

### Permission



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| database | [string](#string) |  |  |
| permission | [uint32](#uint32) |  |  |






<a name="immudb.schema.Proof"></a>

### Proof



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| leaf | [bytes](#bytes) |  |  |
| index | [uint64](#uint64) |  |  |
| root | [bytes](#bytes) |  |  |
| at | [uint64](#uint64) |  |  |
| inclusionPath | [bytes](#bytes) | repeated |  |
| consistencyPath | [bytes](#bytes) | repeated |  |






<a name="immudb.schema.ReferenceOptions"></a>

### ReferenceOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| reference | [bytes](#bytes) |  |  |
| key | [bytes](#bytes) |  |  |






<a name="immudb.schema.Root"></a>

### Root



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  |  |
| root | [bytes](#bytes) |  |  |






<a name="immudb.schema.SKVList"></a>

### SKVList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| SKVs | [StructuredKeyValue](#immudb.schema.StructuredKeyValue) | repeated |  |






<a name="immudb.schema.SPage"></a>

### SPage



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| items | [StructuredItem](#immudb.schema.StructuredItem) | repeated |  |
| pageNum | [uint64](#uint64) |  |  |
| more | [bool](#bool) |  |  |






<a name="immudb.schema.SafeGetOptions"></a>

### SafeGetOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [bytes](#bytes) |  |  |
| rootIndex | [Index](#immudb.schema.Index) |  |  |






<a name="immudb.schema.SafeIndexOptions"></a>

### SafeIndexOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| index | [uint64](#uint64) |  |  |
| rootIndex | [Index](#immudb.schema.Index) |  |  |






<a name="immudb.schema.SafeItem"></a>

### SafeItem



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| item | [Item](#immudb.schema.Item) |  |  |
| proof | [Proof](#immudb.schema.Proof) |  |  |






<a name="immudb.schema.SafeReferenceOptions"></a>

### SafeReferenceOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| ro | [ReferenceOptions](#immudb.schema.ReferenceOptions) |  |  |
| rootIndex | [Index](#immudb.schema.Index) |  |  |






<a name="immudb.schema.SafeSetOptions"></a>

### SafeSetOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| kv | [KeyValue](#immudb.schema.KeyValue) |  |  |
| rootIndex | [Index](#immudb.schema.Index) |  |  |






<a name="immudb.schema.SafeSetSVOptions"></a>

### SafeSetSVOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| skv | [StructuredKeyValue](#immudb.schema.StructuredKeyValue) |  |  |
| rootIndex | [Index](#immudb.schema.Index) |  |  |






<a name="immudb.schema.SafeStructuredItem"></a>

### SafeStructuredItem



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| item | [StructuredItem](#immudb.schema.StructuredItem) |  |  |
| proof | [Proof](#immudb.schema.Proof) |  |  |






<a name="immudb.schema.SafeZAddOptions"></a>

### SafeZAddOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| zopts | [ZAddOptions](#immudb.schema.ZAddOptions) |  |  |
| rootIndex | [Index](#immudb.schema.Index) |  |  |






<a name="immudb.schema.ScanOptions"></a>

### ScanOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| prefix | [bytes](#bytes) |  |  |
| offset | [bytes](#bytes) |  |  |
| limit | [uint64](#uint64) |  |  |
| reverse | [bool](#bool) |  |  |
| deep | [bool](#bool) |  |  |






<a name="immudb.schema.SetActiveUserRequest"></a>

### SetActiveUserRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| active | [bool](#bool) |  |  |
| username | [string](#string) |  |  |






<a name="immudb.schema.StructuredItem"></a>

### StructuredItem



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [bytes](#bytes) |  |  |
| value | [Content](#immudb.schema.Content) |  |  |
| index | [uint64](#uint64) |  |  |






<a name="immudb.schema.StructuredItemList"></a>

### StructuredItemList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| items | [StructuredItem](#immudb.schema.StructuredItem) | repeated |  |






<a name="immudb.schema.StructuredKeyValue"></a>

### StructuredKeyValue



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [bytes](#bytes) |  |  |
| value | [Content](#immudb.schema.Content) |  |  |






<a name="immudb.schema.Tree"></a>

### Tree



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| t | [Layer](#immudb.schema.Layer) | repeated |  |






<a name="immudb.schema.UseDatabaseReply"></a>

### UseDatabaseReply



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| error | [Error](#immudb.schema.Error) |  |  |
| token | [string](#string) |  |  |






<a name="immudb.schema.User"></a>

### User



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user | [bytes](#bytes) |  |  |
| permission | [uint32](#uint32) |  |  |
| permissions | [Permission](#immudb.schema.Permission) | repeated |  |
| createdby | [string](#string) |  |  |
| createdat | [string](#string) |  |  |
| active | [bool](#bool) |  |  |






<a name="immudb.schema.UserList"></a>

### UserList



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| users | [User](#immudb.schema.User) | repeated |  |






<a name="immudb.schema.UserRequest"></a>

### UserRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user | [bytes](#bytes) |  |  |






<a name="immudb.schema.UserResponse"></a>

### UserResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| user | [bytes](#bytes) |  |  |
| permission | [uint32](#uint32) |  |  |






<a name="immudb.schema.ZAddOptions"></a>

### ZAddOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| set | [bytes](#bytes) |  |  |
| score | [double](#double) |  |  |
| key | [bytes](#bytes) |  |  |






<a name="immudb.schema.ZScanOptions"></a>

### ZScanOptions



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| set | [bytes](#bytes) |  |  |
| offset | [bytes](#bytes) |  |  |
| limit | [uint64](#uint64) |  |  |
| reverse | [bool](#bool) |  |  |








<a name="immudb.schema.ErrorCodes"></a>

### ErrorCodes


| Name | Number | Description |
| ---- | ------ | ----------- |
| Ok | 0 |  |
| ERROR_SELECTING_DATABASE | 1 |  |
| ERROR_NO_PERMISSION_FOR_THIS_DATABASE | 2 |  |
| ERROR_USER_HAS_NOT_LOGGED_IN | 3 |  |
| ERROR_DB_DOES_NOT_EXIST | 4 |  |



<a name="immudb.schema.PermissionAction"></a>

### PermissionAction


| Name | Number | Description |
| ---- | ------ | ----------- |
| GRANT | 0 |  |
| REVOKE | 1 |  |










## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |
