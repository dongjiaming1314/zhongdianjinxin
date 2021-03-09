<template>
    <div class="login-container" @keyup.enter.native="handleLogin">
        <div class="login-weaper animated bounceInDown">
            <div class="login-left">
                <div class="login-time">
                    <!-- {{time}} -->
                    <img src="/img/bg/logo.png" alt="" />
                </div>
                <!-- <img class="img"
             src="/img/logo.png"
             alt="">
        <p class="title">{{website.infoTitle}}</p>
        <p>v 3.0.0</p> -->
            </div>
            <div class="login-border">
                <div class="login-main">
                    <h4 class="welcomeTitle">欢迎登录</h4>
                    <!-- <h4 class="login-title">
            <el-select
              class="login-select animated fadeIn"
              v-model="active"
              @change="handleCommand"
              placeholder="点击请选择租户"
              size="mini">
              <el-option  :key="tenant.id" :label="tenant.name" :value="tenant.id" v-for="tenant in tenantList"/>
            </el-select>
          </h4> -->

                    <userLogin
                        v-if="activeName === 'user'"
                        v-on:changeActiveName="changeActiveName($event)"
                    ></userLogin>
                    <codeLogin
                        v-else-if="activeName === 'code'"
                        v-on:changeActiveName="changeActiveName($event)"
                    ></codeLogin>
                    <!-- <thirdLogin v-else-if="activeName==='third'"></thirdLogin> -->
                </div>
            </div>
        </div>
        <top-color v-show="false"></top-color>
    </div>
</template>
<script>
import request from "@/router/axios";
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import thirdLogin from "./thirdlogin";
import { mapGetters } from "vuex";
import { getStore, setStore } from "@/util/store";
import { dateFormat } from "@/util/date";
import { validatenull } from "@/util/validate";
import topColor from "@/page/index/top/top-color";

export default {
    name: "login",
    components: {
        userLogin,
        codeLogin,
        thirdLogin,
        topColor,
    },
    data() {
        return {
            tenantList: [],
            time: "",
            active: "",
            activeName: "user",
            socialForm: {},
        };
    },
    watch: {
        $route: {
            handler() {
                const params = this.$route.query;
                if (validatenull(params.state) && validatenull(params.code))
                    return;

                this.socialForm.state = params.state;
                this.socialForm.code = params.code;

                const loading = this.$loading({
                    lock: true,
                    text: `登录中,请稍后。。。`,
                    spinner: "el-icon-loading",
                });
                this.$store
                    .dispatch("LoginBySocial", this.socialForm)
                    .then(() => {
                        loading.close();
                        this.$router.push({ path: this.tagWel.value });
                    })
                    .catch(() => {
                        loading.close();
                    });
            },
            immediate: true,
        },
    },
    created() {
        //   this.getTenantList()
        //   this.active = getStore({name: "tenantId"});
        //   this.getTime();
        //   setInterval(() => {
        //     this.getTime();
        //   }, 1000);
    },
    mounted() {},
    computed: {
        ...mapGetters(["website", "tagWel"]),
    },
    props: [],
    methods: {
        changeActiveName(val) {
            this.activeName = val;
        },
        handleCommand(command) {
            setStore({ name: "tenantId", content: command });
        },
        getTime() {
            this.time = dateFormat(new Date());
        },
        getTenantList() {
            request({
                url: "/admin/tenant/list",
                method: "get",
            }).then((response) => {
                this.tenantList = response.data.data;
            });
        },
    },
};
</script>

<style lang="scss">
.login-container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    // background: url("/img/bg/cloud.jpg") 0 bottom repeat-x #049ec4;
    // animation: animate-cloud 20s linear infinite;
}

.login-weaper {
    margin: 0 auto;
    // width: 1000px;
    width: 100%;
    height: 100%;
    box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
    background-color: #fff;

}

.login-left,
.login-border {
    position: relative;
    // top: -60px;
    min-height: 500px;
    align-items: center;
    display: flex;
    .welcomeTitle {
        // position: absolute;
        // left: 40px;
        // top: 129px;
        font-size: 60px;
        line-height: 84px;
        color: black;
        margin-bottom: 15px;
    }
}

.login-left {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    justify-content: center;
    flex-direction: column;
    // background-color: #409EFF;
    // background: url("/img/bg/picture.png") 0 0 repeat-x #049ec4;
    background-image: url("/img/bg/picture.png");
    // background-size:100%;
    background-repeat: round;
    color: #fff;
    float: left;
    width: 50%;
    height: 100%;
    position: relative;
}

.login-left .img {
    width: 140px;
    border-radius: 50%;
}

.login-time {
    position: absolute;
    // left: 25px;
    // top: 25px;
    left: 72px;
    top: 46px;
    width: 30%;
    color: #fff;
    font-weight: 200;
    // opacity: 0.9;
    font-size: 18px;
    overflow: hidden;
    img {
        width: 100%;
        height: auto;
    }
}

.login-left .title {
    margin-top: 60px;
    text-align: center;
    color: #fff;
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 25px;
}

.login-border {
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #fff;
    width: 50%;
    height: 100%;
    float: left;
    box-sizing: border-box;
    overflow: auto;
}

.login-main {
    margin: 0 auto;
    width: 65%;
    box-sizing: border-box;
    height: 100%;
}

.login-main > h3 {
    margin-bottom: 20px;
}

.login-main > p {
    color: #76838f;
}

.login-title {
    color: #333;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 22px;
    text-align: center;
    letter-spacing: 4px;
}

.login-select {
    input {
        color: #333;
        font-size: 18px;
        font-weight: 400;
        border: none;
        text-align: center;
    }
}

.login-menu {
    // margin-top: 40px;
    width: 100%;
    text-align: left;

    a {
        color: #496dff;
        font-size: 18px;
        line-height: 25px;
        margin: 0px 8px;
    }
}

.login-submit {
    width: 50%;
    // height: 45px;
    overflow: hidden;
    border: 1px solid #409eff;
    background: none;
    font-size: 22px;
    line-height: 30px;
    letter-spacing: 2px;
    // font-weight: 300;
    color: white;
    background-color: #496dff;
    cursor: pointer;
    margin-top: 30px;
    // font-family: "neo";
    transition: 0.25s;
    padding: 18px 0;
    border-radius: 4px;
}

.login-form {
    margin: 10px 0;

    i {
        color: #333;
    }

    .el-form-item__content {
        width: 100%;
    }

    .el-form-item {
        margin-bottom: 0;
    }
    .el-form-item__content {
        line-height: 60px;
        // line-height: ;
    }
    .el-input {
        margin-bottom: 5px;
        // background-color:#F9FBFE ;
        // box-sizing: border-box
        input {
            // padding-bottom: 10px;

            text-indent: 5px;
            background-color: #f9fbfe;
            // border: none;
            border-radius: 0;
            color: #333;
            // border-bottom: 1px solid rgb(235, 237, 242);
            height: 60px;
            padding-left: 62px;
            font-size: 20px;
            line-height: 28px;
            border-radius: 4px;
        }

        .el-input__prefix {
            left: 15px;
            line-height: 60px;
            i {
                padding: 0 5px;
                font-size: 18px !important;
            }
        }
    }
}

.login-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    // margin: 0 0 0 10px;
    top: -60px;
}

.login-code-img {
    // margin-top: 2px;
    width: 100%;
    height: 58px;
    background-color: #fdfdfd;
    border: 1px solid #f0f0f0;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 5px;
    line-height: 38px;
    // text-indent: 5px;
    text-align: center;
}
</style>
