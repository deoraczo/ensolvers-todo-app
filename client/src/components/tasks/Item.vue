<template>
  <div class="items">
    <check-box chec="" />
    <div class="info">
      <span class="info-title">{{ task.title }}</span>
      <span class="info-date">5:23 AM, 01/16/17</span>
    </div>
    <div class="actions">
      <button-base @click="deleteTask" icon="fa-solid fa-trash" color="rgb(61 61 62)" />
      <button-base icon="fa-solid fa-pencil" color="rgb(61 61 62)" />
    </div>
  </div>
</template>

<script>
import CheckBox from '@/components/CheckBox.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import { taskService } from '@/services'
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

  methods: {
    deleteTask() {
      taskService.deleteTask(this.task.id)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
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
