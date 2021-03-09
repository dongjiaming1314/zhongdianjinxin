<!--
  ~
  ~  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
  ~
  -->

<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        :permission="permissionList"
        @refresh-change="refreshChange"
        @row-update="handleUpdate"
        @row-save="handleSave"
        @row-del="handleDelete"/>
    </basic-container>
  </div>
</template>

<script>
    import {addObj, delObj, fetchList, putObj} from '@/api/admin/client'
    import {tableOption} from '@/const/crud/admin/client'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Client',
        data() {
            return {
                tableData: [],
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20 // 每页显示多少条
                },
                tableLoading: false,
                tableOption: tableOption
            }
        },
        created() {
        },
        mounted: function () {
          this.getList(this.page)
        },
        computed: {
            ...mapGetters(['permissions']),
            permissionList() {
                return {
                    addBtn: this.vaildData(this.permissions.sys_client_add, false),
                    delBtn: this.vaildData(this.permissions.sys_client_del, false),
                    editBtn: this.vaildData(this.permissions.sys_client_edit, false)
                }
            }
        },
        methods: {
            getList(page, params) {
                this.tableLoading = true
                fetchList(Object.assign({
                    current: page.currentPage,
                    size: page.pageSize
                }, params)).then(response => {
                    this.tableData = response.data.data.records
                    this.page.total = response.data.data.total
                    this.tableLoading = false
                })
            },
            handleDelete: function (row, index) {
              delObj(row.clientId).then(() => {
                this.$message.success(this.$t('common.deleteSuccess'))
              })
                // var _this = this
                // this.$confirm('是否确认删除ID为' + row.clientId, '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(function () {
                //     return delObj(row.clientId)
                // }).then(() => {
                //     _this.$message.success('删除成功')
                //     this.refreshChange()
                // }).catch(function () {
                // })
            },
            handleUpdate: function (row, index, done, loading) {
                if (row.accessTokenValidity === undefined) {
                    row.accessTokenValidity = 60 * 60 * 12
                }
                if (row.refreshTokenValidity === undefined) {
                    row.refreshTokenValidity = 60 * 60 * 24 * 30
                }

                putObj(row).then(() => {
                    this.$message.success(this.$t('common.editSuccess'))
                    this.refreshChange()
                    done()
                  loading()
                })
            },
            handleSave: function (row, done, loading) {
                if (row.accessTokenValidity === undefined) {
                    row.accessTokenValidity = 60 * 60 * 12
                }
                if (row.refreshTokenValidity === undefined) {
                    row.refreshTokenValidity = 60 * 60 * 24 * 30
                }
                addObj(row).then(() => {
                    this.$message.success(this.$t('common.addSuccess'))
                    this.refreshChange()
                    done()
                  loading()
                })
            },
            refreshChange() {
                this.getList(this.page)
            }
        }
    }
</script>

<style lang="scss" scoped>
  /deep/.el-table__row .el-icon-view {
    display: none;
  }
  /deep/.el-table__row .el-icon-edit {
    display: none;
  }
  /deep/.el-table__row .el-icon-delete {
    display: none;
  }
  /deep/.el-table__row .el-button, .el-button--small {
    padding: 0;
  }
</style>

