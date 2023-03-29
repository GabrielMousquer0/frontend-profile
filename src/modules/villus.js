import { createClient } from 'villus';
const PORT = import.meta.env.VITE_URL_SERVER;

const villus = createClient({
  url: `${PORT}`,
});

export { villus };
