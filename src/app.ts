import { envs } from './config/plugins/envs.plugin';
import { Server } from './presentation/server';


(async() => {
    main();
})();


function main() {
    // console.log('MAIN');
    Server.start();
    // console.log(process.env.PORT);
    // console.log(envs);
}




