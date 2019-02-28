/**
 * User Api
 */

import { utils } from '../libs/utils'

import jsonp from 'jsonp';

export default {

    goodList(request) {
        return utils.ajax({
            method: 'get',
            url: '/admin/medicalexaminationgoods',
            params: request,
        });
    },

    addGood(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/medicalexaminationgoods',
            data: request,
        });
    },

    editGood(request) {
        return utils.ajax({
            method: 'put',
            url: '/admin/medicalexaminationgoods/' + request.id,
            data: request,
        });
    },
    delGood(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/medicalexaminationgoods/' + request.id,
        });
    },


    appointmentList(request) {
        return utils.ajax({
            method: 'get',
            url: '/appointments',
            params: request,
        });
    },

    reportList(request) {
        return utils.ajax({
            method: 'get',
            url: '/medicalExaminationReports',
            params: request,
        });
    },

    editReport(request) {
        // console.info(request)
        return utils.ajax({
            method: 'put',
            url: '/medicalExaminationReports/' + request.id,
            data: request,
        });
    },




    editAppointment(request) {
        console.info(request)
        return utils.ajax({
            method: 'put',
            url: '/appointments/' + request.id,
            data: request,
        });
    },


    packageList(request) {
        return utils.ajax({
            method: 'get',
            url: '/admin/medicalexaminationpackages',
            params: request,
        });
    },

    itemList(request) {
        return utils.ajax({
            method: 'get',
            url: '/admin/medicalexaminationitems',
            params: request,
        });
    },

    itemAllList(request) {
        return utils.ajax({
            method: 'get',
            url: '/admin/medicalexaminationitems/lists',
            params: request,
        });
    },


    addPackage(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/medicalexaminationpackages',
            data: request,
        });
    },

    editPackage(request) {
        return utils.ajax({
            method: 'put',
            url: '/admin/medicalexaminationpackages/' + request.id,
            data: request,
        });
    },
    delPackage(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/medicalexaminationpackages/' + request.id,
        });
    },

    addItem(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/medicalexaminationitems',
            data: request,
        });
    },
    editItem(request) {
        return utils.ajax({
            method: 'put',
            url: '/admin/medicalexaminationitems/' + request.id,
            data: request,
        });
    },
    delItem(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/medicalexaminationitems/' + request.id,
        });
    },

    validateName(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/medicalexaminationitems/validateName',
            data: request,
        });
    },

    validatePackageCodeOrName(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/medicalexaminationpackages/validatePackageCodeOrName',
            data: request,
        });
    },




}
