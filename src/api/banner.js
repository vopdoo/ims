import {utils} from '../libs/utils'

export default {
    bannerList(request) {
        return utils.ajax({
            method: 'get',
            url: 'admin/banners',
            params: request,
        });
    },
    addBanner(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/banners',
            data: request,
        });
    },
    editBanner(request) {
        return utils.ajax({
            method: 'put',
            url: 'admin/banners/' + request.id,
            data: request,
        });
    },
    delBanner(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/banners/' + request.id,
        });
    },

}
