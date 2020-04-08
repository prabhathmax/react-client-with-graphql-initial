import { classic, modern } from '~/utils/api';
import store from '~/store';

global.$sfr = {
  store,
  classic,
  modern,
};
