/**
 * User Api
 */

import { utils } from '../libs/utils'

import jsonp from 'jsonp';

export default {
    lists(request) {
        return utils.ajax({
            method: 'get',
            url: '/admin/hospitals',
            params: request,
        });
    },

    getHospitalLevels(request) {
        return utils.ajax({
            method: 'get',
            url: '/admin/hospital/levels',
            params: request,
        });
    },

    addLevel(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/hospital/levels',
            data: request,
        });
    },
    editLevel(request) {
        return utils.ajax({
            method: 'put',
            url: '/admin/hospital/levels/' + request.id,
            data: request,
        });
    },
    delLevel(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/hospital/levels/' + request.id,
        });
    },
    add(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/hospitals',
            data: request,
        });
    },
    edit(request) {
        return utils.ajax({
            method: 'put',
            url: '/admin/hospitals/' + request.id,
            data: request,
        });
    },
    del(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/hospitals/' + request.id,
        });
    },
    getGeocoder(request) {
        let geocoderUrl = `http://apis.map.qq.com/ws/geocoder/v1/?location=${request.lat},${request.lng}&key=DLEBZ-6ZTCF-U7WJM-JC74C-Y5G6F-5XBMP&output=jsonp`;
        return new Promise((resolve, reject) => {
            jsonp(geocoderUrl, {}, (err, data) => {
                err ? reject(err) : resolve(data.result)
            })
        });
    },
    validateName(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/hospitals/validateName',
            data: request,
        });
    },


}
