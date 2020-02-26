import cluster from 'cluster';

//import { QueryTypes } from "sequelize"; //Original sequelize //OriginalSequelize,
//import uuidv4 from 'uuid/v4';

import CommonConstants from "../../CommonConstants";
import SystemConstants from "../../SystemContants";

import CommonUtilities from "../../CommonUtilities";
import SystemUtilities from '../../SystemUtilities';

import { SYSRoleHasRoute } from "../models/SYSRoleHasRoute";

import DBConnectionManager from "../../managers/DBConnectionManager";

import BaseService from "./BaseService";

const debug = require( 'debug' )( 'SYSRoleHasRouteService' );

export default class SYSRoleHasRouteService extends BaseService {

  static readonly _ID = "sysRoleHasRouteService";

  static async create( strRoleId: string,
                       strRouteId: string,
                       transaction: any,
                       logger: any ): Promise<SYSRoleHasRoute> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    try {

      const dbConnection = DBConnectionManager.currentInstance;

      if ( currentTransaction == null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      const options = {

        where: { "RoleId": strRoleId, "RouteId": strRouteId },
        transaction: currentTransaction,
        //context: { TimeZoneId: "America/Los_Angeles" }

      }

      let roleHasRoute = await SYSRoleHasRoute.findOne( options );

      if ( CommonUtilities.isNullOrEmpty( roleHasRoute ) ) {

        roleHasRoute = await SYSRoleHasRoute.create(
                                                  { RoleId: strRoleId,
                                                    RouteId: strRouteId,
                                                    CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET
                                                  },
                                                  { transaction: currentTransaction }
                                                );

      }

      if ( currentTransaction != null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        await currentTransaction.commit();

      }

      result = roleHasRoute;

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.create.name;

      const strMark = "DD097AC25659" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );
      debugMark( "Error time: [%s]", SystemUtilities.getCurrentDateAndTime().format( CommonConstants._DATE_TIME_LONG_FORMAT_01 ) );
      debugMark( "Catched on: %O", sourcePosition );

      error.mark = strMark;
      error.logId = SystemUtilities.getUUIDv4();

      if ( logger && typeof logger.error === "function" ) {

        error.catchedOn = sourcePosition;
        logger.error( error );

      }

      if ( currentTransaction != null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( ex ) {


        }

      }

    }

    return result;

  }

}