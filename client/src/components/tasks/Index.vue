<template>
  <div class="task">
    <task-item v-for="task in tasks" :key="task.id" :task="task"/>
  </div>
</template>


<script>
import TaskItem from './Item.vue'
export default {
  props: {
    tasks: {
      type: Array
    }
  },
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
</style>