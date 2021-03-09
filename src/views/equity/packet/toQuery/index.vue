<template>
    <div class="packetQuery">
        <avue-crud ref="crud"
                :page="page"
                :data="tableData"
                :permission="permissionList"
                :table-loading="tableLoading"
                :option="tableOption"
                @on-load="getList"
                @search-change="searchChange"
                @row-update="handleUpdate"
                @row-save="handleSave">
                <template slot="redPackName" slot-scope="scope">
                    <span class="coverName" @click="checkDetail(scope.row,scope.index)">
                        {{scope.row.redPackName}}
                    </span>
                </template>
                <template slot="redlogbundlType" slot-scope="scope" >
                    {{scope.row.redlogbundlType === '1'? '固定金额':'随机金额'}}
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
                        @click="delFn(scope.row, scope.index)"
                        >删除</el-button>
                </template>
        </avue-crud>
        <template>
            <el-dialog :title="title" :visible.sync="dialogFormVisible">
                <el-form ref="form" :rules="rules" :model="form">
                <el-row>
                    <el-col :span="11">
                    <el-form-item label="红包池名称" prop="redPackName" :label-width="formLabelWidth">
                        <el-input v-model="form.redPackName" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="11">
                    <el-form-item label="红包池类型" prop="redlogbundlType"  :label-width="formLabelWidth">
                        <el-select v-model="form.redlogbundlType" placeholder="请选择" @change="typeChangeFn">
                            <el-option label="固定金额" value="1"></el-option>
                            <el-option label="随机金额" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                    <el-form-item label="生效开始时间" prop="startTime"  :label-width="formLabelWidth">
                        <el-date-picker
                        v-model="form.startTime"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="11">
                    <el-form-item label="生效结束时间" prop="endTime"  :label-width="formLabelWidth">
                        <el-date-picker
                        v-model="form.endTime"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                    <el-form-item label="红包有效期" prop="redPackValdity"  :label-width="formLabelWidth">
                        <el-input  v-model.number="form.redPackValdity" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="4" >
                    <el-form-item label="" prop="valdityType"  label-width="10px">
                        <el-select v-model="form.valdityType" placeholder="请选择">
                        <el-option label="天" value="1"></el-option>
                        <el-option label="月" value="2"></el-option>
                        <el-option label="年" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="11">
                    <el-form-item label="红包个数" prop="number"  :label-width="formLabelWidth">
                        <el-input v-model.number="form.number" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                    <el-form-item v-show="form.redlogbundlType==='2'" label="红包池总金额" prop="totalAmount"  :label-width="formLabelWidth">
                        <el-input :disabled="form.redlogbundlType==='1'" v-model="form.totalAmount" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="11">
                    <el-form-item v-show="form.redlogbundlType==='1'" label="红包金额/个" prop="redPackAmountEach"  :label-width="formLabelWidth">
                        <el-input :disabled="form.redlogbundlType==='2'" v-model="form.redPackAmountEach" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                    <el-form-item  v-show="form.redlogbundlType==='2'" label="红包金额上限/个" prop="redPackAmountEachMax"  :label-width="formLabelWidth">
                        <el-input :disabled="form.redlogbundlType==='1'" v-model="form.redPackAmountEachMax" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="11">
                    <el-form-item  v-show="form.redlogbundlType==='2'" label="红包金额下限/个" prop="redPackAmountEachMin"  :label-width="formLabelWidth">
                        <el-input  :disabled="form.redlogbundlType==='1'" v-model="form.redPackAmountEachMin" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="红包可使用渠道" prop="redChannel"  :label-width="formLabelWidth">
                            <el-input v-model="form.redChannel" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="11">
                    <el-form-item label="备注" prop="comment"  :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="form.comment" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureToAdd">确 定</el-button>
                </div>
            </el-dialog>
        </template>
        <packet-detail
            v-if="showDetail"
            :showDetail.sync="showDetail"
            :detailData='form'
            @closeFn="closeFn"
            ></packet-detail>
    </div>
</template>
<script>
import {
    fetchList,
    getObj,
    addObj,
    putObj,
    delObj,
} from '@/api/equity/packet'
import {
    deepClone
}from '@/util/tag'
import {
    dateFormat
} from '@/util/date'
import {
    tableOption
} from '@/const/crud/equity/packet'
import packetDetail from '../components/detail'
export default {
    name:'packetQuery',
    props:[
        'permissionList'
    ],
    components:{
        packetDetail
    },
    data(){
        return{
            tableData: [{
                redPackName:'第一份红包'
            }],
            page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 20 // 每页显示多少条
            },
            tableLoading: false,
            tableOption: tableOption,
            // 新增，编辑
            dialogFormVisible: false,
            // 详情
            showDetail: false,
            // 新增，编辑、
            form: {},
            formLabelWidth: '120px',
            title: '红包池新增',  //红包池新增，编辑
            rules:{
                redPackName: [
                    { required: true, message: '请输入目录名称', trigger: 'blur' },
                    {  max: 50, message: '长度在50个字符以内', trigger: 'blur' }
                ], 
                redlogbundlType: [
                    { required: true, message: '请选择红包池类型', trigger: 'change' }
                ],
                startTime: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                endTime: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                redPackValdity:[
                    { required: true, message: '请选择红包有效期'},
                    { type: 'number', message: '有效期必须为数字值'}
                ],
                valdityType:[
                    { required: true, message: '请选择日期类型', trigger: 'change' }
                ],
                number:[
                    { required: true, message: '请输入红包个数'},
                    { type: 'number', message: '红包个数必须为数字值'}
                ],
            },
        }
    },
    methods:{
        // 获取红包池信息列表
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
                this.tableLoading = false
                if(typeof(done)!='undefined') done()
            })
        },
        searchChange(params, done) {
            let middle = deepClone( this.filterForm(params) )
            if( typeof( this.filterForm(params)['startTime'] ) == 'object' ){
                middle['startTime'] = dateFormat ( this.filterForm(params)['startTime'][0] )
                middle['endTime'] = dateFormat ( this.filterForm(params)['startTime'][1] )
            }
            this.getList( this.page, middle, done )
        },
        // 红包池编辑
        handleEdit( scope ) {
          this.dialogFormVisible = true
          this.title = '红包池编辑'
          this.clearForm( this.form )
          // 调取接口
          getObj(scope.row.id).then(response=>{
             this.form = deepClone(response.data.data)
          })
        },
        // 清空表单数据
        clearForm(obj) {
            for(var a in obj){
              obj[a] = ''
            }
        },
        // 权益组合新增
        handleAdd(){
            this.dialogFormVisible = true
            this.title = '红包池新增'
            // 清空数据
            this.clearForm(this.form)
        },
        delFn: function (row, index) {
            var _this = this
            this.$confirm('是否确认删除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
              return delObj(row.id)
            }).then(data => {
                _this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.getList(this.page)
            })
        },
        //红包池新增确定
        sureToAdd(){
            let middle = deepClone( this.form )
            if( typeof(this.form.startTime) === 'object')  middle['startTime'] = dateFormat(this.form.startTime)
            
            if( typeof(this.form.endTime) === 'object') middle['endTime'] = dateFormat(this.form.endTime)
            // 随机，总金额限定
            if( this.form.redlogbundlType === '2' && typeof(this.form.totalAmount) === 'undefined' ){
              this.$message({
                  message: '请输入总金额！',
                  type: 'warning'
              })
              return false
            }
            if( this.form.redlogbundlType === '2' && typeof(this.form.redPackAmountEachMax) === 'undefined' ){
              this.$message({
                  message: '请输入红包金额上限！',
                  type: 'warning'
              })
              return false
            }
            if( this.form.redlogbundlType === '2' && typeof(this.form.redPackAmountEachMin) === 'undefined' ){
              this.$message({
                  message: '请输入红包金额下限！',
                  type: 'warning'
              })
              return false
            }
            if( this.title === '红包池新增' ) {
              addObj(middle).then(data => {
                this.dialogFormVisible = false
                this.clearForm(this.form)
                this.$message({
                    message: '添加成功',
                    type: 'success'
                })
                this.getList(this.page)
              }).catch(() => {
                
              })
            }else if( this.title === '红包池编辑' ) {
              putObj(middle).then(data=>{
                this.dialogFormVisible = false
                this.clearForm( this.form )
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
                this.getList( this.page )
              }).catch(()=>{

              })
            }
        },
        // 红包池类型修改
        typeChangeFn() {

        },
        // 红包详情展示
        checkDetail(row, index ) {
            this.showDetail = true
            // this.clearForm( this.form )
            // 调取接口
            getObj(row.id).then(response=>{
                this.form = deepClone(response.data.data)
            })
            return false
            this.dialogFormVisible = true
            this.title = '红包池详情'
        },
        closeFn(){
            this.showDetail = false
        },
    }
}
</script>

<style lang="scss" scoped>
.packetQuery{
    .coverName{
        color: #409EFF; 
        cursor: pointer;
        text-decoration: underline;
    }
}

</style>