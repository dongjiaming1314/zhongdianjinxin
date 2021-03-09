<template>
  <basic-container>
    <el-form ref="addForm" :model="addForm" :inline="true" :rules="rules" label-width="150px">
      <el-form-item label="商品名称:" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品类型:" prop="type">
        <el-select v-model="addForm.type" placeholder="请选择商品类型" @change="getType">
          <el-option key="0" label="实物" value="0"></el-option>
          <el-option key="1" label="虚拟" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品分类:" prop="goodsCategoryName" v-if="addForm.type === '0'">
        <el-select v-model="addForm.goodsCategoryName" placeholder="请选择商品分类" @change="getSkuList">
          <el-option v-for="item in goodsCategoryNameList" :key="item.id" :label="item.categoryName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品牌:" prop="bannerName" v-if="addForm.type === '0'">
        <el-select v-model="addForm.bannerName" placeholder="请选择品牌">
          <el-option v-for="item in bannerNameList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="库存:" prop="stock" v-if="addForm.type === '1'">
        <el-input v-model="addForm.stock" placeholder="请输入库存"></el-input>
      </el-form-item>
      <el-form-item label="商品单价(金额):" prop="price" v-if="addForm.type === '1'">
        <el-input v-model="addForm.price" placeholder="请输入商品单价"></el-input>
      </el-form-item>

      <el-form-item label="库存预警值:" prop="lowStock">
        <el-input v-model="addForm.lowStock" placeholder="请输入库存预警值"></el-input>
      </el-form-item>
      <el-form-item label="商品说明:" prop="remark">
        <el-input type="textarea" v-model="addForm.remark" placeholder="请输入商品说明"></el-input>
      </el-form-item>
      <el-form-item label="商品图片:" prop="pic">
<!--        <el-upload-->
<!--          class="upload-demo"-->
<!--          action=""-->
<!--          :on-preview="handlePreview"-->
<!--          :on-remove="handleRemove"-->
<!--          :before-remove="beforeRemove"-->
<!--          multiple-->
<!--          :on-exceed="handleExceed"-->
<!--          :file-list="fileList">-->
<!--          <el-button size="small" type="primary">点击上传</el-button>-->
<!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--        </el-upload>-->
      </el-form-item>


      <el-form-item label="商品规格:" prop="specifications" v-if="addForm.goodsCategoryName" style="width: 100%">
        <div>
          <el-button :loading="loading" size="small" type="primary" @click="refreshSKU">刷新SKU列表</el-button>
        </div>
        <div v-for="(item, index) in specificationsList" :key="index">
          {{ item.attributeName }}
          <el-checkbox-group v-model="specificationsList[index].sku">
            <el-checkbox :label="item1.attributeValue" v-for="(item1, index1) in item.values" :key="index1">{{ item1.attributeValue }}</el-checkbox>
          </el-checkbox-group>
          <div>
            <el-input v-model="specificationsList[index].content" placeholder="请输入" style="width: 50%"></el-input>
            <el-button size="small" type="primary" @click="addInput(index)" style="margin-left: 10px">新增</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="商品SKU信息:" style="width: 100%" v-if="tableSKU.length">
        <el-table :data="tableData" style="width: 90%">
          <el-table-column :label="item.label" :prop="item.prop" :key="item.key" v-for="(item, index) in tableSKU">
            <template slot-scope="scope">
              {{getProductSkuSp(scope.row,index)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <span @click="delInfo(scope.row, scope.$index)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

    </el-form>
    <div style="float: right;line-height: 60px">
      <el-button :loading="loading" size="small" type="primary" @click="handleOn">提 交</el-button>
      <el-button size="small" @click="handleClose">取 消</el-button>
    </div>
  </basic-container>
</template>

<script>
  import { getGoodsCategoryName, getSku } from '@/api/supplier/commodity'

  export default {
    name: "AddCommodity",
    data() {
      return {
        sku: [],
        content: '',
        addForm: {
          name: '',
          type: '',
          goodsCategoryName: '',
          bannerName: '',
          stock: '',
          price: '',
          lowStock: '',
          remark: '',
        },
        rules: {
          name: [{
            required: true,
            max: 32,
            message: "请输入商品名称"
          }]
        },
        goodsCategoryNameList: [],
        bannerNameList: [],
        specificationsList: [],
        tableSKU: [],
        tableData: [],
        aaa: []
        // tableOption: {
        //   stripe: true,
        //   addBtn: false,
        //   editBtn: false,
        //   delBtn: false,
        //   columnBtn: false,
        //   refreshBtn: false,
        //   formWidth: '100%',
        //   searchBtnText: '查询',
        //   searchBtnIcon: 'none',
        //   emptyBtnText: '重置',
        //   emptyBtnIcon: 'none',
        //   searchLabelWidth: 120,
        //   searchIcon: false,
        //   column: []
        // }
      }
    },
    mounted() {},
    methods: {
      getType(val) {
        if(val === '0') {
          this.getGoodsCategoryNameList()
        }
      },
      // 获取商品分类
      getGoodsCategoryNameList() {
        getGoodsCategoryName({page: '1', size: '9999'}).then(res => {
          this.goodsCategoryNameList = res.data.data.records
        }).catch(res => {
          this.$message.error(res)
        })
      },
      // 获取sku属性
      getSkuList(val) {
        getSku(val).then(res => {
          this.specificationsList = [];
          if (res.data.data.keys.length) {
            for (let i=0;i<res.data.data.keys.length;i++) {
              let sku = [];
              let content = '';
              this.specificationsList.push({
                attributeName: res.data.data.keys[i].attributeName,
                id: res.data.data.keys[i].id,
                values: res.data.data.keys[i].values,
                sku: sku,
                content: content
              })
            }
          }
        }).catch(res => {
          this.$message.error(res)
        })
      },
      // 新增对应属性值
      addInput(index) {
        if (this.specificationsList[index].content) {
          this.specificationsList[index].values.push({
            attributeValue: this.specificationsList[index].content,
            id: this.specificationsList[index].content
          })
          this.specificationsList[index].content = ''
        }

      },
      // 刷新SKU列表
      refreshSKU() {
        this.tableSKU = [];
        this.tableData = [];
        let skuList = [];
        this.specificationsList.forEach(item => {
          if (item.sku.length) {
            this.tableSKU.push({
              label: item.attributeName,
              key: item.attributeName,
              prop: item.attributeName,
            })
            skuList.push({
              sku: item.sku
            })
          }
        })
        if (skuList.length === 1) {
          let arr0 = skuList[0];
          arr0.sku.forEach(item => {
            this.tableData.push({
              value: item
            })
          })
        } else if(skuList.length  === 2) {
          let arr0 = skuList[0];
          let arr1 = skuList[1];
          arr0.sku.forEach(item => {
            arr1.sku.forEach(item1 => {
              this.tableData.push({
                value0: item,
                value1: item1
              })
            })
          })
        } else {
          let arr0 = skuList[0];
          let arr1 = skuList[1];
          let arr2 = skuList[2];
          arr0.sku.forEach(item => {
            arr1.sku.forEach(item1 => {
              arr2.sku.forEach(item2 => {
                this.tableData.push({
                  value0: item,
                  value1: item1,
                  value2: item2
                })
              })
            })
          })

        }
      },
      getProductSkuSp(row, index) {
        let rowList = []
        for (let key in row) {
          rowList.push(row[key])
        }
        return rowList[index]
      },
      // 删除SKU信息
      delInfo(row, index) {
        this.tableData.splice(index, 1)
      },
      // 提交
      handleOn() {
        let attrList = Object.getOwnPropertyNames(this.tableData[0])
        let valueList0 = []
        let valueList1 = []
        let valueList2 = []
        let skus = []
        attrList.splice(Object.getOwnPropertyNames(this.tableData[0]).length-1, 1)
        for (let i = 0; i < attrList.length; i++) {
          for (let j = 0; j < this.tableData.length; j++) {
            if (i === 0) {
              valueList0.push(this.getProductSkuSp(this.tableData[j], i))
            } else if (i === 1) {
              valueList1.push(this.getProductSkuSp(this.tableData[j], i))
            } else {
              valueList2.push(this.getProductSkuSp(this.tableData[j], i))
            }
          }
        }
        for (let i = 0; i < attrList.length; i++) {
          skus.push({
            goodsId: attrList[i],
            col1: valueList0[i] ? valueList0[i] : '',
            col2: valueList1[i] ? valueList1[i] : '',
            col3: valueList2[i] ? valueList2[i] : ''
          })
        }
        console.log(skus);
        this.$emit('editShow', true)
      },
      // 取消
      handleClose() {
        this.$emit('editShow', true)
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .el-form-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
    width: 48%;
    min-width: 430px;
  }

  /deep/ .el-form-item__content {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 150px);
  }

  .el-input {
    width: 100%;
  }

  .el-select {
    width: 100%;
  }
</style>
