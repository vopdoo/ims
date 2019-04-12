/**
 * User Api
 */

import { utils } from '../libs/utils'

export default {

    examinationOrderList(request) {
        return utils.ajax({
            method: 'get',
            url: '/orders',
            params: request,
        });
    },
    editExaminationOrder(request) {
        return utils.ajax({
            method: 'put',
            url: '/orders/' + request.id,
            data: request,
        });
    },

    examinationOrderDetailList(request) {
        return utils.ajax({
            method: 'get',
            url: '/orderDetails',
            params: request,
        });
    },


}
