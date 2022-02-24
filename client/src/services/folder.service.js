import { apiInvoker } from "./api.invoker";

class FolderService {
  async getAllFolders() {
    return await apiInvoker.http.get('/folders')
  }

  async getFolderWithTasks(folderId) {
    return await apiInvoker.http.get(`/folders/${folderId}/tasks`)
  }

  async deleteFolder(id) {
    return await apiInvoker.http.delete(`/folders/${id}`)
  }

  async createFolder(id, folderDTO) {
    return await apiInvoker.http.put(`/folders/${id}`, folderDTO)
  }

  async renameFolder(id, folderDTO) {
    return await apiInvoker.http.patch(`/folders/${id}`, folderDTO)
  }
}

const folderService = new FolderService()

export {
  folderService
}