import { app } from 'client-src/constants/mutations'
import { stateInfo } from 'client-src/interface'

export default {
  [app.toggleSidePanel](state: stateInfo) {
    state.app.showSidePanel = !state.app.showSidePanel;
  }
}