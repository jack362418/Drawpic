import { createStore ,Store,useStore as baseUseStore} from 'vuex'
import { InjectionKey } from 'vue'
import app from './modules/app'
import { State } from './modules/type'

export const key: InjectionKey<Store<{  app: State }>> = Symbol()

export const store = createStore<State>({
  modules:{
    app
  }
})

export const useStore = () => baseUseStore(key)