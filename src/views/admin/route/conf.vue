<template>
  <div class="execution">
    <!-- 提示信息 -->
    <el-alert
      title="功能开关是全局的，可以根据需要暂时地开启或者关闭所有的 API 相关功能"
      type="info">
    </el-alert>
    <!-- 签名效验 -->
    <section class="madp-section-container">
      <el-row>签名效验</el-row>
      <el-row>
        <el-col :span="20" class="madp-description-container">对客户端到移动网关的请求进行验签，以验证调用者身份，保证安全</el-col>
        <el-col :span="4" class="madp-switch-container">
          <el-switch
            v-model="config.signFlag"
            @change="handleUpdate"
          >
          </el-switch>
        </el-col>
      </el-row>
      <el-row v-show="config.signFlag">
        <span>签名算法：</span>
        <el-radio-group
          v-model="config.signType"
          @change="handleSignRadioChange"
        >
          <el-radio
            v-for="item in radios"
            :key="item.value"
            :value="item.value"
            :label="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-row>
      <el-divider></el-divider>
    </section>
    <!-- 数据加密 -->
    <section class="madp-section-container">
      <el-row>数据加密</el-row>
      <el-row>
        <el-col :span="20" class="madp-description-container">从客户端到移动网关的请求进行加密，确保数据在传输过程中的安全性</el-col>
        <el-col :span="4" class="madp-switch-container">
          <el-switch
            v-model="config.cryptoFlag"
            @change="handleUpdate">
          </el-switch>
        </el-col>
      </el-row>
      <el-row v-show="config.cryptoFlag">
        <span>加密算法：</span>
        <el-radio-group
          v-model="config.cryptoType"
          @change="handleCryptoRadioChange"
        >
          <el-radio
            v-for="item in radios"
            :key="item.value"
            :value="item.value"
            :label="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-row>
      <el-divider></el-divider>
    </section>
    <!-- CORS -->
    <section class="madp-section-container">
      <el-row>CORS</el-row>
      <el-row>
        <el-col :span="20" class="madp-description-container">跨域资源共享，打开配置可进行跨域调用</el-col>
        <el-col :span="4" class="madp-switch-container">
          <el-switch
            v-model="config.corsFlag"
            @change="handleUpdate"
          >
          </el-switch>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </section>
    <!-- 日志配置 -->
    <section class="madp-section-container">
      <el-row>日志配置</el-row>
      <el-row>
        <el-col :span="20" class="madp-description-container">网关日志，打开配置展示详细日志</el-col>
        <el-col :span="4" class="madp-switch-container">
          <el-switch
            v-model="config.logFlag"
            @change="handleUpdate"
          >
          </el-switch>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  import {
      remote
  } from '@/api/admin/dict'
  import {
      getVo,
      putObj
  } from '@/api/admin/gateway'
    export default {
        name: "route",
        data() {
            return {
                appId: '123456890ABCDEF',
                workspaceId: 'default',
                // 单选按钮保存数据
                radios:[],
                config:{
                    cryptoFlag: false,
                    cryptoType: '1',
                    signFlag: false,
                    signType: '1',
                    corsFlag: false,
                    logFlag: false
                },
                // 改变数据之前的值
                oldSignType: undefined,
                oldCryptoType: undefined
            }
        },
        created() {
            // 获取类型数据
            this.getRadios()
            // 获取配置数据
            this.getConfData()
        },
        methods: {
            /**
             * @title 获取加密算法|签名算法类型数据
             *
             **/
            getRadios(){
                remote('crypto_type').then(response => {
                    this.radios = response.data.data
                })
            },
            /**
             * @title 获取网关配置输数据
             *
             **/
            getConfData(){
                let params = {
                    appId: this.appId,
                    workspaceId: this.workspaceId
                }
                getVo(params).then(response => {
                    this.config = response.data.data
                })
            },
            /**
             * @title 更新网关配置数据
             *
             **/
            handleUpdate(){
                putObj(this.config).then(response => {
                    if(response.data.data){
                        this.$notify({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                    }else {
                        this.$notify({
                            title: '失败',
                            message: '更新失败',
                            type: 'error',
                            duration: 2000
                        })
                    }
                })
            },
            handleSignRadioChange(val){
                let item = this.radios.filter(item => item.value == val)
                this.$confirm('确认使用的签名算法为"' + item[0].label + '"' + '?', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleUpdate()
                }).catch(() => {
                    this.config.signType = this.oldSignType
                })
            },
            handleCryptoRadioChange(val){
                let item = this.radios.filter(item => item.value == val)
                this.$confirm('确认使用的加密算法为"' + item[0].label + '"' + '?', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleUpdate()
                }).catch(() => {
                    this.config.cryptoType = this.oldCryptoType
                })
            }
        },
        watch: {
            'config.signType': function (newval, oldVal) {
               this.oldSignType = oldVal
            },
            'config.cryptoType': function (newval, oldVal) {
                this.oldCryptoType = oldVal
            },
        }
    }
</script>

<style lang="scss" scoped>
  div.el-alert{
    padding: 8px 0;
  }
  .madp-section-container{
    padding: 15px 0;
    .madp-description-container{
      font-size: 12px;
      color: #6b6b6b;
    }
    .madp-switch-container{
      text-align: right;
    }
  }

</style>
