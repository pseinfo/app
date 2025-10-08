import { PageController } from '@pseinfo/app/controller/PageController';

export class HomeController extends PageController {

    constructor () { super( { route: '{/}', template: 'home' } ) }

}
