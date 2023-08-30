import yargs from 'yargs';
import debug from 'debug';
import { hideBin } from 'yargs/helpers';

import { HomeFlag } from '../../libs/cli/setup';
import * as cfg from '../../config/config';

const log = debug('cometbft:cmd');

export let config = cfg.defaultConfig();

// ParseConfig retrieves the default environment configuration,
// sets up the CometBFT root and ensures that the root exists
// TODO: Implement
const parseConfig = async (argv: any): Promise<cfg.Config> => {
  return {};
};

// TODO: Implement
const main = async () => {
  // TODO: Implement
  const options: any = {};
  options[HomeFlag] = {};

  const argv = yargs(hideBin(process.argv))
    .options(options)
    .argv;

  config = await parseConfig(argv);

  return yargs(hideBin(process.argv))
    .commandDir('commands', { extensions: ['ts', 'js'], exclude: /([a-zA-Z0-9\s_\\.\-:])+(.d.ts)$/ })
    .demandCommand()
    .help()
    .argv;
};

main().then(() => {
  process.exit();
}).catch(err => {
  log(err);
});
