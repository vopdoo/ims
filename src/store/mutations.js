// mutations

import * as types from "./mutation-types";

const mutations = {
    [types.GET_TEST_B](state, data) {
        // state.admins = data.data;
        console.info('testb mutations GET_TEST_B');
    },
}

export default mutations;
