// actions
import * as types from './mutation-types'
const actions = {
    tesb({commit, state}, request) {
        console.info('top actions->testb');
        commit(types.GET_TEST_B);
    },
}

export default actions;
