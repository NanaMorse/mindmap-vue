import { stage } from 'client-src/constants/mutations'
import { stateInfo } from 'client-src/interface'

export default {
  [stage.setBackgroundColor](state: stateInfo, { color }: { color: string }) {
    state.stage.backgroundColor = color;
  }
}