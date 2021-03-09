/**
 * @desc  [自定义校验规则]
 * @example
 *  import { validateRule } from "@/utils/validateRules";
 *  rules: [
 *     { validator: validateRule.emailValue, trigger: 'blur'}
 *  ]
 */
import {
    validatenull,
    validateEmail,
    isvalidatemobile
} from "@/util/validate";

export const rule = {
    /**
     * 校验 请输入中文、英文、数字包括下划线
     * 名称校验
     */
    validatorNameCn(rule, value, callback) {
        let acount = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
        if (value && (!(acount).test(value))) {
            callback(new Error('请输入中文、英文、数字包括下划线'))
        } else {
            callback()
        }
    },
    /**
     * 校验 请输入中文、英文、数字包括下划线
     * 名称校验
     */
    validatorKey(rule, value, callback) {
        let acount = /^[A-Z_]+$/
        if (value && (!(acount).test(value))) {
            callback(new Error('请输入大写英文、下划线'))
        } else {
            callback()
        }
    },

    /**
     * 校验首尾空白字符的正则表达式
     *
     */
    checkSpace(rule, value, callback) {
        let longrg = /[^\s]+$/;
        if (!longrg.test(value)) {
            callback(new Error('请输入非空格信息'));
        } else {
            callback();
        }
    },
    //网站必填
    validateWebsiteRequired(rule, value, callback) {
        let website = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        if (value) {
            if ((!(website.test(value)))) {
                callback(new Error('请输入正确的网址'))
            } else if (value.length > 100) {
                callback(new Error('请输入正确的网址'))
            } else {
                callback()
            }
        }
        callback()
    },
    //验证非负数
    validateNegaNum(rule, value, callback) {
        const res = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
        if (!value) {
            callback()
        }
        if (!res.test(value)) {
            callback(new Error("请输入有效数值"));
        } else {
            callback();
        }
    },
    //验证非负整数必填
    validateNegaIntNumReq(rule, value, callback) {
        const res = /^\d+$/;
        if (!value) {
            callback(new Error("请输入有效数值"));
        }
        if (!res.test(value)) {
            callback(new Error("请输入正整数"));
        } else {
            callback();
        }
    },
    //验证非负整数不必填
    validateNegaIntNum(rule, value, callback) {
        const res = /^\d+$/;
        if (!value) {
            callback();
        }
        if (!res.test(value)) {
            callback(new Error("请输入有效数值"));
        } else {
            callback();
        }
    }
}

// 验证手机号码必填
export const validatePhoneNum = (rule, value, callback) => {
        const res = /^1[0-9]{10}$/
        if (value) {
            if (!res.test(value)) {
                callback(new Error("请输入有效数值"));
            } else {
                callback();
            }
        } else {
            callback(new Error("请输入有效数值"));
        }
    }
    // 验证邮箱
export const validateEmailRule = (rule, value, callback) => {
    if (validatenull(value)) {
        callback();
    } else {
        if (validateEmail(value)) {
            callback();
        } else {
            callback(new Error("请输入正确的邮箱账号"));
        }
    }
}