<template>
  <el-dialog
    :title="title"
    :visible.sync="innerVisible"
    :width="sizeHandler"
    v-dialogdrag
    @open="openHandler"
    @opened="openedHandler"
    @close="closeHandler"
    @closed="closedHandler"
  >
    <el-form :label-position="labelPosition" :label-width="labelWidth">
      <slot></slot>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <slot name="footer"></slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      innerVisible: this.visible
    };
  },
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    title: {
      type: String,
      default: () => {
        return "提示";
      }
    },
    size: {
      type: String,
      required: false,
      default: () => {
        return "default";
      }
    },
    labelWidth: {
      type: [String || Number],
      default: () => {
        return "80px";
      }
    },
    labelPosition: {
      type: String,
      default: () => {
        return "right";
      }
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val === oldVal) {
        return;
      }
      this.innerVisible = val;
    },
    innerVisible(val, oldVal) {
      if (val === oldVal) {
        return;
      }
      this.$emit("update:visible", val);
    }
  },
  computed: {
    sizeHandler: function() {
      if (this.size == "default") {
        return "40%";
      } else if (this.size == "small") {
        return "30%";
      } else if (this.size == "large") {
        return "60%";
      }
    }
  },
  methods: {
    openHandler() {
      this.$emit("open");
    },
    openedHandler() {
      this.$emit("opened");
    },
    closeHandler() {
      this.$emit("close");
    },
    closedHandler() {
      this.$emit("closed");
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
}

::v-deep .el-dialog__footer {
  border-top: 1px solid #f0f0f0;
  text-align: right;
  padding-bottom: 10px;
}

::v-deep .el-dialog__body {
  padding: 20px;
}
</style>
