<template>
  <div>
    <main class="main">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
}
</style>