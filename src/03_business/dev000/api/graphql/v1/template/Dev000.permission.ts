import {
  //allow,
  //rule,
  and } from 'graphql-shield';

import cluster from "cluster";

import MiddlewareManager from '../../../../../../02_system/common/managers/MiddlewareManager';

//import SystemUtilities from '../../../../../02_system/common/SystemUtilities';

const debug = require( 'debug' )( 'Dev000.permission' );

export const permissions = {

  Query: {

    getDev000V1: and( MiddlewareManager.ruleCheckIsAuthenticated ), //allow,

  },

  Mutation: {

    addDev000V1: and( MiddlewareManager.ruleCheckIsAuthenticated ), //allow,

  }

};

//AccessKind: 1 Public
//AccessKind: 2 Authenticated
//AccessKind: 3 Role

export const roles = {

  getDev000V1: { AccessKind: 3, AllowTagAccess: "#Administrator#", Roles: [ "Administrator" ], Description: "Dev000 example query" },
  addDev000V1: { AccessKind: 3, AllowTagAccess: "#Administrator#", Roles: [ "Administrator" ], Description: "Dev000 example mutation" },

}

export async function init( logger: any ): Promise<void> {

  let debugMark = debug.extend( 'ED76FFF12487' + ( cluster.worker && cluster.worker.id ? '-' + cluster.worker.id : '' ) );
  debugMark( "Init called" );

}