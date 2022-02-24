<template>
  <div>
    <h1>layout</h1>
    <main class="main">
      <slot></slot>
    </main>
    <toast />
  </div>
</template>

<script>
import Toast from '@/components/toast/Index.vue'

export default {
  components: {
    Toast
  }
}
</script>

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