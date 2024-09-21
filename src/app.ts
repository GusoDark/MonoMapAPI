import express from 'express';
import { envs } from './config/envs.plugin'
import { AppRoutes } from './presentation/routes';
import { MongoDatabase } from './data/init';
import 'dotenv/config'
import { emailJob } from './domain/jobs/email.jobs';

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);


(async ()=>{
  await MongoDatabase.connect(
    {
      dbName:"MonoMapAPI",
      mongoUrl:envs.MONGO_URL ?? ""
    });
  
})();

app.listen(envs.PORT, () => {
  console.log("Servidor esta corriendo");
  emailJob();
});