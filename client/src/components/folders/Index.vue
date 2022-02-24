<template>
  <div class="folder">
    <folder-item v-for="folder in folders" :key="folder.id" :folder="folder" @open="openModal"/>
    <modal v-if="showModal" @close="closeModal">
      <h3 slot="header">Update folder</h3>
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
        <button-base @click="updateFolder" text="Update" color="#00ab47"/>
      </div>
    </modal>
  </div>
</template>


<script>
import FolderItem from './Item.vue'
import Modal from '@/components/modal/Index.vue'
import Alert from '@/components/Alert.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import { toastMixin } from '@/mixins/toast.mixin.js'
import { folderService } from '@/services'

const initFolderDTO = { title: '' };

export default {
  props: {
    folders: {
      type: Array
    }
  },
  components: {
    FolderItem,
    Modal,
    Alert,
    ButtonBase
  },
  mixins: [toastMixin],

  data() {
    return {
      showModal: false,
      folderId: '',
      folderDTO: {
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
      if (this.folderDTO.title && this.folderDTO.title.trim().length > 0) {
        return true
      }

      this.errorHelper = 'Name is required'

      return false
    },

    resetFormUpdater() {
      this.folderDTO = Object.assign({}, initFolderDTO)
      this.errorHelper = ''
      this.folderId = ''
      this.requestError = ''
    },
    
    updateFolder() {
       if (!this.validateForm()) {
        return
      }
      folderService.renameFolder(this.folderId, this.folderDTO)
        .then(({ data: { message } })=> {
          this.closeModal()
          
          this.toast({
            message,
            type: 'success'
          })
          this.$store.dispatch('folder/folderUpdated', {
            id: this.folderId,
            title: this.folderDTO.title
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

    openModal(folder) {
      this.resetFormUpdater()
      this.showModal = true
      this.folderId = folder.id
      this.folderDTO.title = folder.title
    }
  },

  watch: {
    'folderDTO.title': function(newVal) {
      if (newVal && newVal.trim().length > 0 && this.errorHelper.length > 0) {
        this.errorHelper = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.folder {
  padding: 30px;
  background-color: #20212c;
  border-radius: 8px;
}
</style>