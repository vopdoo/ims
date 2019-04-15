
import ImsCurd from './components/ims-curd';
import ImsLayout from './components/ims-layout';
import storeConstructorOptions from './store';

import routes from './routes';

// import locale from './locale/index';

const components = {
    ImsCurd,
    ImsLayout
};

const ims = {
    ...components
};


const install = function(Vue, opts = {}) {
    if (install.installed) return;
    // locale.use(opts.locale);
    // locale.i18n(opts.i18n);

    Object.keys(ims).forEach(key => {
        Vue.component(key, ims[key]);
    });

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    // locale: locale.use,
    // i18n: locale.i18n,
    install,
    ...components,
    // storeConstructorOptions,
    // routes
};

// API.lang = (code) => {
//     const langObject = window['iview/locale'].default;
//     if (code === langObject.i.locale) locale.use(langObject);
//     else console.log(`The ${code} language pack is not loaded.`); // eslint-disable-line no-console
// };



// module.exports.default = module.exports = API;   // eslint-disable-line no-undef
export {
    storeConstructorOptions,
    routes
}

export default API

// module.exports.default = API;
