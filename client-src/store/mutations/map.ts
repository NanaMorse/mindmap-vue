import { map } from 'client-src/constants/mutations'

const { selectionEdit } = map;

const selectionEditMutations = {
  [selectionEdit.setSingleSelection]() {

  }
};

export default {
  ...selectionEditMutations
}