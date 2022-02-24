<template>
  <app-layout>
    <div class="container">
      <h1 class="title">TODO APP</h1>
      <div class="" style="margin-bottom: 20px;">
        <button-base @click="openModal" text="Add task" icon="add"/>
      </div>
      <task v-if="tasks" :tasks="tasks"/>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Create task</h3>
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
        <button-base @click="createTask" text="Create" color="#00ab47"/>
      </div>
    </modal>
  </app-layout>
</template>

<script>
import AppLayout from '@/layouts/AppLayout.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import Task from '@/components/tasks/Index.vue'
import Modal from '@/components/modal/Index.vue'
import { toastMixin } from '@/mixins/toast.mixin.js'
import { uuidGenerator } from '@/utils/uuid-generator.js'
import { mapActions, mapGetters } from 'vuex'
import { taskService } from '@/services'
import Alert from '@/components/Alert.vue'

const initTaskDTO = { title: '' };

export default {
  components: {
    AppLayout,
    ButtonBase,
    Task,
    Modal,
    Alert
  },
  mixins: [toastMixin],

  data() {
    return {
      showModal: false,
      taskDTO: {
        title: ''
      },
      errorHelper: '',
      requestError: '',
    }
  },

  mounted() {
    this.fetchTasks()
  },

  methods: {
    ...mapActions({
      fetchTasks: 'task/fetchTasks'
    }),

    closeModal() {
      this.showModal = false
    },

    openModal() {
      this.showModal = true
    },

    resetFormCreator() {
      this.taskDTO = Object.assign({}, initTaskDTO)
      this.errorHelper = ''
    },

    validateForm() {
      if (this.taskDTO.title && this.taskDTO.title.trim().length > 0) {
        return true
      }

      this.errorHelper = 'Name is required'

      return false
    },

    createTask() {
      if (!this.validateForm()) {
        return
      }

      const uuid = uuidGenerator()
      taskService.createTask(uuid, this.taskDTO)
        .then(({ data: { message } }) => {
          this.closeModal()
          this.toast({
            message,
            type: 'success'
          })
          this.$store.dispatch('task/taskCreated', {
            id: uuid,
            title: this.taskDTO.title,
            status: 'PENDING',
            createdAt: new Date(),
          })
          this.resetFormCreator()
        })
        .catch(err => {
          const { statusCode, message } = err.response.data
          if (statusCode === 409) {
            this.requestError = message
          }
        })
    }

  },
  computed: {
    ...mapGetters({
      tasks: 'task/getTasks'
    })
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
.title {
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}

</style>