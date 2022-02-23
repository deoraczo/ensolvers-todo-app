<template>
  <div class="task">
    <task-item />
  </div>
</template>


<script>
import TaskItem from './Item.vue'
export default {
  components: {
    TaskItem
  }
}
</script>

<style lang="scss" scoped>
.task {
  padding: 30px;
  background-color: #20212c;
  border-radius: 8px;
}

.actions {
  :not(:last-child) {
    margin-right: 8px;
  }
}
</style>