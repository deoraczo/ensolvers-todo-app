<template>
  <div
    class="alert"
  >
    <span class="alert-message">{{ message }}</span>
    <button class="alert-close" @click="$emit('close')">
      <i class="material-icons">close</i>
    </button>
    <!-- <span class="absolute top-0 bottom-0 right-0 px-3 py-3"
    >
      <div @click="close">
        <i class="fas fa-times cursor-pointer" ></i>
      </div>
    </span> -->
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Alerta'
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  background-color: #e9b6c1;
  font-weight: bold;
  border-radius: 6px;
  color: #F84C6F;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-message {
    font-size: 14px;
  }
  &-close {
    border: none;
    background-color: transparent;
    color: #F84C6F;
    cursor: pointer;
  }
}
</style>