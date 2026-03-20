import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";



export class Server {

    public static async start() {
        console.log('Server started...');
        
        CronService.createJob(
            '*/3 * * * * *',
            () => {
                console.log(new Date);
                // const checkService = new CheckService().execute('http://localhost:3000/posts/');    //Prueba con JSON Server (otro proyecto)
                
                const url = 'http://google.com';
                const checkService = new CheckService(
                    () => console.log(`${url} is OK`),
                    (error) => console.log(error),
                )
                .execute(url);
                
            }
        );
        
    }


}


