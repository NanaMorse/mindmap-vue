import appMutations from './app'
import stageMutations from './stage'
import mapMutations from './map'

export default {
  ...appMutations,
  ...stageMutations,
  ...mapMutations
}