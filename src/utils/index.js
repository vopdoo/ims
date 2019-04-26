import db from './db'
import cookies from './cookies'
import moment from "moment"

const util = {
    db,
    cookies,
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
    const processTitle = process.env.VUE_APP_TITLE || 'IMS'
    window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

util.isAccessTokenWillOrExpired = function () {
    let expired_at = parseInt(sessionStorage.getItem('expired_at'));
    let current_at = moment().unix();
    let time_difference = expired_at - current_at;
    if (time_difference <= 0) {
        console.info('expired');
        return 'expired';
    }
    if (time_difference <= 110 && time_difference > 0) {
        console.info('will_expired');
        return 'will_expired';
    }
};

/**
 * checkLogin
 * 检查是否登录
 * @return access_token |false
 */
util.checkLogin = function () {
    let currrent_access_token = sessionStorage.getItem('access_token');
    // console.info('currrent_access_token:', currrent_access_token);
    return currrent_access_token ? true : false;

}

export default util
