import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'



import login from './modules/login'


const StoreConstructorOptions = {
    state,
    getters,
    actions,
    mutations,
    modules: {
        login,
    }
}

export default StoreConstructorOptions;
