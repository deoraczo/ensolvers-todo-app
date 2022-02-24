<template>
  <div class="items">
    <div class="info">
      <span class="info-title">{{ folder.title }}</span>
      <span class="info-date">5:23 AM, 01/16/17</span>
    </div>
    <div class="actions">
      <button-base @click="showTasks" icon="remove_red_eye" color="rgb(61 61 62)" />
      <button-base @click="openModal" icon="edit" color="rgb(61 61 62)" />
      <button-base @click="deleteFolder" icon="restore_from_trash" color="rgb(61 61 62)" />
    </div>
  </div>
</template>

<script>
import ButtonBase from '@/components/ButtonBase.vue'
import { toastMixin } from '@/mixins/toast.mixin.js'

export default {
  props: {
    folder: {
      type: Object,
    },
  },
  components: {
    ButtonBase,
  },

  emits: ['open'],

  mixins: [toastMixin],

  methods: {
    deleteFolder() {

    },

    openModal() {
      this.$emit('open', this.folder)
    },

    showTasks() {
      this.$router.push({name: 'tasks', params: { id: this.folder.id }})
    }
  },

}
</script>

<style lang="scss" scoped>
.items {
  border-radius: 8px;
  padding: 20px;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  .box {
    cursor: pointer;
    border-radius: 4px;
  }
  .info {
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    color: var(--text-color);

    &-title {
      font-weight: bold;
      margin-bottom: 4px;
      font-size: 1.2rem;
    }
    &-date {
      font-size: 0.85rem;
    }
  }

  &:not(:last-child) {
    margin-bottom: 14px;
  }
}

.actions {
  :not(:last-child) {
    margin-right: 8px;
  }
}
</style>
