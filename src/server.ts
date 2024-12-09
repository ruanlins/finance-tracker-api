import { app } from './app';
import { env } from './env';

app.listen({ port: env.PORT }, () => {
  console.log(`Server runnig at port ${env.PORT}`);
});
