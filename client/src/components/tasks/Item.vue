<template>
  <div class="items">
    <check-box :checked="checked" @change="change" />
    <div class="info">
      <span class="info-title">{{ task.title }}</span>
      <span class="info-date">{{ formatedDate }}</span>
    </div>
    <div class="actions">
      <button-base @click="openModal" icon="edit" color="rgb(61 61 62)" />
      <button-base @click="deleteTask" icon="restore_from_trash" color="#dd3557" />
    </div>
  </div>
</template>

<script>
import CheckBox from '@/components/CheckBox.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import { toastMixin } from '@/mixins/toast.mixin.js'
import { taskService } from '@/services'
import moment from 'moment'

export default {
  props: {
    task: {
      type: Object,
    },
  },
  components: {
    CheckBox,
    ButtonBase,
  },

  emits: ['open'],

  mixins: [toastMixin],

  methods: {
    deleteTask() {
      taskService.deleteTask(this.task.id)
        .then(({ data: { message } }) => {
          this.toast({
            message,
            type: 'success'
          })
          this.$store.dispatch('task/taskRemoved', this.task.id)
        })
    },

    change(checked) {
      if (checked) {
        taskService.markTask(this.task.id)
          .then(({ data: { message } }) => {
            this.toast({
              message,
              type: 'success'
            })
          })
          .catch(err => {
            const { statusCode, message } = err.response.data
            if (statusCode === 409 || statusCode === 404) {
              this.toast({
                message,
                type: 'error'
              })
            }
          })
      } else {
        taskService.unmarkTask(this.task.id)
          .then(({ data: { message } }) => {
            this.toast({
              message,
              type: 'success'
            })
          })
          .catch(err => {
            const { statusCode, message } = err.response.data
            if (statusCode === 409 || statusCode === 404) {
              this.toast({
                message,
                type: 'error'
              })
            }
          })
      }
    },

    openModal() {
      this.$emit('open', this.task)
    },
  },

  computed: {
    checked() {
      return this.task.status === 'DONE'
    },
    formatedDate() {
      return moment(this.task.createdAt).format('LL h:mma')
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
