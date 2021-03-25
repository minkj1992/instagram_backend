/* eslint-disable node/no-extraneous-import */
import * as path from 'path';
import {loadFilesSync} from '@graphql-tools/load-files';
import {mergeResolvers, mergeTypeDefs} from '@graphql-tools/merge';

const loadedTypes = loadFilesSync(path.join(__dirname, './**/*.typeDefs.ts'));
const loadedResolvers = loadFilesSync(
  path.join(__dirname, './**/*.resolvers.ts')
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
