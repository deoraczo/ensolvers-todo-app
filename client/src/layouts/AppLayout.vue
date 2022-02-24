<template>
  <div>
    <h1>layout</h1>
    <main class="main">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
}
</style>