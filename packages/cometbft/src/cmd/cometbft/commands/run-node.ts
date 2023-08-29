import * as cfg from '../../../config/config';
import { config } from '../cometbft';

// NewRunNodeCmd returns the command that allows the CLI to start a node.
// It can be used with a custom PrivValidator and in-process ABCI application.
export const command = ['start', 'node', 'run'];
export const desc = 'Run the CometBFT node';
// TODO: Implement
export const builder = {};

// TODO: Implement
export const handler = async (argv: any): Promise<void> => {};
