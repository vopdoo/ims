import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import modules from './modules'

const StoreConstructorOptions = {
    state,
    getters,
    actions,
    mutations,
    modules
}
console.info('StoreConstructorOptions Index.js');
export default StoreConstructorOptions;
