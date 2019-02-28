/**
 * User Api
 */

import {utils} from '../libs/utils'
import * as types from "../store/mutation-types";

export default {

    configIntegralList(request) {
        return utils.ajax({
            method: 'get',
            url: 'admin/integralConfig',
            params: request,
        });
    },
    addConfigIntegral(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/integralConfig',
            data: request,
        });
    },
    editConfigIntegral(request) {
        return utils.ajax({
            method: 'put',
            url: 'admin/integralConfig/' + request.id,
            data: request,
        });
    },
    delConfigIntegral(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/integralConfig/' + request.id,
        });
    },

}
