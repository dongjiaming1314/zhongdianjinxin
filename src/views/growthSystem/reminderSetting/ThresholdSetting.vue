<template>
  <!--阀值设置-->
  <el-dialog
    title="阀值设置"
    :visible.sync="dialogVisible"
    width="65%"
    :v-if="dialogVisible"
    :before-close="handleClose">
    <div style="text-align: right;margin-bottom: 15px">
      <el-button size="small" type="primary" @click="handleAdd" v-if="isAdd">新 增</el-button>
      <el-button size="small" type="primary" @click="handleEdit" v-if="!isEdit && !isAdd">编 辑</el-button>
      <el-button size="small" type="primary" @click="handleDel" v-if="!isAdd">删 除</el-button>
      <el-button size="small" type="primary" @click="comeBack" v-if="isEdit">返 回</el-button>
    </div>
    <!--详情-->
    <div v-if="!isEdit" style="float:left;">
      <el-form ref="viewForm" :model="viewForm" label-width="130px">
        <el-col :span="12">
          <el-form-item label="资产值上升阈值:" prop="upAum">{{ viewForm.upAum }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上升标题:" prop="upTitle">{{ viewForm.upTitle }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上升提醒话术:" prop="upWords">{{ viewForm.upWords }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上升跳转链接:" prop="upLink">{{ viewForm.upLink }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资产值下降阈值:" prop="downAum">{{ viewForm.downAum }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降标题:" prop="downTitle">{{ viewForm.downTitle }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降提醒话术:" prop="downWords">{{ viewForm.downWords }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降跳转链接:" prop="downLink">{{ viewForm.downLink }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态:" prop="changeStatus">{{ viewForm.changeStatus }}</el-form-item>
        </el-col>
      </el-form>
    </div>
    <!--编辑-->
    <div style="float:left;">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="130px" v-if="isEdit">
        <el-col :span="12">
          <el-form-item label="资产值上升阈值:" prop="upAum">
            <el-input type="number" v-model.number="addForm.upAum" placeholder="请输入资产值上升阈值"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上升标题:" prop="upTitle">
            <el-input type="text" v-model="addForm.upTitle" placeholder="请输入上升标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上升提醒话术:" prop="upWords">
            <el-input type="text" v-model="addForm.upWords" placeholder="请输入上升提醒话术"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上升跳转链接:" prop="upLink">
            <el-input type="text" v-model="addForm.upLink" placeholder="请输入上升跳转链接"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资产值下降阈值:" prop="downAum">
            <el-input type="number" v-model.number="addForm.downAum" placeholder="请输入资产值下降阈值"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降标题:" prop="downTitle">
            <el-input type="text" v-model="addForm.downTitle" placeholder="请输入下降标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降提醒话术:" prop="downWords">
            <el-input type="text" v-model="addForm.downWords" placeholder="请输入下降提醒话术"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下降跳转链接:" prop="downLink">
            <el-input type="text" v-model="addForm.downLink" placeholder="请输入下降跳转链接"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态:" prop="changeStatus">
            <el-switch
              v-model="addForm.changeStatus"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" size="small" type="primary" @click="handleOn" v-if="isEdit">提 交</el-button>
      <el-button size="small" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {addThreshold,editThreshold,getLevelChangeDetail,deleteLevelThreshold} from '@/api/growthSystem/reminderSetting'

  export default {
    name: "ThresholdSetting",
    data() {
      return {
        dialogVisible: false,
        id: '',
        isAdd: true,
        isEdit: false,
        loading: false,
        addForm: {
          levelId: '',
          upAum: '',
          upTitle: '',
          upWords: '',
          upLink: '',
          downAum: '',
          downTitle: '',
          downWords: '',
          downLink: '',
          changeStatus: false
        },
        viewForm: {
          levelId: '',
          upAum: '',
          upTitle: '',
          upWords: '',
          upLink: '',
          downAum: '',
          downTitle: '',
          downWords: '',
          downLink: '',
          changeStatus: false
        },
        rules: {
          upAum: [{
            required: true,
            message: '请输入资产值上升阈值',
            trigger: 'change'
          }],
          upTitle: [{
            required: true,
            message: '请输入上升标题',
            trigger: 'change'
          }],
          upWords: [{
            required: true,
            message: '请输入上升提醒话术',
            trigger: 'change'
          }],
          upLink: [{
            required: true,
            message: '请输入上升跳转链接',
            trigger: 'change'
          }],
          downAum: [{
            required: true,
            message: '请输入资产值下降阈值',
            trigger: 'change'
          }],
          downTitle: [{
            required: true,
            message: '请输入下降标题',
            trigger: 'change'
          }],
          downWords: [{
            required: true,
            message: '请输入下降提醒话术',
            trigger: 'change'
          }],
          downLink: [{
            required: true,
            message: '请输入下降跳转链接',
            trigger: 'change'
          }],
        }
      }
    },
    methods: {
      openWin(_id) {
        this.isEdit = false
        this.$nextTick(() => {
          this.dialogVisible = true
          this.id = _id
          getLevelChangeDetail(this.id).then(res => {
            if (res.data.data) {
              this.isAdd = false
              this.addForm.levelId = res.data.data.id
              this.addForm.upAum = res.data.data.upAum
              this.addForm.upTitle = res.data.data.upTitle
              this.addForm.upWords = res.data.data.upWords
              this.addForm.upLink = res.data.data.upLink
              this.addForm.downAum = res.data.data.downAum
              this.addForm.downTitle = res.data.data.downTitle
              this.addForm.downWords = res.data.data.downWords
              this.addForm.downLink = res.data.data.downLink
              this.addForm.changeStatus = res.data.data.changeStatus === '0'
              this.viewForm.levelId = res.data.data.id
              this.viewForm.upAum = res.data.data.upAum
              this.viewForm.upTitle = res.data.data.upTitle
              this.viewForm.upWords = res.data.data.upWords
              this.viewForm.upLink = res.data.data.upLink
              this.viewForm.downAum = res.data.data.downAum
              this.viewForm.downTitle = res.data.data.downTitle
              this.viewForm.downWords = res.data.data.downWords
              this.viewForm.downLink = res.data.data.downLink
              this.viewForm.changeStatus = res.data.data.changeStatus === '0' ? '启用' : '不启用'
            } else {
              this.isAdd = true
              this.viewForm = {
                levelId: '',
                  upAum: '',
                  upTitle: '',
                  upWords: '',
                  upLink: '',
                  downAum: '',
                  downTitle: '',
                  downWords: '',
                  downLink: '',
                  changeStatus: false
              }
              this.addForm = {
                levelId: '',
                  upAum: '',
                  upTitle: '',
                  upWords: '',
                  upLink: '',
                  downAum: '',
                  downTitle: '',
                  downWords: '',
                  downLink: '',
                  changeStatus: false
              }
            }
          }).catch(res => {
            this.$message.error(res)
          })
        })
      },
      handleAdd() {
        this.isAdd = true
        this.isEdit = true
      },
      handleEdit() {
        this.isEdit = true
        this.isAdd = false
      },
      comeBack() {
        this.isEdit = false
      },
      handleOn() {
        this.$refs['addForm'].validate(valid => {
          if (valid) {
            const subForm = this.addForm;
            subForm.changeStatus = subForm.changeStatus ? '0' : '1'
            this.loading = true
            if (this.isAdd) {
              addThreshold(Object.assign({}, subForm, {levelId: this.id})).then(res => {
                this.$message.success(res.data.msg)
                this.$refs['addForm'].resetFields()
                this.loading = false
                this.dialogVisible = false
                this.$emit('getList')
              }).catch(res => {
                this.loading = false
                this.$message.error(res)
              })
            } else {
              editThreshold(Object.assign({}, subForm, {levelId: this.id})).then(res => {
                this.$message.success(res.data.msg)
                this.$refs['addForm'].resetFields()
                this.loading = false
                this.dialogVisible = false
                this.$emit('getList')
              }).catch(res => {
                this.loading = false
                this.$message.error(res)
              })
            }
          }
        })
      },
      handleDel() {
        this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLevelThreshold(this.id).then(res => {
            this.$message.success(res.data.msg)
            this.handleClose()
            this.$emit('getList')
          }).catch(res => {
            this.$message.error(res)
          })
        })
      },
      handleClose() {
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped>
  .el-dialog__body {
    padding: 20px;
  }
</style>
