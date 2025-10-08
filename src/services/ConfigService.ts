import { ServerConfig } from '@pseinfo/app/types/index';
import { IConfig } from '@pseinfo/app/types/interfaces';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import deepmerge from 'deepmerge';
import { load } from 'js-yaml';

export class ConfigurationService implements IConfig {}
