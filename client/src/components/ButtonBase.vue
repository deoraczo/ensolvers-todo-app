<template>
  <button class="button" :style="backgroundColorStyle" @click="$emit('click')">
    <i v-if="icon" class="material-icons">{{icon}}</i>
    <span v-if="text">{{ text }}</span>
  </button>
</template>
<script>
export default {
  name: 'ButtonBase',
  props: {
    text: {
      type: String
    },
    icon: {
      type: String
    },
    color: {
      type: String
    }
  },

  emits: ['click'],

  computed: {
    backgroundColorStyle() {
      if (!this.color) {
        return {}
      }

      return {
        backgroundColor: this.color 
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  outline: 0;
  display: inline-flex;
  background-color: var(--primary-color);
  color: white;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  font-size: .875rem;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
}
</style>