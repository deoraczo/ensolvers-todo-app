<template>
  <app-layout>
    <div class="container">
      <div class="task-header">
        <div>
          <button class="back-btn" @click="goFolders">
            <i class="material-icons">chevron_left</i>
          </button>
        </div>
        <div class="task-header-wrapper">
          <div class="task-header--title">
            <i class="material-icons">folder</i>
            <h1 class="uppercase">{{ folderName }}</h1>
          </div>
        </div>
      </div>
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

const initTaskDTO = { 
  title: '',
  folderId: null,
};

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
        title: '',
        folderId: null,
      },
      errorHelper: '',
      requestError: '',
      folderId: null,
    }
  },

  created() {
    const { id } = this.$route.params
    this.folderId = id
  },

  async mounted() {
    try {
      await this.fetchTasksByFolderId(this.folderId)
    } catch (error) {
      const { statusCode, message } = error.response.data
      if (statusCode === 404) {
          this.toast({
            message,
            type: 'error'
          })

          this.$router.push({ name: 'folders'})
      }
    }
  },

  methods: {
    ...mapActions({
      fetchTasks: 'task/fetchTasks',
      fetchTasksByFolderId: 'task/fetchTasksByFolderId'
    }),

    closeModal() {
      this.showModal = false
    },

    openModal() {
      this.resetFormCreator()
      this.showModal = true
    },

    resetFormCreator() {
      this.taskDTO = Object.assign({}, initTaskDTO)
      this.errorHelper = ''
      this.requestError = ''
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
      this.taskDTO.folderId = this.folderId
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
    },

    goFolders() {
      this.$router.push({ name: 'folders' })
    }

  },
  computed: {
    ...mapGetters({
      tasks: 'task/getTasks',
      folderName: 'task/getFolderName'
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
.task-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  &-wrapper {
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
  }
  &--title {
    color: var(--text-color);
    font-weight: 700;
    text-align: center;
    display: flex;
    align-items: center;
    h1 {
      font-size: 1.2rem;
      margin-left: 8px;
    }
  }
}


.back-btn {
    width: 2.2rem;
    height: 2.2rem;
    border: none;
    padding: 0;
    color: var(--text-color);
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 30px;
    }
    cursor: pointer;
    &:hover {
      background-color: rgba(75, 85, 99, 1);
      color: #fff;
      border-radius: 0.5rem;
      padding: 0.375rem;
    }
  }

</style>