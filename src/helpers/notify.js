import { Notify } from 'quasar';

export function negativeNotify(message) {
  return Notify.create({ message, color: 'negative', icon: 'warning' });
}
export function positiveNotify(message) {
  return Notify.create({ message, color: 'positive', icon: 'check' });
}