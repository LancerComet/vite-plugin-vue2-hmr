import { PluginOption } from 'vite'

const vue2HMR = (param?: {
  /**
   * File type test.
   * The default setting only matches .jsx or .tsx file.
   *
   * @default /\.([jt])sx$/
   */
  test?: RegExp
}) => {
  let isDev = false
  const test = param?.test || /\.([jt])sx$/

  return {
    name: 'vue2-jsx-hotreload',

    config (config, env) {
      isDev = env.mode === 'development'
    },

    async transform (code, id) {
      if (
        !test.test(id) ||
        !code.includes('defineComponent(') ||
        !isDev
      ) {
        return
      }

      code = `
        import ___api___ from 'vue-hot-reload-api'
        import ___Vue___ from 'vue'

        const __vue_hmr_key__ = '__vue_hmr_id__:'
        const __hmr_info__ = {
          id: '${id}',
          compCount: 0
        }

        ___api___.install(___Vue___)

        const __defineComponent__ = (option) => {
          const hmrId = __hmr_info__.id + __hmr_info__.compCount
          option[__vue_hmr_key__] = hmrId
          ___api___.createRecord(hmrId, option)
          __hmr_info__.compCount++
          return option
        }
      ` + code

      code = code.replace(/defineComponent\(/g, '__defineComponent__(')

      code += `
        if (import.meta.hot) {
          import.meta.hot.accept(modules => {
            Object.keys(modules).forEach(key => {
              const item = modules[key]
              const hmrId = item[__vue_hmr_key__]
              if (hmrId) {
                ___api___.reload(hmrId, item)
              }
            })
          })
        }
      `
      return code
    }
  } as PluginOption
}

export {
  vue2HMR
}
