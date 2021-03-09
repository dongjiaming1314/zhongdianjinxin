<template>
  <div class="rightsCheck">
    <avue-crud
      ref="crud"
      :page.sync="page"
      :data="tableData"
      :permission="permissionList"
      :table-loading="tableLoading"
      :option="tableOption"
      @on-load="getList"
      @search-change="searchChange"
      @selection-change="selectionChange"
    >
      <template slot="cusName" slot-scope="scope">
        <span class="coverName" @click="handleEdit(scope.row)">{{scope.row.cusName}}</span>
<!--        <span>{{ scope.row.cusName }}</span>-->
      </template>
      <template slot-scope="scope" slot="menuLeft">
        <div>
          <el-button
            type="primary"
            size="small"
            @click="handlePoint(1)"
          >权益调整
          </el-button
          >
          <el-button
            type="primary"
            size="small"
            @click.stop="handlePoint(2)"
          >冻结
          </el-button
          >
          <el-button
            type="primary"
            size="small"
            @click.stop="handlePoint(3)"
          >解冻
          </el-button
          >
        </div>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          size="small"
          @click.stop="handleEdit(scope.row)"
        >查看
        </el-button
        >
      </template>
    </avue-crud>
    <many-element
      v-if="numChange"
      :numChange.sync="numChange"
      :title="title"
      :numForm="numForm"
      :selectedList="selectedList"
      :whichOne="whichOne"
      :numRules="numRules"
      @submitForm="submitForm($event)"
      @resetForm="resetForm($event)"
      @closeFn="closeFn"
    >
    </many-element>
  </div>
</template>

<script>
  import Bus from "@/util/bus.js";
  import {tableOption} from "@/const/crud/client/rights";
  import {fetchList} from "@/api/client/rights";
  import {deepClone} from "@/util/tag";
  import manyElement from "../components/manyElement";

  export default {
    name: "rightsCheck",
    props: ["permissionList"],
    components: {
      manyElement,
    },
    data() {
      return {
        // tableData: [
        //     {
        //         cusName: "王斌",
        //         accountId: "6000001",
        //         custNo: "6000001",
        //         idType: "1",
        //         idNumber: "110101199003075999",
        //         growthLevel: "V1",
        //         phoneNumber: "17621047058",
        //         affiliation: "上海银行浦江支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:57:45.0",
        //         loginIp: "192.168.6.1",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "韩飞",
        //         accountId: "6000002",
        //         custNo: "6000002",
        //         idType: "1",
        //         idNumber: "110101199003075998",
        //         growthLevel: "V8",
        //         phoneNumber: "18141521025",
        //         affiliation: "上海银行松江支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:57:48.0",
        //         loginIp: "192.168.6.2",
        //         loginChannel: "QQ",
        //     },
        //     {
        //         cusName: "蒋志刚",
        //         accountId: "6000003",
        //         custNo: "6000003",
        //         idType: "1",
        //         idNumber: "110101199003073191",
        //         growthLevel: "V7",
        //         phoneNumber: "18145201026",
        //         affiliation: "上海银行浦东分行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:57:51.0",
        //         loginIp: "192.168.6.3",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "刘玉杰",
        //         accountId: "6000004",
        //         custNo: "6000004",
        //         idType: "1",
        //         idNumber: "110101199003077037",
        //         growthLevel: "V3",
        //         phoneNumber: "18145784102",
        //         affiliation: "上海银行洋泾支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:57:54.0",
        //         loginIp: "192.168.6.4",
        //         loginChannel: "QQ",
        //     },
        //     {
        //         cusName: "赵鑫",
        //         accountId: "6000005",
        //         custNo: "6000005",
        //         idType: "1",
        //         idNumber: "110101199003078718",
        //         growthLevel: "V9",
        //         phoneNumber: "18145631023",
        //         affiliation: "上海银行高桥支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:57:58.0",
        //         loginIp: "192.168.6.5",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "郁晶鑫",
        //         accountId: "6000006",
        //         custNo: "6000006",
        //         idType: "1",
        //         idNumber: "110101199003075912",
        //         growthLevel: "V2",
        //         phoneNumber: "18175964120",
        //         affiliation: "上海银行杨高路支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:02.0",
        //         loginIp: "192.168.6.6",
        //         loginChannel: "QQ",
        //     },
        //     {
        //         cusName: "邵正兴",
        //         accountId: "6000007",
        //         custNo: "6000007",
        //         idType: "1",
        //         idNumber: "120101199003078613",
        //         growthLevel: "V1",
        //         phoneNumber: "18245102014",
        //         affiliation: "上海银行博兴路支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:05.0",
        //         loginIp: "192.168.6.7",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "葛小敏",
        //         accountId: "6000008",
        //         custNo: "6000008",
        //         idType: "1",
        //         idNumber: "120101199003072158",
        //         growthLevel: "V8",
        //         phoneNumber: "18245261023",
        //         affiliation: "上海银行浦三路支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:08.0",
        //         loginIp: "192.168.6.8",
        //         loginChannel: "QQ",
        //     },
        //     {
        //         cusName: "陈世康",
        //         accountId: "6000009",
        //         custNo: "6000009",
        //         idType: "1",
        //         idNumber: "120101199003073150",
        //         growthLevel: "V7",
        //         phoneNumber: "18278941025",
        //         affiliation: "上海银行周家渡支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:11.0",
        //         loginIp: "192.168.6.9",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "柳晨",
        //         accountId: "6000010",
        //         custNo: "6000010",
        //         idType: "1",
        //         idNumber: "120101199003075113",
        //         growthLevel: "V3",
        //         phoneNumber: "18245601023",
        //         affiliation: "上海银行德平路支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:15.0",
        //         loginIp: "192.168.6.10",
        //         loginChannel: "QQ",
        //     },
        //     {
        //         cusName: "周明杰",
        //         accountId: "6000011",
        //         custNo: "6000011",
        //         idType: "1",
        //         idNumber: "12010119900307361X",
        //         growthLevel: "V9",
        //         phoneNumber: "18245102036",
        //         affiliation: "上海银行昌里路支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:19.0",
        //         loginIp: "192.168.6.11",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "鲁伟杰",
        //         accountId: "6000012",
        //         custNo: "6000012",
        //         idType: "1",
        //         idNumber: "150102199003071237",
        //         growthLevel: "V2",
        //         phoneNumber: "18645789541",
        //         affiliation: "上海银行北蔡支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:22.0",
        //         loginIp: "192.168.6.12",
        //         loginChannel: "QQ",
        //     },
        //     {
        //         cusName: "刘爽",
        //         accountId: "6000013",
        //         custNo: "6000013",
        //         idType: "1",
        //         idNumber: "150102199003079757",
        //         growthLevel: "V1",
        //         phoneNumber: "18645201026",
        //         affiliation: "上海银行锦绣路支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:24.0",
        //         loginIp: "192.168.6.13",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "钱洪秀",
        //         accountId: "6000014",
        //         custNo: "6000014",
        //         idType: "1",
        //         idNumber: "150102199003072416",
        //         growthLevel: "V8",
        //         phoneNumber: "18645964510",
        //         affiliation: "上海银行川沙支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:28.0",
        //         loginIp: "192.168.6.14",
        //         loginChannel: "QQ",
        //     },
        //     {
        //         cusName: "李志强",
        //         accountId: "6000015",
        //         custNo: "6000015",
        //         idType: "1",
        //         idNumber: "150102199003070330",
        //         growthLevel: "V7",
        //         phoneNumber: "18645107896",
        //         affiliation: "上海银行张江支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:32.0",
        //         loginIp: "192.168.6.15",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "张继伟",
        //         accountId: "6000016",
        //         custNo: "6000016",
        //         idType: "1",
        //         idNumber: "150102199003079490",
        //         growthLevel: "V3",
        //         phoneNumber: "18645109630",
        //         affiliation: "上海银行益江路支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:34.0",
        //         loginIp: "192.168.6.16",
        //         loginChannel: "QQ",
        //     },
        //     {
        //         cusName: "许风",
        //         accountId: "6000017",
        //         custNo: "6000017",
        //         idType: "1",
        //         idNumber: "330102199003079435",
        //         growthLevel: "V9",
        //         phoneNumber: "18345211452",
        //         affiliation: "上海银行南汇支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:38.0",
        //         loginIp: "192.168.6.17",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "袁良才",
        //         accountId: "6000018",
        //         custNo: "6000018",
        //         idType: "1",
        //         idNumber: "330102199003073498",
        //         growthLevel: "V2",
        //         phoneNumber: "18345631026",
        //         affiliation: "上海银行康桥支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:40.0",
        //         loginIp: "192.168.6.18",
        //         loginChannel: "QQ",
        //     },
        //     {
        //         cusName: "刘松",
        //         accountId: "6000019",
        //         custNo: "6000019",
        //         idType: "1",
        //         idNumber: "33010219900307719X",
        //         growthLevel: "V9",
        //         phoneNumber: "18345695214",
        //         affiliation: "上海银行临港支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:43.0",
        //         loginIp: "192.168.6.19",
        //         loginChannel: "微信",
        //     },
        //     {
        //         cusName: "郭刘杰",
        //         accountId: "6000020",
        //         custNo: "6000020",
        //         idType: "1",
        //         idNumber: "330102199003073375",
        //         growthLevel: "V2",
        //         phoneNumber: "18645201027",
        //         affiliation: "上海银行周浦支行",
        //         number: "1",
        //         lastLandingTime: "2020-12-30 14:58:45.0",
        //         loginIp: "192.168.6.20",
        //         loginChannel: "QQ",
        //     },
        // ],
        tableData: [],
        page: {
          total: 20, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
        },
        tableLoading: false,
        tableOption,
        selectedList: [],
        numRules: "",
        whichOne: 1, //1:权益调整； 2 冻结 ； 3 解冻
        numChange: false, //权益
        numForm: {
          calculation: "",
          number: 0,
          reason: "",
        },
        title: "",
      };
    },
    methods: {
      // 获取客户积分列表
      getList(page, listQuery) {
        this.tableLoading = true
        this.tableData = this.tableData.slice(0, 9);
        fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, listQuery)).then(response => {
          this.page.total = response.data.data.total
          this.tableData = response.data.data.records
          this.tableLoading = false
          // if(typeof(done)!='undefined') done()
        }).catch(res => {
          this.tableLoading = false
          this.$message.error(res)
        })
      },
      //搜索
      searchChange(params, done) {
        this.page.currentPage = 1;
        this.getList(this.page, params);
        done();
        // let middle = deepClone( this.filterForm(params) )
        // if( typeof( this.filterForm(params)['createTime'] ) == 'object' ){
        //     middle['createStartTime'] = dateFormat ( this.filterForm(params)['createTime'][0] )
        //     middle['createEndTime'] = dateFormat ( this.filterForm(params)['createTime'][1] )
        // }
        // let {createTime, ...finalData} = middle
        // this.getList( this.page, finalData, done )
      },
      // 选项调整
      selectionChange(list) {
        this.selectedList = list;
      },
      // 1 积分调整；2 冻结；3 解冻
      handlePoint(val) {
        if (this.selectedList.length) {
          this.whichOne = val;
          if (val === 1) {
            this.title = "权益调整";
          }
          if (val === 2) {
            this.title = "积分冻结";
          }
          if (val === 3) {
            this.title = "积分解冻";
          }
          this.numChange = true;
        } else {
          this.$message.warning("请先选择客户");
        }
      },
      // 1 权益调整；2 冻结；3 解冻
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // if (valid) {
          if (this.whichOne === 1) {
            // 权益调整
            //     // 调整方向，数量为必填项
            //     // ？？？库存减小时，做一步处理：调整方向选择“减少”时，库存数量必须小于原库存
            //     if( this.numForm.calculation === '减少' ){
            //     let middleList =  this.selectedList.map(item=>item.number)
            //     let middleNumber = Number(this.numForm.number)
            //     if( middleList.some(item => Number(item) < middleNumber) ){
            //         this.$message({
            //         message: '减少的数量不能大于权益库存的库存数量',
            //         type: 'warning'
            //         })
            //         return false
            //     }
            //     }
            //     let finalData = deepClone(this.numForm)
            //     finalData['ids'] = this.selectedList.map(item=>item.id)
            //     if( this.numForm.calculation === '增加' ) {
            //     finalData.calculation = 0
            //     }else{
            //     finalData.calculation = 1
            //     }
            //     putNumChangeObj(finalData).then(data => {
            //         this.$message({
            //         message: '库存修改成功',
            //         type: 'success'
            //         })
            //         this.$refs.numForm.resetFields()
            //         this.numChange = false
            //         this.getList(this.page)
            //     }).catch(() => {
            //     })
          }
          if (this.whichOne === 2) {
            // 积分冻结
          }
          if (this.whichOne === 3) {
            // 积分解冻
          }
          // } else {
          //     alert('请检查参数是否填完整!')
          //     return false
          // }
        });
      },
      // 取消积分调整
      resetForm(formName) {
        this.closeFn();
        // this.whichOne = 0
        // this.$refs[formName].resetFields()
      },
      closeFn() {
        this.numChange = false;
      },
      // 客户积分详情
      handleEdit(row) {
        Bus.$emit("clientRights", {
          first: "detail",
          second: row.id,
          third: row
        });
        // this.$router.push({
        //     path:'/client/rightsDetail',
        //     query: { id: scope.row.id }
        // })
      },
    },
  };
</script>

<style lang="scss" scoped>
  .rightsCheck {
    .coverName {
      color: #409eff;
      cursor: pointer;
      text-decoration: underline;
    }
  }
</style>
