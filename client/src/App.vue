<template>
  <div id="app">
    <router-view />
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
