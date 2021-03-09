import { getCustInfo } from "@/api/client/view";
export default {
    namespaced: true,
    state: {
        custInfo: {},
        loading: false

    },
    mutations: {
        //获取活动区域
        GET_CUSTINFO(state, data) {
            state.custInfo = data
        },
        changeLoad(state, data) {
            state.loading = data
        },

    },
    actions: {
        async getList({ commit }, params) {
            commit('changeLoad', true)
            const res = await getCustInfo(params)
            commit('GET_CUSTINFO', res.data.data)
            commit('changeLoad', false)
            return res
        },
    }
}