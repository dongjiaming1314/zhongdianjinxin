<template>
    <div class="execution equityCompose">
        <avue-crud ref="crud"
                  :page="page"
                  :data="tableData"
                  :permission="permissionList"
                  :table-loading="tableLoading"
                  :option="tableOption"
                  @on-load="getList"
                  @search-change="searchChange"
                  @row-del="rowDel">
                  <template slot-scope="scope" slot="name">
                      <span class="coverName"
                        @click="checkDetail(scope.row)"
                        >{{scope.row.name}}</span>
                  </template>
                  <template slot-scope="scope" slot="menuLeft">
                    <el-button 
                      v-if="permissionList.addBtn"
                      type="primary"
                      size="small"
                      @click.stop="handleAdd()">新增</el-button>
                  </template>
                  <template slot-scope="scope" slot="menu">
                    <el-button
                        v-if="permissionList.editBtn"
                        size="small"
                        type="text"
                        @click="handleEdit(scope)"
                        >编辑</el-button>
                    <el-button
                        v-if="permissionList.delBtn"
                        size="small"
                        type="text"
                        @click="rowDel(scope.row, scope.index)"
                        >删除</el-button>
                    <el-button
                      size="small"
                      type="text"
                      @click.stop="checkDetail(scope.row)">查看</el-button>
                  </template>
        </avue-crud>
        <template>
          <el-dialog :title="equityTitle" :visible.sync="dialogFormVisible">
            <el-dialog
              width="40%"
              title="权益列表"
              :visible.sync="innerVisible"
              :close-on-press-escape="false"
              :close-on-click-modal="false"
              :before-close="beforeClose"
              append-to-body>
              <el-table
                :data="equityList"
                @selection-change="handleSelectionChange"
                ref="multipleTables"
                v-loading="loading"
                border
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="序号"
                  type="index"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="equiName"
                  label="权益名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="equityTypeName"
                  label="权益类型"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="parentName"
                  label="权益目录">
                </el-table-column>
                <el-table-column
                  prop="clientId"
                  label="所属商户">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="库存">
                </el-table-column>
              </el-table>
            </el-dialog>
            <el-form ref="composeForm" :model="composeForm">
              <el-form-item label="组合名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="composeForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="权益列表"  :label-width="formLabelWidth">
                <el-button type="primary" size='mini' @click="equityAdd">添加</el-button>
              </el-form-item>
            </el-form>
              <el-table
                v-if="equityData.length"
                :data="equityData"
                border
                style="width: 100%">
                <el-table-column
                  label="序号"
                  type="index"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="equiName"
                  label="权益名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="equityTypeName"
                  label="权益类型"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="parentName"
                  label="权益目录">
                </el-table-column>
                <el-table-column
                  prop="clientId"
                  label="所属商户">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="库存">
                </el-table-column>
                  <el-table-column
                      fixed="right"
                      label="操作"
                      width="120">
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="deleteRow(scope.$index, equityData)"
                          type="text"
                          size="small">
                          移除
                        </el-button>
                      </template>
                    </el-table-column>
              </el-table>
            <el-form ref="composeForm" :model="composeForm" class="topMargin">
              <el-form-item label="组合库存" prop="number"  :label-width="formLabelWidth">
                <el-input v-model="composeForm.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="组合发放模式" prop="issueType"  :label-width="formLabelWidth">
                <el-radio v-model="composeForm.issueType" label="0">全部</el-radio>
                <el-radio v-model="composeForm.issueType" label="1">任意选择</el-radio></el-form-item>
              <el-form-item label="可选数量" v-show="composeForm.issueType === '1'" prop="availCost"  :label-width="formLabelWidth">
                <el-input v-model="composeForm.availCost" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark"  :label-width="formLabelWidth">
                <el-input type="textarea" v-model="composeForm.remark" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sureToAdd">确 定</el-button>
            </div>
          </el-dialog>
        </template>
    </div>
</template>

<script>
  import Bus from '@/util/bus'
  import {
    fetchList,
    addObj,
    putObj,
    delObj,
    fetchEquityList,
    fetchDetail
  } from '@/api/equity/compose'
  import {
      getType
  } from '@/api/equity/info'
  import { remoteDic } from '@/api/admin/dict'
  import {
    tableOption
  } from '@/const/crud/equity/compose'
  import {
    mapGetters
  } from 'vuex'
  import {
    deepClone
  }from '@/util/tag'
  import {
    dateFormat
  } from '@/util/date'

  export default {
    name: 'equityCompose',
    data() {
      return {
        loading: false,  //权益信息列表
        equityTitle: '新增',  //权益新增，编辑
        multipleSelection: [],  //权益选项
        // 权益列表数据
        equityList: [],
        innerVisible: false,  //权益列表弹框
        equityData:[],  //已选权益
        // 组合新增form
        composeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        // 组合新增
        dialogFormVisible: false,
        activeName:'first', //权益，申请切换
        tableData: [],
        page: {
            total: 0, // 总页数
            currentPage: 1, // 当前页数
            pageSize: 20 // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption,
      }
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permissions.equity_compose_add),
          delBtn: this.vaildData(this.permissions.equity_compose_del),
          editBtn: this.vaildData(this.permissions.equity_compose_edit),
          checkBtn: this.vaildData(this.permissions.equity_compose_check)
        }
      }
    },
    methods: {
      // 获取权益信息列表
      getList(page, params, done) {
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.page.total = response.data.data.total
          this.tableData = response.data.data.records
          this.tableLoading = false
          if(typeof(done)!='undefined') done()
        }).catch(() => {
          this.tableLoading=false
        })
      },
      rowDel: function (row, index) {
        var _this = this
        this.$confirm('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delObj(row.id)
        }).then(data => {
          _this.$message({
            message: data.data.msg,
            type: 'success'
          })
          this.getList( this.page, this.$refs.crud.searchForm )
        })
      },
      /**
       * 搜索回调
       */
      searchChange(params, done) {
        let middle = deepClone( this.filterForm(params) )
        if( typeof( this.filterForm(params)['createTime'] ) == 'object' ){
          middle['createStartTime'] = dateFormat ( this.filterForm(params)['createTime'][0] )
          middle['createEndTime'] = dateFormat ( this.filterForm(params)['createTime'][1] )
        }
        let {createTime, ...finalData} = middle
        this.getList( this.page, finalData, done )
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      // 权益组合新增
      handleAdd(){
        this.dialogFormVisible = true
        this.equityTitle = '新增'
        // 清空数据
        this.composeForm = {
          name: '',
          remark: '',
          issueType: '0',
          number: '',
          availCost:''
        }
        this.equityData = []
      },

      // 权益列表添加
      equityAdd(){
        this.innerVisible = true
        this.loading = true
        // 将已有的选中
        //  选中数据 id
        // equityList//所有数据
        // 获取权益信息，将权益类型遍历一遍
        remoteDic('equity_type').then(response=>{
            let middleList = response.data.data['equity_type']
            // 数据需要处理
            fetchEquityList().then(response => {
                this.loading = false
                this.equityList = response.data.data.map(item=>{
                  // 遍历权益类型，将数字改成名称
                  item["equityTypeName"] = middleList.filter(every=>every['value'] === item['equityType'])[0]['label']
                  return item
                })
                
                let idList = this.equityData.map(item=>item.id)
                if( !idList.length ) return false
                let _this = this
                this.equityList.forEach( ( item , index )=>{
                    if( idList.findIndex(one=>one === item.id) !== -1 ){
                      setTimeout(function(){
                        _this.$refs.multipleTables.toggleRowSelection(_this.equityList[index],true)
                      },1)
                    }else{
                      setTimeout(function(){
                        _this.$refs.multipleTables.toggleRowSelection(_this.equityList[index],false)
                      },1)
                    }
                })
            }).catch(() => {})
        }).catch(()=>{
          this.$message({
            message: '无法获取权益类型！',
            type: 'error'
          })
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 权益列表关闭前操作
      beforeClose(done){
        this.equityData = deepClone( this.multipleSelection )
        done()
      },
      // 删除已选权益
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      //权益组合新增确定
      sureToAdd(){
        if( this.equityTitle === '新增' ) {
          //  成功数据清空
          let middle = deepClone( this.composeForm )
          if( this.equityData.length ){
              middle['ids'] = this.equityData.map( item => item.id )
              addObj(middle).then(data => {
                this.dialogFormVisible = false
                this.$message({
                  message: data.data.msg,
                  type: 'success'
                })
                this.$refs['composeForm'].resetFields()
                this.getList( this.page, this.$refs.crud.searchForm )
              }).catch(() => {
                
              })
          }else{
              this.$message({
                  message: '请先添加选择权益！',
                  type: 'warning'
              })
          }
        }else if( this.equityTitle === '编辑' ) {
          let middle = deepClone( this.composeForm )
          if( this.equityData.length ){
              middle['ids'] = this.equityData.map(item=>item.id)
              putObj(middle).then(data=>{
                this.dialogFormVisible = false
                this.$message({
                  message: data.data.msg,
                  type: 'success'
                })
                this.$refs['composeForm'].resetFields()
                this.getList( this.page, this.$refs.crud.searchForm )
              }).catch(()=>{

              })
          }else{
              this.$message({
                message: '请先添加选择权益！',
                type: 'warning'
              })
          }
          
        }
      },
      // 权益组合编辑
      handleEdit( scope ) {
        this.dialogFormVisible = true
        this.equityTitle = '编辑'
        // 数据清空
        this.composeForm = {
            name: '',
            remark: '',
            issueType: '',
            number: '',
            availCost:''
        }
        this.equityData = []
        let _this = this
        // 调取接口，获取当前选中的权益
        // 获取权益列表
        fetchDetail( scope.row.id ).then(response=>{
            _this.composeForm  = response.data.data
            _this.equityData = response.data.data.elist
        }).catch({})
      },
      checkDetail(row){
          Bus.$emit('poolCompose',{
                'first':'detail',
                'second': row.id
          })
      }
    }
  }
</script>

<style lang="scss" >
.equityCompose {
    .coverName{
        color: #409EFF; 
        cursor: pointer;
        text-decoration: underline;
    }
    .topMargin{
      margin-top:20px;
    }
}

</style>
