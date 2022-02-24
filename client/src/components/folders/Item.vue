<template>
  <div class="items">
    <div class="info">
      <span class="info-title">{{ folder.title }}</span>
      <span class="info-date">5:23 AM, 01/16/17</span>
    </div>
    <div class="actions">
      <button-base @click="showTasks" icon="remove_red_eye" color="rgb(61 61 62)" />
      <button-base @click="openModal" icon="edit" color="rgb(61 61 62)" />
      <button-base @click="deleteFolder" icon="restore_from_trash" color="#dd3557" />
    </div>
  </div>
</template>

<script>
import ButtonBase from '@/components/ButtonBase.vue'
import { toastMixin } from '@/mixins/toast.mixin.js'
import { folderService } from '@/services'

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
      folderService.deleteFolder(this.folder.id)
        .then(({ data: { message } }) => {
          this.toast({
            message,
            type: 'success'
          })
          this.$store.dispatch('folder/folderRemoved', this.folder.id)
        })
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
.actions {
  :not(:last-child) {
    margin-right: 8px;
  }
}
</style>
