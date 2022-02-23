<template>
  <div class="items">
      <check-box />
      <div class="info">
        <span class="info-title">Create a project react</span>
        <span class="info-date">5:23 AM, 01/16/17</span>
      </div>
      <div class="actions">
        <button-base icon="fa-solid fa-trash" color="rgb(61 61 62)" />
        <button-base icon="fa-solid fa-pencil" color="rgb(61 61 62)" />
      </div>
    </div>
</template>

<script>
import CheckBox from '@/components/CheckBox.vue'
export default {
  components: {
    CheckBox
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
        font-size: .85rem;
      }
    }
  }
</style>