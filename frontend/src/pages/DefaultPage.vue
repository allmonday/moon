<template>
  <div>
    <pre>{{ content }}</pre>
  </div>
</template>

<script setup lang="ts">
const content = `
  plan:
  - [o] fe: resizer
  - [o] task & comments
  - [o] login page (currently auto login)
    - [x] refresh token before expiration (github oauth app not support)
    - [o] verfiy token on router change, and during xhr call.

  - [o] tree structure
    - [ ] lazy tree
    - [ ] fe: quasar tree component configs
    - [ ] fe: tree comparsion

  - [o] todo with user binding
    - [ ] sqlalchemy event hook

  - [ ] chatroom
    - [o] websocket send & receive messages
    - [ ] store and fetch messages

  - [ ] fe: monaco editor
  - [ ] fe: richtext editor with image uploading
  - [ ] teams hook template design
    - [ ] basic message
    - [ ] advanced message
  - [ ] docker compose
`
</script>

<style scoped></style>
