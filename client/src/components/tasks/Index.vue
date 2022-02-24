<template>
  <div class="task">
    <task-item v-for="task in tasks" :key="task.id" :task="task" @open="openModal"/>
    <modal v-if="showModal" @close="closeModal">
      <h3 slot="header">Update task</h3>
      <div slot="body">
        <alert v-show="requestError" :message="requestError" @close="requestError = ''"/>
        <form class="form" ref="formCreator">
          <div class="form-control">
            <label for="">Name</label>
            <input type="text" autofocus v-model="taskDTO.title">
            <span v-show="errorHelper" class="error-helper">{{ errorHelper }}</span>
          </div>
        </form>
      </div>
      <div slot="footer" class="footer-actions">
        <button-base @click="closeModal" text="Cerrar" color="#3a4246"/>
        <button-base @click="updateTask" text="Update" color="#00ab47"/>
      </div>
    </modal>
  </div>
</template>


<script>
import TaskItem from './Item.vue'
import Modal from '@/components/modal/Index.vue'
import Alert from '@/components/Alert.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import { taskService } from '@/services'
import { toastMixin } from '@/mixins/toast.mixin.js'

const initTaskDTO = { title: '' };

export default {
  props: {
    tasks: {
      type: Array
    }
  },
  components: {
    TaskItem,
    Modal,
    Alert,
    ButtonBase
  },
  mixins: [toastMixin],

  data() {
    return {
      showModal: false,
      taskId: '',
      taskDTO: {
        title: ''
      },
      requestError: '',
      errorHelper: '',
    }
  },

  methods: {
    closeModal() {
      this.showModal = false
    },
    validateForm() {
      if (this.taskDTO.title && this.taskDTO.title.trim().length > 0) {
        return true
      }

      this.errorHelper = 'Name is required'

      return false
    },

    resetFormUpdater() {
      this.taskDTO = Object.assign({}, initTaskDTO)
      this.errorHelper = ''
      this.taskId = ''
      this.requestError = ''
    },
    
    updateTask() {
      if (!this.validateForm()) {
        return
      }
      taskService.renameTask(this.taskId, this.taskDTO)
        .then(({ data: { message } })=> {
          this.closeModal()
          
          this.toast({
            message,
            type: 'success'
          })
          this.$store.dispatch('task/taskUpdated', {
            id: this.taskId,
            title: this.taskDTO.title
          })
          this.resetFormUpdater()
        })
        .catch(err => {
          const { statusCode, message } = err.response.data
          if (statusCode === 409) {
            this.requestError = message
          }
        })
    },

    openModal(task) {
      this.resetFormUpdater()
      this.showModal = true
      this.taskId = task.id
      this.taskDTO.title = task.title
    }
  },

  watch: {
    'taskDTO.title': function(newVal) {
      if (newVal && newVal.trim().length > 0 && this.errorHelper.length > 0) {
        this.errorHelper = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  padding: 30px;
  background-color: #20212c;
  border-radius: 8px;
}
</style>