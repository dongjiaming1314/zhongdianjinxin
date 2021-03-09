<template>
    <div>
        <el-form
            class="login-form"
            status-icon
            :rules="loginRules"
            ref="loginForm"
            :model="loginForm"
            label-width="0"
        >
            <el-form-item prop="phone" label="手机号">
                <el-input
                    size="small"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.mobile"
                    auto-complete="off"
                    placeholder="请输入手机号码"
                >
                    <i slot="prefix" class="icon-shouji"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="code" label="验证码" class="borderRightNone">
                <el-input
                    size="small"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.code"
                    auto-complete="off"
                    placeholder="请输入验证码"
                >
                    <i slot="prefix" class="icon-yanzhengma"></i>
                    <template slot="append">
                        <span
                            @click="handleSend"
                            class="msg-text"
                            :class="[{ display: msgKey }]"
                            >{{ msgText }}</span
                        >
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <div class="login-menu">
            <a href="#" @click.stop="changeActiveName('user')">账号密码</a>

            <!-- <a href="#"
               @click.stop="activeName='third'">第三方登录</a> -->
        </div>
        <el-button
            size="small"
            type="primary"
            @click.native.prevent="handleLogin"
            class="login-submit"
            >登录</el-button
        >
    </div>
</template>

<script>
const MSGINIT = "发送验证码",
    MSGSCUCCESS = "${time}秒后重发",
    MSGTIME = 60;
import { isvalidatemobile } from "@/util/validate";
import { mapGetters } from "vuex";
import request from "@/router/axios";
export default {
    name: "codelogin",
    data() {
        const validatePhone = (rule, value, callback) => {
            if (isvalidatemobile(value)[0]) {
                callback(new Error(isvalidatemobile(value)[1]));
            } else {
                callback();
            }
        };
        const validateCode = (rule, value, callback) => {
            if (value.length != 4) {
                callback(new Error("请输入4位数的验证码"));
            } else {
                callback();
            }
        };
        return {
            msgText: MSGINIT,
            msgTime: MSGTIME,
            msgKey: false,
            loginForm: {
                mobile: "",
                code: "",
            },
            loginRules: {
                mobile: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePhone,
                    },
                ],
                code: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateCode,
                    },
                ],
            },
        };
    },
    created() {},
    mounted() {},
    computed: {
        ...mapGetters(["tagWel"]),
    },
    props: [],
    methods: {
        changeActiveName(val) {
            this.$emit("changeActiveName", val);
        },
        handleSend() {
            if (this.msgKey) return;

            request({
                url: "/admin/mobile/" + this.loginForm.mobile,
                method: "get",
            }).then((response) => {
                if (response.data.data) {
                    this.$message.success("验证码发送成功");
                    // 预输入验证码

                    this.$set(this.loginForm, "code", response.data.msg);
                    // this.$set(, response.data.msg
                } else {
                    this.$message.error();
                }
            });

            this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
            this.msgKey = true;
            const time = setInterval(() => {
                this.msgTime--;
                this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
                if (this.msgTime == 0) {
                    this.msgTime = MSGTIME;
                    this.msgText = MSGINIT;
                    this.msgKey = false;
                    clearInterval(time);
                }
            }, 1000);
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$store
                        .dispatch("LoginByPhone", this.loginForm)
                        .then(() => {
                            this.$router.push({ path: this.tagWel.value });
                        });
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.msg-text {
    display: block;
    width: 90px;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
}
.msg-text.display {
    color: #ccc;
}
::v-deep .el-form-item__label {
    float: none;
    font-size: 18px;
    line-height: 42px;
    // padding: 12px 0;
}
::v-deep .el-form-item__label:before {
    content: "" !important;
    margin-right: 0 !important;
    color: white !important;
}
.borderRightNone {
    ::v-deep .el-input__inner {
        border-right: none;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }
}
</style>
