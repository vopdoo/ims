// **  判断access_token 是否过期或者将要过期
import moment from "moment";

const isAccessTokenWillOrExpired = function () {
    let expired_at = parseInt(sessionStorage.getItem('expired_at'));
    let current_at = moment().unix();
    let time_difference = expired_at - current_at;
    if (time_difference <= 0) {
        // console.info('已经过期 ');
        return 'expired';
    }
    if (time_difference <= 100 && time_difference > 0) {
        // console.info('将要过期 ');
        return 'will_expired';
    }
};

/**
 * checkLogin
 * 检查是否登录
 * @return access_token |false
 */
const checkLogin = function () {
    let currrent_access_token = sessionStorage.getItem('access_token');
    console.info('currrent_access_token:', currrent_access_token);
    return currrent_access_token ? true : false;

}

export {
    checkLogin,
    isAccessTokenWillOrExpired
};
