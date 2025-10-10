import { HomeController } from '@pseinfo/app/controller/HomeController';
import { IController } from '@pseinfo/app/types/interfaces';

export const registry: IController[] = [
    new HomeController()
];
