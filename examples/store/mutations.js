// mutations

import * as types from "./mutation-types";

const mutations = {
    [types.GET_TEST](state) {
        console.info(state);
        state.info = {
            a:'aa',
            b:'bb',
        };
        // state.admins = data.data;
       console.info('test mutations');
    },
}

export default mutations;
