// actions
import * as types from "./mutation-types";
console.info(types.GET_TEST);

const actions = {
    test({commit,state}, request) {
        console.info(state);
        commit(types.GET_TEST);
        console.info('top actions->test');

    },
}

export default actions;
