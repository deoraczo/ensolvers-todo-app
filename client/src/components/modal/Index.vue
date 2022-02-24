<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="container">
          <div class="modal-container">
            <div class="modal-header">
              <div class="header-title">
                <slot name="header"> </slot>
              </div>
              <button class="close-btn" @click="$emit('close')">
                <font-awesome-icon icon="fa-solid fa-xmark" size="xl" />
              </button>
            </div>

            <div class="modal-body">
              <slot name="body"> default body </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(108, 114, 119, 0.6);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 42rem;
  width: 100%;
  margin: 0px auto;
  padding: 20px;
  background-color: #191c1f;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-title {
    font-size: 1rem;
    line-height: 1.5rem;
    color: #fff;
    text-transform: uppercase;
  }

  .close-btn {
    width: 2rem;
    height: 2rem;
    border: none;
    padding: 0;
    color: #9ca3af;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: rgba(75, 85, 99, 1);
      color: #fff;
      border-radius: 0.5rem;
      padding: 0.375rem;
    }
  }
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.modal-default-button {
  float: right;
}
</style>
