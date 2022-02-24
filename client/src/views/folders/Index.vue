<template>
  <app-layout>
    <div class="container">
      <h1 class="title">FOLDERS</h1>
      <div class="" style="margin-bottom: 20px;">
        <button-base @click="openModal" text="Add Folder" icon="add"/>
      </div>
      <folder v-if="folders" :folders="folders"/>
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Create folder</h3>
      <div slot="body">
        <alert v-show="requestError" :message="requestError" @close="requestError = ''"/>
        <form class="form" ref="formCreator">
          <div class="form-control">
            <label for="">Name</label>
            <input type="text" autofocus v-model="folderDTO.title">
            <span v-show="errorHelper" class="error-helper">{{ errorHelper }}</span>
          </div>
        </form>
      </div>
      <div slot="footer" class="footer-actions">
        <button-base @click="closeModal" text="Cerrar" color="#3a4246"/>
        <button-base @click="createFolder" text="Create" color="#00ab47"/>
      </div>
    </modal>
  </app-layout>
</template>

<script>
import AppLayout from '@/layouts/AppLayout.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import Modal from '@/components/modal/Index.vue'
import Folder from '@/components/folders/Index.vue'
import { toastMixin } from '@/mixins/toast.mixin.js'
import { uuidGenerator } from '@/utils/uuid-generator.js'
import { mapActions, mapGetters } from 'vuex'
import { folderService } from '@/services'
import Alert from '@/components/Alert.vue'

const initFolderDTO = { title: '' };

export default {
  components: {
    AppLayout,
    ButtonBase,
    Modal,
    Alert,
    Folder
  },
  mixins: [toastMixin],

  data() {
    return {
      showModal: false,
      folderDTO: {
        title: ''
      },
      errorHelper: '',
      requestError: '',
    }
  },

  mounted() {
    this.fetchFolders()
  },

  methods: {
    ...mapActions({
      fetchFolders: 'folder/fetchFolders'
    }),


    openModal() {
      this.resetFormCreator()
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
    },

    resetFormCreator() {
      this.folderDTO = Object.assign({}, initFolderDTO)
      this.errorHelper = ''
      this.requestError = ''
    },

    validateForm() {
      if (this.folderDTO.title && this.folderDTO.title.trim().length > 0) {
        return true
      }

      this.errorHelper = 'Name is required'

      return false
    },

    createFolder() {
      if (!this.validateForm()) {
        return
      }

      const uuid = uuidGenerator()
      folderService.createFolder(uuid, this.folderDTO)
        .then(({ data: { message } }) => {
          this.closeModal()
          this.toast({
            message,
            type: 'success'
          })
          this.$store.dispatch('folder/folderCreated', {
            id: uuid,
            title: this.folderDTO.title,
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
  },
  computed: {
    ...mapGetters({
      folders: 'folder/getFolders'
    })
  },
}
</script>
