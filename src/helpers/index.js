import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import moment from 'moment';
import ms from 'ms';
import { runMutation, runQuery } from './functions';
import { routes } from './routes';

export {
  runMutation,
  runQuery,
  ref,
  computed,
  useQuasar,
  useRouter,
  storeToRefs,
  moment,
  ms,
  routes,
  onMounted,
};
