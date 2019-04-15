// actions
import * as types from "./mutation-types";

const actions = {
    test({commit,state}, request) {
        commit(types.GET_TEST);
        console.info('top actions->test');

    },
}

export default actions;
