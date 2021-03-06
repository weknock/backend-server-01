import cluster from 'cluster';

import CommonConstants from "../../../CommonConstants";
import SystemConstants from "../../../SystemContants";

import CommonUtilities from "../../../CommonUtilities";
import SystemUtilities from "../../../SystemUtilities";

import { SYSUserGroup } from "../models/SYSUserGroup";

import DBConnectionManager from "../../../managers/DBConnectionManager";

import BaseService from "./BaseService";
import { SYSUser } from '../models/SYSUser';

const debug = require( 'debug' )( 'SYSUserGroupService' );

export default class SYSUserGroupService extends BaseService {

  static readonly _ID = "sysUserGroupService";

  static async getBy( by: { Id: string, ShortId: string, Name: string },
                      strTimeZoneId: string,
                      transaction: any,
                      logger: any ): Promise<SYSUserGroup> {

    let result: SYSUserGroup = null;

    if ( by.Id ) {

      let strId = by.Id;

      if ( strId.startsWith( "#UId:" ) ) {

        strId = strId.replace( "#UId:", "" );

      }

      if ( strId.includes( "#" ) ) {

        strId = strId.replace( "#", "" );

      }

      result = await this.getById( strId,
                                   strTimeZoneId,
                                   transaction,
                                   logger );

    }

    if ( result === null &&
         by.ShortId ) {

      let strShortId = by.ShortId;

      if ( strShortId.startsWith( "#USId:" ) ) {

        strShortId = strShortId.replace( "#USId:", "" );

      }

      if ( strShortId.includes( "#" ) ) {

        strShortId = strShortId.replace( "#", "" );

      }

      result = await this.getByShortId( strShortId,
                                        strTimeZoneId,
                                        transaction,
                                        logger );

    }

    if ( result === null &&
         by.Name ) {

      let strName = by.Name;

      if ( strName.startsWith( "#GName:" ) ) {

        strName = strName.replace( "#GName:", "" );

      }

      if ( strName.includes( "#" ) ) {

        strName = strName.replace( "#", "" );

      }

      result = await this.getByName( strName,
                                     strTimeZoneId,
                                     transaction,
                                     logger );

    }

    return result;

  }

  static async getById( strId: string,
                        strTimeZoneId: string,
                        transaction: any,
                        logger: any ): Promise<SYSUserGroup> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    try {

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      const options = {

        where: { "Id": strId },
        transaction: currentTransaction,

      }

      result = await SYSUserGroup.findOne( options );

      if ( CommonUtilities.isValidTimeZone( strTimeZoneId ) ) {

        SystemUtilities.transformModelToTimeZone( result,
                                                  strTimeZoneId,
                                                  logger );

      }

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        await currentTransaction.commit();

      }

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.getById.name;

      const strMark = "E0F4B6151C3C" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error1 ) {


        }

      }

    }

    return result;

  }

  static async getByShortId( strShortId: string,
                             strTimeZoneId: string,
                             transaction: any,
                             logger: any ): Promise<SYSUserGroup> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    try {

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      const options = {

        where: { "ShortId": strShortId },
        transaction: currentTransaction,

      }

      result = await SYSUserGroup.findOne( options );

      if ( CommonUtilities.isValidTimeZone( strTimeZoneId ) ) {

        SystemUtilities.transformModelToTimeZone( result,
                                                  strTimeZoneId,
                                                  logger );

      }

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        await currentTransaction.commit();

      }

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.getById.name;

      const strMark = "55D9FD1115C6" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error1 ) {


        }

      }

    }

    return result;

  }

  static async getNameIsFree( strId: string,
                              strName: string,
                              strTimeZoneId: string,
                              transaction: any,
                              logger: any ): Promise<SYSUserGroup> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    try {

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      //const Sequelize = require( 'sequelize' );
      //const notEqual = Sequelize.Op.ne;

      const options = {

        where: { Id: { $ne: strId }, Name: strName },
        transaction: currentTransaction

      }

      result = await SYSUserGroup.findOne( options );

      if ( CommonUtilities.isValidTimeZone( strTimeZoneId ) ) {

        SystemUtilities.transformModelToTimeZone( result,
                                                  strTimeZoneId,
                                                  logger );

      }

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        await currentTransaction.commit();

      }

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = SYSUserGroupService.name + "." + this.getNameIsFree.name;

      const strMark = "A2CE756EBE10" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error1 ) {


        }

      }

      result = error;

    }

    return result;

  }

  static async getByName( strName: string,
                          strTimeZoneId: string,
                          transaction: any,
                          logger: any ): Promise<SYSUserGroup> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    try {

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      const options = {

        where: { "Name": strName },
        transaction: currentTransaction,

      }

      result = await SYSUserGroup.findOne( options );

      if ( CommonUtilities.isValidTimeZone( strTimeZoneId ) ) {

        SystemUtilities.transformModelToTimeZone( result,
                                                  strTimeZoneId,
                                                  logger );

      }

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        await currentTransaction.commit();

      }

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.getByName.name;

      const strMark = "8E36301230F7" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error1 ) {


        }

      }

    }

    return result;

  }

  static async checkExistsById( strId: string,
                                transaction: any,
                                logger: any ): Promise<boolean> {

    return await this.getById( strId,
                               null,
                               transaction,
                               logger ) !== null;

  }

  static async checkDisabledById( strId: string,
                                  transaction: any,
                                  logger: any ): Promise<boolean> {

    const sysUserGroup = await this.getById( strId,
                                             null,
                                             transaction,
                                             logger );

    return sysUserGroup ? sysUserGroup.DisabledBy !== null || sysUserGroup.DisabledAt !== null : false;

  }

  static async checkExistsByName( strName: string,
                                  transaction: any,
                                  logger: any ): Promise<boolean> {

    return await this.getByName( strName,
                                 null,
                                 transaction,
                                 logger ) !== null;

  }

  static async checkDisabledByName( strName: string,
                                    transaction: any,
                                    logger: any ): Promise<boolean> {

    const sysUserGroup = await this.getByName( strName,
                                               null,
                                               transaction,
                                               logger );

    return sysUserGroup ? sysUserGroup.DisabledBy !== null || sysUserGroup.DisabledAt !== null : false;

  }

  static async checkExpiredById( strId: string,
                                 transaction: any,
                                 logger: any ): Promise<boolean> {

    const sysUserGroup = await this.getById( strId,
                                             null,
                                             transaction,
                                             logger );

    return sysUserGroup ? SystemUtilities.isDateAndTimeAfter( sysUserGroup.ExpireAt ) : false;

  }

  static async checkExpiredByName( strName: string,
                                   transaction: any,
                                   logger: any ): Promise<boolean> {

    const sysUserGroup = await this.getByName( strName,
                                               null,
                                               transaction,
                                               logger );

    return sysUserGroup ? SystemUtilities.isDateAndTimeAfter( sysUserGroup.ExpireAt ) : false;

  }

  static checkDisabled( sysUserGroup: SYSUserGroup ): boolean {

    return sysUserGroup &&
           ( sysUserGroup.DisabledBy ||
             sysUserGroup.DisabledAt ) ? true: false;

  }

  static checkExpired( sysUserGroup: SYSUserGroup ): boolean {

    return sysUserGroup ? SystemUtilities.isDateAndTimeAfter( sysUserGroup.ExpireAt ) : false;

  }

  static checkDisabledOrExpired( sysUserGroup: SYSUserGroup ): boolean {

    return sysUserGroup &&
           ( sysUserGroup.DisabledBy ||
             sysUserGroup.DisabledAt ||
           SystemUtilities.isDateAndTimeAfter( sysUserGroup.ExpireAt ) ) ? true: false;

  }

  static async createOrUpdate( createOrUpdateData: any,
                               bUpdate: boolean,
                               transaction: any,
                               logger: any ): Promise<SYSUserGroup> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    try {

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      const options = {

        where: { "Id": createOrUpdateData.Id ? createOrUpdateData.Id : "" },
        transaction: currentTransaction,

      }

      let sysUserGroupInDB = await SYSUserGroup.findOne( options );

      if ( sysUserGroupInDB === null ) {

        sysUserGroupInDB = await SYSUserGroup.create(
                                                      createOrUpdateData,
                                                      { transaction: currentTransaction }
                                                    );

      }
      else if ( bUpdate ) {

        if ( !createOrUpdateData.UpdatedBy ) {

          createOrUpdateData.UpdatedBy = SystemConstants._UPDATED_BY_BACKEND_SYSTEM_NET;

        }

        await sysUserGroupInDB.update( createOrUpdateData,
                                       options );

        sysUserGroupInDB = await SYSUserGroup.findOne( options );

      }

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        await currentTransaction.commit();

      }

      result = sysUserGroupInDB;

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.createOrUpdate.name;

      const strMark = "1CC6DB5BA1E2" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error1 ) {


        }

      }

      result = error;

    }

    return result;

  }

  static async deleteByModel( sysUserGroup: SYSUserGroup,
                              transaction: any,
                              logger: any ): Promise<Error|boolean> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    try {

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      const options = {

        transaction: currentTransaction,

      }

      await sysUserGroup.destroy( options );

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        await currentTransaction.commit();

      }

      result = true;

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.deleteByModel.name;

      const strMark = "E119216006E0" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error1 ) {


        }

      }

      result = error;

    }

    return result;

  }

  static async countUsers( strId: string,
                           transaction: any,
                           logger: any ): Promise<number> {

    let intResult = 0;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    try {

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      const options = {

        where: { "GroupId": strId ? strId : "" },
        transaction: currentTransaction,

      }

      intResult = await SYSUser.count( options );

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        await currentTransaction.commit();

      }

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.deleteByModel.name;

      const strMark = "E119216006E0" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error1 ) {


        }

      }

      intResult = error;

    }

    return intResult;

  }

}