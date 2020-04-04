require( 'dotenv' ).config(); //Read the .env file, in the root folder of project

import cluster from 'cluster';

import appRoot from 'app-root-path';

import CommonConstants from './02_system/common/CommonConstants';

import CommonUtilities from "./02_system/common/CommonUtilities";
import SystemUtilities from "./02_system/common/SystemUtilities";

import LoggerManager from "./02_system/common/managers/LoggerManager";
import NotificationManager from './02_system/common/managers/NotificationManager';
import DBConnectionManager from './02_system/common/managers/DBConnectionManager';
import CacheManager from './02_system/common/managers/CacheManager';

let debug = require( 'debug' )( 'server_task@main_process' );

export default class ServerTask {

  static bRunningTask = false;

  static fibo( n: number ): number {

    if ( n < 2 ) {

      return 1;

    }
    else {

      return ServerTask.fibo( n - 2 ) + ServerTask.fibo( n - 1 );

    }

  }

  static async handlerRunRask(): Promise<boolean> {

    let bResult = false;

    let currentTransaction = null;

    const strMark = "B6BF8BB0C7C6" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

    const debugMark = debug.extend( strMark );

    debugMark( "handlerRunRask - start" );

    try {

      if ( ServerTask.bRunningTask === false ) {

        ServerTask.bRunningTask = true;

        const dbConnection = DBConnectionManager.getDBConnection( "secondary" );

        if ( currentTransaction === null ) {

          currentTransaction = await dbConnection.transaction();

        }

        //ServerTask.fibo( 9999 );

        if ( currentTransaction !== null &&
            currentTransaction.finished !== "rollback" ) {

          await currentTransaction.commit();

        }

        ServerTask.bRunningTask = true;

      }

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = ServerTask.name + "." + ServerTask.handlerRunRask.name;

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );
      debugMark( "Error time: [%s]", SystemUtilities.getCurrentDateAndTime().format( CommonConstants._DATE_TIME_LONG_FORMAT_01 ) );
      debugMark( "Catched on: %O", sourcePosition );

      error.mark = strMark;
      error.logId = SystemUtilities.getUUIDv4();

      if ( LoggerManager.mainLoggerInstance &&
           typeof LoggerManager.mainLoggerInstance.error === "function" ) {

        LoggerManager.mainLoggerInstance.error( error );

      }

      if ( currentTransaction !== null ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error ) {


        }

      }

    }

    debugMark( "handlerRunRask - finish" );

    return bResult;

  }

  static async handlerCleanExit() {

    await NotificationManager.publishOnTopic( "SystemEvent",
                                              {
                                                SystemId: SystemUtilities.getSystemId(),
                                                SystemName: process.env.APP_SERVER_IM_NAME,
                                                SubSystem: "Server",
                                                Token: "No apply",
                                                UserId: "No apply",
                                                UserName: "No apply",
                                                UserGroupId: "No apply",
                                                Code: "SERVER_TASK_SHUTDOWN",
                                                EventAt: SystemUtilities.getCurrentDateAndTime().format(),
                                                Data: {}
                                              },
                                              LoggerManager.mainLoggerInstance );

    if ( process.env.ENV !== "dev" ) {

      //

    }

    process.exit( 0 ); //Finish the process

  }

  static async main() {

    SystemUtilities.startRun = SystemUtilities.getCurrentDateAndTime(); //new Date();

    SystemUtilities.strBaseRunPath = __dirname;
    SystemUtilities.strBaseRootPath = appRoot.path;
    SystemUtilities.strAPPName = process.env.APP_SERVER_IM_NAME;

    try {

      let debugMark = debug.extend( "FC96A92FD2FF" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ) );

      debugMark( "%s", SystemUtilities.startRun.format( CommonConstants._DATE_TIME_LONG_FORMAT_01 ) );
      debugMark( "Main process started" );
      debugMark( "Running from: [%s]", SystemUtilities.strBaseRunPath );

      LoggerManager.mainLoggerInstance = await LoggerManager.createMainLogger(); //Create the main logger

      CacheManager.currentInstance = await CacheManager.create( LoggerManager.mainLoggerInstance );

      await DBConnectionManager.connect( "*", LoggerManager.mainLoggerInstance ); //Init the connection to db using the orm

      await DBConnectionManager.loadQueryStatement( "*", LoggerManager.mainLoggerInstance );

      process.on( 'SIGTERM', async () => {

        //console.info('SIGTERM signal received.');
        debugMark( "SIGTERM signal received." );

        ServerTask.handlerCleanExit();

      });

      process.on( 'SIGINT', () => {

        //console.info('SIGTERM signal received.');
        debugMark( "SIGINT signal received." );

        ServerTask.handlerCleanExit();

      });

      setInterval( ServerTask.handlerRunRask, 30000 ); //Every 30 seconds

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.main.name;

      const strMark = "E65067AADF92" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );
      debugMark( "Error time: [%s]", SystemUtilities.getCurrentDateAndTime().format( CommonConstants._DATE_TIME_LONG_FORMAT_01 ) );
      debugMark( "Catched on: %O", sourcePosition );

      error.mark = strMark;
      error.logId = SystemUtilities.getUUIDv4();

      if ( LoggerManager.mainLoggerInstance &&
           typeof LoggerManager.mainLoggerInstance.error === "function" ) {

        LoggerManager.mainLoggerInstance.error( error );

      }

    }

  }

}

ServerTask.main();
