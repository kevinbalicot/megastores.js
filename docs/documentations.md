## Modules

<dl>
<dt><a href="#module_ClientMegastores">ClientMegastores</a></dt>
<dd><p>ClientMegastores module</p>
</dd>
<dt><a href="#module_ClientStore">ClientStore</a></dt>
<dd><p>ClientStore module</p>
</dd>
<dt><a href="#module_compose">compose</a></dt>
<dd><p>Queue handle middlewares</p>
</dd>
<dt><a href="#module_BaseMegastores">BaseMegastores</a></dt>
<dd><p>BaseMegastores module</p>
</dd>
<dt><a href="#module_BaseStore">BaseStore</a></dt>
<dd><p>BaseStore module</p>
</dd>
<dt><a href="#module_ServerMegastores">ServerMegastores</a></dt>
<dd><p>ServerMegastores module</p>
</dd>
<dt><a href="#module_ServerStore">ServerStore</a></dt>
<dd><p>ServerStore module</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#exp_module_Store--BaseStore+reducer">BaseStore#reducer([state], [action])</a> ⇒ <code>*</code> ⏏</dt>
<dd><p>Reducer, modify current state depends of action</p>
</dd>
</dl>

<a name="module_ClientMegastores"></a>

## ClientMegastores
ClientMegastores module


* [ClientMegastores](#module_ClientMegastores)
    * [Megastores](#exp_module_ClientMegastores--Megastores) ⇐ <code>BaseMegastores</code> ⏏
    * [Megastores#connect(uri)](#exp_module_ClientMegastores--Megastores+connect) ⇒ <code>Megastores</code> ⏏
    * [Megastores#dispatch(action, store)](#exp_module_ClientMegastores--Megastores+dispatch) ⏏
    * [Megastores#synchronize()](#exp_module_ClientMegastores--Megastores+synchronize) ⏏
    * [Megastores#send(event, data)](#exp_module_ClientMegastores--Megastores+send) ⏏
    * [Megastores#listenNewConnection(url, port)](#exp_module_ClientMegastores--Megastores+listenNewConnection) ⏏

<a name="exp_module_ClientMegastores--Megastores"></a>

### Megastores ⇐ <code>BaseMegastores</code> ⏏
**Kind**: Exported class  
**Extends**: <code>BaseMegastores</code>  
<a name="exp_module_ClientMegastores--Megastores+connect"></a>

### Megastores#connect(uri) ⇒ <code>Megastores</code> ⏏
Connect to server

**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | Server URI |

<a name="exp_module_ClientMegastores--Megastores+dispatch"></a>

### Megastores#dispatch(action, store) ⏏
Dispatch action

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| action | <code>string</code> | 
| store | <code>Store</code> | 

<a name="exp_module_ClientMegastores--Megastores+synchronize"></a>

### Megastores#synchronize() ⏏
Synchronize data with server when reconnection

**Kind**: Exported function  
<a name="exp_module_ClientMegastores--Megastores+send"></a>

### Megastores#send(event, data) ⏏
Send message at server

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| event | <code>string</code> | 
| data | <code>Object</code> | 

<a name="exp_module_ClientMegastores--Megastores+listenNewConnection"></a>

### Megastores#listenNewConnection(url, port) ⏏
Try to reconnecte

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| port | <code>port</code> | 

<a name="module_ClientStore"></a>

## ClientStore
ClientStore module


* [ClientStore](#module_ClientStore)
    * [Store](#exp_module_ClientStore--Store) ⇐ <code>BaseStore</code> ⏏
    * [Store#reducer([state], [action])](#exp_module_ClientStore--Store+reducer) ⇒ <code>\*</code> ⏏
    * [Store#clearCache()](#exp_module_ClientStore--Store+clearCache) ⏏
    * [Store#enableOfflineMode()](#exp_module_ClientStore--Store+enableOfflineMode) ⏏
    * [Store#put(item)](#exp_module_ClientStore--Store+put) ⏏
    * [Store#update(index, item)](#exp_module_ClientStore--Store+update) ⏏
    * [Store#remove(index, item)](#exp_module_ClientStore--Store+remove) ⏏

<a name="exp_module_ClientStore--Store"></a>

### Store ⇐ <code>BaseStore</code> ⏏
**Kind**: Exported class  
**Extends**: <code>BaseStore</code>  
<a name="exp_module_ClientStore--Store+reducer"></a>

### Store#reducer([state], [action]) ⇒ <code>\*</code> ⏏
Reducer, synchronize from server

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| [state] | <code>Array</code> | <code>[]</code> | 
| [action] | <code>Object</code> | <code>{}</code> | 
| [action.type] | <code>string</code> |  | 
| [action.payload] | <code>Object</code> |  | 

<a name="exp_module_ClientStore--Store+clearCache"></a>

### Store#clearCache() ⏏
Clear cache and local storage cache

**Kind**: Exported function  
<a name="exp_module_ClientStore--Store+enableOfflineMode"></a>

### Store#enableOfflineMode() ⏏
Enable offline, no interaction with server

**Kind**: Exported function  
<a name="exp_module_ClientStore--Store+put"></a>

### Store#put(item) ⏏
Put item or property into state

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| item | <code>Object</code> | 

<a name="exp_module_ClientStore--Store+update"></a>

### Store#update(index, item) ⏏
Update item or property

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 
| item | <code>Object</code> | 

<a name="exp_module_ClientStore--Store+remove"></a>

### Store#remove(index, item) ⏏
Remove item or property

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 
| item | <code>Object</code> | 

<a name="module_compose"></a>

## compose
Queue handle middlewares

<a name="exp_module_compose--module.exports"></a>

### module.exports(action, oldState, newState, middlewares) ⇒ <code>\*</code> ⏏
**Kind**: Exported function  

| Param | Type |
| --- | --- |
| action | <code>Object</code> | 
| action.type | <code>string</code> | 
| action.payload | <code>Object</code> | 
| oldState | <code>Array</code> \| <code>Object</code> | 
| newState | <code>Array</code> \| <code>Object</code> | 
| middlewares | <code>Array.&lt;Object&gt;</code> | 

<a name="module_BaseMegastores"></a>

## BaseMegastores
BaseMegastores module


* [BaseMegastores](#module_BaseMegastores)
    * [BaseMegastores](#exp_module_BaseMegastores--BaseMegastores) ⇐ <code>EventEmitter</code> ⏏
    * [BaseMegastores#subscribe(callback)](#exp_module_BaseMegastores--BaseMegastores+subscribe) ⇒ <code>Callable</code> ⏏
    * [BaseMegastores#dispatch(action, [client])](#exp_module_BaseMegastores--BaseMegastores+dispatch) ⏏
    * [BaseMegastores#getState()](#exp_module_BaseMegastores--BaseMegastores+getState) ⇒ <code>Object</code> ⏏
    * [BaseMegastores#attach(store)](#exp_module_BaseMegastores--BaseMegastores+attach) ⇒ <code>BaseMegastores</code> ⏏
    * [BaseMegastores#createStore()](#exp_module_BaseMegastores--BaseMegastores+createStore) ⏏

<a name="exp_module_BaseMegastores--BaseMegastores"></a>

### BaseMegastores ⇐ <code>EventEmitter</code> ⏏
**Kind**: Exported class  
**Extends**: <code>EventEmitter</code>  
<a name="exp_module_BaseMegastores--BaseMegastores+subscribe"></a>

### BaseMegastores#subscribe(callback) ⇒ <code>Callable</code> ⏏
Subscribe to global store

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| callback | <code>Callable</code> | 

<a name="exp_module_BaseMegastores--BaseMegastores+dispatch"></a>

### BaseMegastores#dispatch(action, [client]) ⏏
Dispatch action into global store

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| action | <code>Object</code> |  | 
| [client] | <code>Object</code> | <code></code> | 

<a name="exp_module_BaseMegastores--BaseMegastores+getState"></a>

### BaseMegastores#getState() ⇒ <code>Object</code> ⏏
Get current state of global store

**Kind**: Exported function  
<a name="exp_module_BaseMegastores--BaseMegastores+attach"></a>

### BaseMegastores#attach(store) ⇒ <code>BaseMegastores</code> ⏏
Add store or a list of stores into global store

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| store | <code>Array.&lt;Store&gt;</code> \| <code>Store</code> | 

<a name="exp_module_BaseMegastores--BaseMegastores+createStore"></a>

### BaseMegastores#createStore() ⏏
Create global store

**Kind**: Exported function  
<a name="module_BaseStore"></a>

## BaseStore
BaseStore module


* [BaseStore](#module_BaseStore)
    * [BaseStore](#exp_module_BaseStore--BaseStore) ⏏
    * [BaseStore#items](#exp_module_BaseStore--BaseStore+items) ⇒ <code>Object</code> \| <code>Array</code> ⏏
    * [BaseStore#createNewState(state)](#exp_module_BaseStore--BaseStore+createNewState) ⇒ <code>Array</code> \| <code>Object</code> ⏏
    * [BaseStore#merge(state, item)](#exp_module_BaseStore--BaseStore+merge) ⇒ <code>Array</code> \| <code>Object</code> ⏏
    * [BaseStore#edit(state, index, item)](#exp_module_BaseStore--BaseStore+edit) ⇒ <code>Object</code> ⏏
    * [BaseStore#delete(state, index)](#exp_module_BaseStore--BaseStore+delete) ⇒ <code>Object</code> ⏏
    * [BaseStore#dispatchMiddelwares([action], oldState, newState)](#exp_module_BaseStore--BaseStore+dispatchMiddelwares) ⏏
    * [BaseStore#use(callback)](#exp_module_BaseStore--BaseStore+use) ⏏
    * [BaseStore#put(item)](#exp_module_BaseStore--BaseStore+put) ⇒ <code>\*</code> ⏏
    * [BaseStore#find(key, value)](#exp_module_BaseStore--BaseStore+find) ⇒ <code>Object</code> \| <code>null</code> ⏏
    * [BaseStore#update(index, item)](#exp_module_BaseStore--BaseStore+update) ⇒ <code>\*</code> ⏏
    * [BaseStore#remove(index)](#exp_module_BaseStore--BaseStore+remove) ⇒ <code>\*</code> ⏏
    * [BaseStore#subscribe(callback)](#exp_module_BaseStore--BaseStore+subscribe) ⇒ <code>\*</code> ⏏

<a name="exp_module_BaseStore--BaseStore"></a>

### BaseStore ⏏
**Kind**: Exported class  
<a name="exp_module_BaseStore--BaseStore+items"></a>

### BaseStore#items ⇒ <code>Object</code> \| <code>Array</code> ⏏
Get store's state

**Kind**: Exported member  
<a name="exp_module_BaseStore--BaseStore+createNewState"></a>

### BaseStore#createNewState(state) ⇒ <code>Array</code> \| <code>Object</code> ⏏
Private method to create new state from a state

**Kind**: Exported function  
**Access**: protected  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 

<a name="exp_module_BaseStore--BaseStore+merge"></a>

### BaseStore#merge(state, item) ⇒ <code>Array</code> \| <code>Object</code> ⏏
Private method to merge item or property into state

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| item | <code>Object</code> | 

<a name="exp_module_BaseStore--BaseStore+edit"></a>

### BaseStore#edit(state, index, item) ⇒ <code>Object</code> ⏏
Private method to update item or property of state

**Kind**: Exported function  
**Returns**: <code>Object</code> - state  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| index | <code>number</code> | 
| item | <code>Object</code> | 

<a name="exp_module_BaseStore--BaseStore+delete"></a>

### BaseStore#delete(state, index) ⇒ <code>Object</code> ⏏
Private method to delete item or property of state

**Kind**: Exported function  
**Returns**: <code>Object</code> - state  

| Param | Type |
| --- | --- |
| state | <code>Object</code> | 
| index | <code>number</code> | 

<a name="exp_module_BaseStore--BaseStore+dispatchMiddelwares"></a>

### BaseStore#dispatchMiddelwares([action], oldState, newState) ⏏
Dispatch action at middelwares

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| [action] | <code>Object</code> | <code>{}</code> | 
| [action.type] | <code>string</code> |  | 
| [action.payload] | <code>Object</code> |  | 
| oldState | <code>Object</code> |  | 
| newState | <code>Object</code> |  | 

<a name="exp_module_BaseStore--BaseStore+use"></a>

### BaseStore#use(callback) ⏏
Add middleware

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| callback | <code>Callable</code> | 

<a name="exp_module_BaseStore--BaseStore+put"></a>

### BaseStore#put(item) ⇒ <code>\*</code> ⏏
Put item or property

**Kind**: Exported function  
**Throw**: Error  

| Param | Type |
| --- | --- |
| item | <code>Object</code> | 

<a name="exp_module_BaseStore--BaseStore+find"></a>

### BaseStore#find(key, value) ⇒ <code>Object</code> \| <code>null</code> ⏏
Find item by key, value or find property by key

**Kind**: Exported function  
**Throw**: Error  

| Param | Type | Default |
| --- | --- | --- |
| key | <code>string</code> |  | 
| value | <code>\*</code> | <code></code> | 

<a name="exp_module_BaseStore--BaseStore+update"></a>

### BaseStore#update(index, item) ⇒ <code>\*</code> ⏏
Update item or property

**Kind**: Exported function  
**Throw**: Error  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 
| item | <code>Object</code> | 

<a name="exp_module_BaseStore--BaseStore+remove"></a>

### BaseStore#remove(index) ⇒ <code>\*</code> ⏏
Remove item or property

**Kind**: Exported function  
**Throw**: Error  

| Param | Type |
| --- | --- |
| index | <code>number</code> \| <code>string</code> | 

<a name="exp_module_BaseStore--BaseStore+subscribe"></a>

### BaseStore#subscribe(callback) ⇒ <code>\*</code> ⏏
Subscribe to state changes

**Kind**: Exported function  
**Throw**: Error  

| Param | Type |
| --- | --- |
| callback | <code>Callable</code> | 

<a name="module_ServerMegastores"></a>

## ServerMegastores
ServerMegastores module


* [ServerMegastores](#module_ServerMegastores)
    * [Megastores](#exp_module_ServerMegastores--Megastores) ⇐ <code>BaseMegastores</code> ⏏
    * [Megastores#listen([port], [options])](#exp_module_ServerMegastores--Megastores+listen) ⇒ <code>Megastores</code> ⏏
    * [Megastores#synchronize(client)](#exp_module_ServerMegastores--Megastores+synchronize) ⏏
    * [Megastores#broadcast(action, [fromClient])](#exp_module_ServerMegastores--Megastores+broadcast) ⏏
    * [Megastores#dispatch(action, [client])](#exp_module_ServerMegastores--Megastores+dispatch) ⏏
    * [Megastores#send(event, data, [client])](#exp_module_ServerMegastores--Megastores+send) ⏏

<a name="exp_module_ServerMegastores--Megastores"></a>

### Megastores ⇐ <code>BaseMegastores</code> ⏏
**Kind**: Exported class  
**Extends**: <code>BaseMegastores</code>  
<a name="exp_module_ServerMegastores--Megastores+listen"></a>

### Megastores#listen([port], [options]) ⇒ <code>Megastores</code> ⏏
Listen on port

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| [port] | <code>number</code> \| <code>string</code> | <code>8080</code> | 
| [options] | <code>Object</code> | <code>{}</code> | 

<a name="exp_module_ServerMegastores--Megastores+synchronize"></a>

### Megastores#synchronize(client) ⏏
Synchronize stores with clients

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| client | <code>Object</code> | 

<a name="exp_module_ServerMegastores--Megastores+broadcast"></a>

### Megastores#broadcast(action, [fromClient]) ⏏
Broadcast client actions dispatched

**Kind**: Exported function  
**Throw**: Error  

| Param | Type | Default |
| --- | --- | --- |
| action | <code>string</code> |  | 
| [fromClient] | <code>Object</code> | <code></code> | 

<a name="exp_module_ServerMegastores--Megastores+dispatch"></a>

### Megastores#dispatch(action, [client]) ⏏
Dispatch action into global store and broadcast it

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| action | <code>string</code> |  | 
| [client] | <code>Object</code> | <code></code> | 

<a name="exp_module_ServerMegastores--Megastores+send"></a>

### Megastores#send(event, data, [client]) ⏏
Send message to client or all client

**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| event | <code>string</code> |  | 
| data | <code>Object</code> |  | 
| [client] | <code>Object</code> | <code></code> | 

<a name="module_ServerStore"></a>

## ServerStore
ServerStore module


* [ServerStore](#module_ServerStore)
    * [Store](#exp_module_ServerStore--Store) ⇐ <code>BaseStore</code> ⏏
        * [new Store(name, [initialState], [options])](#new_module_ServerStore--Store_new)

<a name="exp_module_ServerStore--Store"></a>

### Store ⇐ <code>BaseStore</code> ⏏
**Kind**: Exported class  
**Extends**: <code>BaseStore</code>  
<a name="new_module_ServerStore--Store_new"></a>

#### new Store(name, [initialState], [options])

| Param | Type | Default |
| --- | --- | --- |
| name | <code>string</code> |  | 
| [initialState] | <code>Array</code> | <code>[]</code> | 
| [options] | <code>Object</code> | <code>{}</code> | 

