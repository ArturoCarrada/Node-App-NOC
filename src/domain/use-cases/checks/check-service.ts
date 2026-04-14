import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

const nameFile: string = 'check-service.ts';

export class CheckService implements CheckServiceUseCase {



    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) {
        // console.log('Se creo instancia de CheckService')
    }


    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);

            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            // console.log(`${url} is OK`);
            //document.currentScript?.tagName
            // const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low );
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: nameFile,
            });
            this.logRepository.saveLog(log);
            this.successCallback && this.successCallback();
            
            return true;
            
        } catch (error) {
            console.log(`${error}`);
            const errorMessage = `${ url } is not OK. ${ error }`;
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: nameFile,
            });

            this.logRepository.saveLog(log);

            this.errorCallback && this.errorCallback(`${errorMessage}`);
            return false;
        }


    }
}

