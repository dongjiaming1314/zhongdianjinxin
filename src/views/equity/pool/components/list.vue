<template>
    <div>
        <template>
            <div style="text-align: center; margin-bottom: 15px">
                <el-radio-group v-model="selectRadio" @change="selectTab">
                    <el-radio-button label="first"
                        >权益库存查询</el-radio-button
                    >
                    <el-radio-button label="second">申请列表</el-radio-button>
                    <el-radio-button label="third">审核列表</el-radio-button>
                </el-radio-group>
            </div>
        </template>
        <template>
            <to-query
                :permissionList="permissionList"
                v-if="selectRadio === 'first' && permissionList.queryBtn"
            />
        </template>
        <template>
            <to-apply
                :permissionList="permissionList"
                v-if="selectRadio === 'second' && permissionList.applyBtn"
            />
        </template>
        <template>
            <to-audit
                :permissionList="permissionList"
                v-if="selectRadio === 'third' && permissionList.auditBtn"
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
    name: "poolList",
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
                applyBtn: this.vaildData(
                    this.permissions.equity_pool_apply_list
                ),
                auditBtn: this.vaildData(
                    this.permissions.equity_pool_audit_list
                ),
                queryBtn: this.vaildData(
                    this.permissions.equity_pool_query_list
                ),
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
