// mutations
import types from './mutation-types';
const mutations = {
    [types.GET_TEST_B](state, data) {
        // state.admins = data.data;
        console.info('testb ',types);
    },
}

export default mutations;
