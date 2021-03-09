<template>
  <el-dialog
    title="角色授权"
    :visible.sync="dialogVisible"
    width="65%"
    :before-close="handleClose">
    <el-tree class="filter-tree"
             :data="dsScopeData"
             node-key="id"
             highlight-current
             :props="defaultProps"
             ref="scopeTree"
             default-expand-all="true"
             :default-checked-keys="checkedDsScope"
             show-checkbox>
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" :loading="loading" type="primary" @click="handleOn">保 存</el-button>
      <el-button size="small" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "Comp2",
    data() {
      return {
        dialogVisible: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dsScopeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        checkedDsScope: [9, 10, 6, 7]
      }
    },
    methods: {
      // 打开弹窗
      openWin(row) {
        this.dialogVisible = true;
      },
      // 确定
      handleOn() {
        console.log(this.$refs.scopeTree.getCheckedKeys());
        this.loading = true;
        this.dialogVisible = false;
        this.$emit('getList')
      },
      // 关闭弹窗
      handleClose() {
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>
