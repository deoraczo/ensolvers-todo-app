<template>
  <app-layout>
    <div class="container">
      <h1 class="title">TODO APP</h1>
      <div class="" style="margin-bottom: 20px;">
        <button-base text="Add task" icon="fa-solid fa-add"/>
      </div>
      <task v-if="tasks" :tasks="tasks"/>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from '@/layouts/AppLayout.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import Task from '@/components/tasks/Index.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    AppLayout,
    ButtonBase,
    Task,
  },
  mounted() {
    this.fetchTasks()
  },
  methods: {
    ...mapActions({
      fetchTasks: 'task/fetchTasks'
    })
  },
  computed: {
    ...mapGetters({
      tasks: 'task/getTasks'
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