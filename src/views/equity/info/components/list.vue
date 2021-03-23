<template>
    <div>
        <template>
            <div style="text-align: center; margin-bottom: 15px">
                {{selectRadio}}
                <el-radio-group v-model="selectRadio" @change="selectTab">
                    <el-radio-button label="first"
                        >权益信息查询</el-radio-button
                    >
                    <el-radio-button
                        label="second"
                        v-if="permissionList.applyBtn"
                        >申请列表</el-radio-button
                    >
                    <el-radio-button
                        label="third"
                        v-if="permissionList.verifyBtn"
                        >审核列表</el-radio-button
                    >
                </el-radio-group>
            </div>
        </template>
        <template>
            <to-query
                :permissionList="permissionList"
                v-if="selectRadio === 'first'"
            />
        </template>
        <template>
            <to-apply
                :permissionList="permissionList"
                v-if="selectRadio === 'second'"
            />
        </template>
        <template>
            <to-audit
                :permissionList="permissionList"
                v-if="selectRadio === 'third'"
            />
        </template>
    </div>
</template>
<script>
import toQuery from "./query";
import toApply from "./apply";
import toAudit from "./audit";
import { mapGetters } from "vuex";
export default {
    name: "infoList",
    components: {
        toQuery,
        toApply,
        toAudit,
    },
    props: ["selectRadio"],
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["permissions"]),
        permissionList() {
            return {
                verifyBtn: this.vaildData(this.permissions.client_info_verify),
                applyBtn: this.vaildData(this.permissions.client_info_apply),
                levelBtn: this.vaildData(this.permissions.client_level_set),
                checkBtn: this.vaildData(this.permissions.client_level_set),
            };
        },
    },
    methods: {
        selectTab(val) {
            this.$emit("selectTab", val);
        },
    },
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
    text-align: center;
}
.is-align-center {
    text-align: center;
}
::v-deep .el-input__inner {
    padding-right: 0;
}
::v-deep .el-table__row {
    .el-button {
        i {
            display: none;
        }
    }
}
::v-deep .avue-group {
    .el-collapse-item {
        .el-collapse-item__arrow {
            color: transparent;
        }
    }
}
</style>
