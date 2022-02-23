<template>
  <app-layout>
    <div class="container">
      <h1 class="title">TODO APP</h1>
      <div class="" style="margin-bottom: 20px;">
        <button-base text="Add task" icon="fa-solid fa-add"/>
      </div>
      <task :tasks="tasks"/>
    </div>
    <toast message="Successfylly" type="success" />
  </app-layout>
</template>

<script>
import AppLayout from '@/layouts/AppLayout.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import Task from '@/components/tasks/Index.vue'
import Toast from '@/components/toast/Index.vue'
import { taskService } from '@/services'

export default {
  components: {
    AppLayout,
    ButtonBase,
    Task,
    Toast
  },
  data() {
    return {
      tasks: [],
    }
  },
  created() {
    taskService.getAllTasks()
      .then(({ data }) => {
        this.tasks = data
      })
      .catch(err => {
        console.log(err)
      })
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