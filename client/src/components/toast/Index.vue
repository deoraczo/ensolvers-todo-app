<template>
  <div class="toast toast--position" :class="toastClass" v-show="show">
    <div class="toast-icon">
      <component :is="toastIcon"></component>
    </div>
    <div class="toast-body">
      <div class="toast--title">{{ toastTitle }}</div>
      <div class="toast--message">{{ message }}</div>
    </div>
    <div class="toast-action">
      <button @click="hide">&times;</button>
    </div>
  </div>
</template>

<script>
import ErrorIcon from './ErrorIcon.vue'
import SuccessIcon from './SuccessIcon.vue'
import WarningIcon from './WarningIcon.vue'

export default {
  // props: {
  //   title: {
  //     type: String
  //   },
  //   message: {
  //     type: String,
  //     required: true
  //   },
  //   type: {
  //     type: String,
  //     default: 'success'
  //   }
  // },

  components: {
    ErrorIcon,
    SuccessIcon,
    WarningIcon
  },


  data: () => ({
    show: false,
    timeout: null,
    title: null,
    message: 'Toast',
    type: 'success'
  }),

  created(){
    this.unsubscribe = this.$store.subscribeAction((action) => {
      if (action.type === 'toast/fire') {
        const { message, type, title } = action.payload
        this.message = message
        this.type = type
        this.title = title
        this.show = true
      }
    })
  },

  watch: {
    show() {
      if(this.timeout) {
        clearTimeout(this.timeout)
        return
      }

      this.timeout = setTimeout(() => {
        this.show = false
      }, 3000)
    }
  },

  computed: {
    toastIcon() {
      return `${this.type}-icon`
    },
    toastClass() {
      return [`toast-${this.type}`]
    },
    toastTitle() {
      return this.title ?? this.type.charAt(0).toUpperCase() + this.type.slice(1);
    }
  },

  methods: {
    hide() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: relative;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  box-shadow: 1px 5px 10px -5px rgba(0, 0, 0, 0.2);
  &::before {
    content: "";
    width: 6px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &--position {
    position: fixed;
    right: 20px;
    top: 20px;
  }
  &-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-body {
    flex-grow: 1;
    margin: 0 1rem;
    .toast--title {
      color: #26252a;
      font-weight: 700;
      margin-bottom: 0.4rem;
    }
    .toast--message {
      font-size: 14px;
      color: #6b7280;
    }
  }
  &-action {
    button {
      width: 1.5rem;
      height: 1.5rem;
      border: none;
      padding: 0;
      color: #9ca3af;
      opacity: 0.7;
      background-color: transparent;
      font-size: 1.8rem;
      cursor: pointer;
      &:hover {
        opacity: .7;
      }
    }
  }
}

.toast {
  &-success {
    background-color: #ecfdf5;
    &::before, .toast-icon {
      background-color: #34d399;
    }
    .toast-icon svg {
      fill: #ecfdf5
    }
  }
  &-error {
    background-color: #fef2f2;;
    .toast-icon svg {
      fill: #f3f2f2;
    }
    &::before, .toast-icon {
      background-color: #ef4444;
    }
  }
  &-warning {
    background-color: #fffbeb;
    &::before, .toast-icon {
      background-color: #f59e0b;
    }
    .toast-icon svg {
      fill: #fffbeb;
    }
  }
}
</style>