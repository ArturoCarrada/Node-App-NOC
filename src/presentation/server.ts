import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const emailService = new EmailService();

export class Server {

    public static async start() {
        console.log('Server started...');

        // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);


        //todo: Mandar email
        // new SendEmailLogs(
        //   emailService, 
        //   fileSystemLogRepository,
        // ).execute(
        //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
        // )
        // emailService.sendEmailWithFileSystemLogs(
        //   ['fernando.herrera85@gmail.com','fernando.herrera.cr@gmail.com']
        // );


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


