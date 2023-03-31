import { createClient } from 'villus';
const URL = import.meta.env.VITE_URL_SERVER;

const villus = createClient({
  url: URL,
});

export { villus };
