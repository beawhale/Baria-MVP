# Baria MVP API Spec

Auth: session cookie required on all protected routes. Server sets
`Set-Cookie: session=<token>; HttpOnly; Secure; SameSite=Strict`.
All endpoints that require auth will respond `ERR_UNAUTHORIZED` if session cookie is missing/invalid.

Conventions

* use `camelCase` for all fields and paths.
* ids: `uuidv4` (type: `uuid`).
* timestamps: ISO 8601 UTC strings (`2025-09-28T12:34:56Z`).
* responses always: `{ data: any, meta?: object }`.
* error response (any 4xx/5xx):

```json
{
  "errorCode": "ERR_BAD_REQUEST" | "ERR_NOT_FOUND" | "ERR_UNAUTHORIZED" | "ERR_FORBIDDEN" | "ERR_SERVER_ERROR" | "ERR_TIMEOUT" | "ERR_UNTRANSLATABLE" | "ERR_INVALID_INPUT" | "ERR_CONFLICT",
  "message": "human readable english message",
  "info": any
}
```

Pagination: cursor-based. Messages use `cursor` (opaque string) in `meta.nextCursor` / `meta.prevCursor`.
Clients supply `?cursor=...&limit=...`. Defaults are server-defined.

Error codes:
`ERR_UNAUTHORIZED`, `ERR_FORBIDDEN`, `ERR_NOT_FOUND`, `ERR_BAD_REQUEST`, `ERR_INVALID_INPUT`, `ERR_CONFLICT`, `ERR_TIMEOUT`, `ERR_SERVER_ERROR`, `ERR_UNTRANSLATABLE`.

---

## Schemas

Message content:

```ts
type MediaType = "text" | "voice" | "photo" | "video" | "file";

messageContent = {
  type: MediaType,
  text?: string,
  mediaId?: uuid,
  originalLanguage: string,
  reactions: { emoji: string, count: number }[]
}
```

Message item:

```ts
{
  messageId: uuid,
  chatId: uuid,
  fromUserId: uuid,
  sentAt: datetime,
  delivered: boolean,
  seen: boolean,
  content: messageContent
}
```

List wrapper:

```json
{
  "data": { "items": [...] },
  "meta": { "nextCursor": "...", "prevCursor": "...", "limit": 30 }
}
```

---

## Auth

**POST /auth/register**

* body:

```json
{
  "username": string,
  "password": string,
  "language": string
}
```

* response 201:

```json
{ "data": { "userId": uuid, "username": string, "language": string } }
```

* sets `Set-Cookie: session=<token>; HttpOnly; Secure; SameSite=Strict`
* errors:

  * `ERR_INVALID_INPUT` (invalid username/password format)
  * `ERR_CONFLICT` (username already taken)
  * `ERR_SERVER_ERROR`

**POST /auth/login**

* body:

```json
{ "username": string, "password": string }
```

* response 200:

```json
{ "data": { "userId": uuid, "username": string, "language": string } }
```

* sets `Set-Cookie: session=<token>; HttpOnly; Secure; SameSite=Strict`
* errors:

  * `ERR_UNAUTHORIZED` (invalid credentials)
  * `ERR_INVALID_INPUT`
  * `ERR_SERVER_ERROR`

**POST /auth/logout**

* clears session cookie
* response 204 (no content)
* errors:

  * `ERR_UNAUTHORIZED` (not logged in)
  * `ERR_SERVER_ERROR`

---

## User / Preferences


**GET /user/preferences**

* auth: required
* response 200:

```json
{ "data": { "username": string, "language": "lt" | "en" | "ru" | ... } }
```

* errors: `ERR_UNAUTHORIZED`, `ERR_SERVER_ERROR`.

**POST /user/preferences**

* auth: required
* body:

```json
{ "username"?: string, "language"?: string }
```

* response 200:

```json
{ "data": { "username": string, "language": string } }
```

* errors: `ERR_UNAUTHORIZED`, `ERR_INVALID_INPUT`, `ERR_SERVER_ERROR`.

---

## Chats & Messages

**GET /chats/:chatId**

* auth: required (must be member)
* response 200:

```json
{
  "data": {
    "chatId": uuid,
    "title": string,
    "members": uuid[],
    "messageListId": uuid
  }
}
```

* errors: `ERR_UNAUTHORIZED`, `ERR_FORBIDDEN`, `ERR_NOT_FOUND`, `ERR_SERVER_ERROR`.

**GET /chats/:chatId/messages?cursor=&limit=**

* auth: required
* response 200:

```json
{
  "data": { "messages": [ messageItem ... ] },
  "meta": { "nextCursor": string | null, "prevCursor": string | null, "limit": number }
}
```

* errors: `ERR_UNAUTHORIZED`, `ERR_FORBIDDEN`, `ERR_NOT_FOUND`, `ERR_INVALID_INPUT`, `ERR_SERVER_ERROR`.

**POST /chats/:chatId/messages**

* auth: required
* body:

```json
{ "type": "text" | "voice" | "photo" | "video" | "file", "text"?: string }
```

* response 200:

```json
{ "data": { "messageId": uuid, "mediaId"?: uuid } }
```

* errors: `ERR_UNAUTHORIZED`, `ERR_FORBIDDEN`, `ERR_INVALID_INPUT`, `ERR_SERVER_ERROR`.

---

## Media

**POST /messages/:messageId/media**

* auth: required (must be message author)
* multipart/form-data, field `file`
* body param: `mediaType` must match message type
* response 200:

```json
{ "data": { "mediaId": uuid, "url": "/media/:mediaId" } }
```

* errors: `ERR_UNAUTHORIZED`, `ERR_FORBIDDEN`, `ERR_NOT_FOUND`, `ERR_INVALID_INPUT`, `ERR_CONFLICT`, `ERR_SERVER_ERROR`.

**GET /media/:mediaId**

* auth: required (only chat members)
* response: file stream or

```json
{ "data": { "mediaId": uuid, "mediaType": string, "url": string, "sizeBytes": number } }
```

* errors: `ERR_UNAUTHORIZED`, `ERR_FORBIDDEN`, `ERR_NOT_FOUND`, `ERR_SERVER_ERROR`.

**GET /messages/:messageId/voice**

* auth: required
* response: audio stream or wrapper with `mediaId`/`url`.
* errors: `ERR_UNAUTHORIZED`, `ERR_FORBIDDEN`, `ERR_NOT_FOUND`, `ERR_UNTRANSLATABLE`, `ERR_SERVER_ERROR`.

---

## Language

**GET /language/list**

* response 200:

```json
{ "data": [ "en", "lt", "ru", ... ] }
```

* errors: `ERR_SERVER_ERROR`.

**GET /language/features/:language**

* response 200:

```json
{
  "data": {
    "voiceTranslation": boolean,
    "voiceCreation": boolean,
    "voiceCloning": boolean,
    "emotionPreservation": boolean,
  }
}
```

* errors: `ERR_NOT_FOUND`, `ERR_SERVER_ERROR`.

---

## Contacts

**GET /contacts**

* auth: required
* response 200:

```json
{
  "data": {
    "contacts": [
      { "contactId": uuid, "userId": uuid, "title": string, "lastMessageId"?: uuid, "updatedAt": datetime }
    ]
  }
}
```

* errors: `ERR_UNAUTHORIZED`, `ERR_SERVER_ERROR`.

**POST /contacts/invite**

* auth: required
* body:

```json
{ "phoneNumber": string, "message"?: string }
```

* response 200:

```json
{ "data": { "inviteId": uuid, "sentAt": datetime } }
```

* errors: `ERR_UNAUTHORIZED`, `ERR_INVALID_INPUT`, `ERR_CONFLICT`, `ERR_SERVER_ERROR`.

**GET /contacts/invitations**

* auth: required
* response 200:

```json
{
  "data": {
    "invitations": [
      { "inviteId": uuid, "fromUserId": uuid, "message": string, "sentAt": datetime }
    ]
  }
}
```

* errors: `ERR_UNAUTHORIZED`, `ERR_SERVER_ERROR`.

**POST /contacts/accept/:userId**

* auth: required
* response 200:

```json
{ "data": { "contactId": uuid, "userId": uuid, "addedAt": datetime } }
```

* errors: `ERR_UNAUTHORIZED`, `ERR_NOT_FOUND`, `ERR_INVALID_INPUT`, `ERR_SERVER_ERROR`.

---
