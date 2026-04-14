import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);


export class Server {

    public static async start() {
        console.log('Server started...');
        
        console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);

        CronService.createJob(
            '*/3 * * * * *',
            () => {
                console.log(new Date);
                // const checkService = new CheckService().execute('http://localhost:3000/posts/');    //Prueba con JSON Server (otro proyecto)
                
                const url = 'http://google.com';
                // const url = 'http://localhost:3000/posts/';
                const checkService = new CheckService(
                    fileSystemLogRepository,
                    // () => console.log(`${url} is OK`),
                    // (error) => console.log(error),
                    undefined,
                    undefined,
                )
                .execute(url);
                
            }
        );
        
    }


}


