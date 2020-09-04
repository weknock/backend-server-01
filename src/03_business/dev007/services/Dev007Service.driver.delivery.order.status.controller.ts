import cluster from "cluster";

//import { QueryTypes } from "sequelize"; //Original sequelize //OriginalSequelize,

import {
  Request,
  Response
} from "express";

import CommonConstants from "../../../02_system/common/CommonConstants";

import SystemUtilities from "../../../02_system/common/SystemUtilities";
import CommonUtilities from "../../../02_system/common/CommonUtilities";

import DBConnectionManager from "../../../02_system/common/managers/DBConnectionManager";
import I18NManager from "../../../02_system/common/managers/I18Manager";

import BaseService from "../../../02_system/common/database/master/services/BaseService";
import BIZDeliveryOrderService from "../../common/database/master/services/BIZDeliveryOrderService";
import BIZDeliveryOrderStatusStepService from "../../common/database/master/services/BIZDeliveryOrderStatusStepService";
import BIZDeliveryOrderStatusService from "../../common/database/master/services/BIZDeliveryOrderStatusService";
import { BIZDeliveryOrderStatus } from "../../common/database/master/models/BIZDeliveryOrderStatus";
import { BIZDeliveryOrderStatusStep } from "../../common/database/master/models/BIZDeliveryOrderStatusStep";
import GeoMapManager from "../../../02_system/common/managers/GeoMapManager";
import BIZDriverInDeliveryZoneService from "../../common/database/master/services/BIZDriverInDeliveryZoneService";
import NotificationManager from "../../../02_system/common/managers/NotificationManager";

const debug = require( "debug" )( "Dev007ServicesDriverDeliveryOrderStatusController" );

export default class Dev007ServicesDriverDeliveryOrderStatusController extends BaseService {

  //Common business services

  static async getDeliveryOrderStatus( request: Request,
                                       response: Response,
                                       transaction: any,
                                       logger: any ):Promise<any> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    let bApplyTransaction = false;

    let strLanguage = "";

    try {

      const context = ( request as any ).context; //context is injected by MiddlewareManager.middlewareSetContext function

      strLanguage = context.Language;

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      let userSessionStatus = context.UserSessionStatus;

      let bizDeliveryOrderInDB = await BIZDeliveryOrderService.getById( request.query.Id as string,
                                                                        currentTransaction,
                                                                        logger );

      if ( bizDeliveryOrderInDB instanceof Error ) {

        const error = bizDeliveryOrderInDB as any;

        result = {
                   StatusCode: 500, //Internal server error
                   Code: "ERROR_UNEXPECTED",
                   Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                   Mark: "7917B4757776" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: error.name,
                               Message: error.message,
                               Details: await SystemUtilities.processErrorDetails( error ) //error
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( !bizDeliveryOrderInDB ) {

        result = {
                   StatusCode: 404, //Not found
                   Code: "ERROR_DELIVERY_ORDER_NOT_FOUND",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not found in database.", request.body.EstablishmentId ),
                   Mark: "46A79B9FECA1" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DELIVERY_ORDER_NOT_FOUND",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not found in database.", request.body.EstablishmentId ),
                               Details: ""
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( bizDeliveryOrderInDB.UserId !== userSessionStatus.UserId ) {

        result = {
                   StatusCode: 403, //Fobidden
                   Code: "ERROR_DRIVER_NOT_ASSIGNED_TO_ORDER",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not is not assigned to you.", request.body.Id ),
                   Mark: "CBCFF59E8486" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DRIVER_NOT_ASSIGNED_TO_ORDER",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not is not assigned to you.", request.body.Id ),
                               Details: null
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else {

        let bizDeliveryOrderStatusStepPreviousInDB = await BIZDeliveryOrderStatusStepService.getDeliveryOrderPreviousStatusStepByKind( bizDeliveryOrderInDB.Kind,
                                                                                                                                       bizDeliveryOrderInDB.StatusSequence,
                                                                                                                                       currentTransaction,
                                                                                                                                       logger ) as any;

        if ( bizDeliveryOrderStatusStepPreviousInDB ) {

          bizDeliveryOrderStatusStepPreviousInDB = CommonUtilities.includeObjectFields( bizDeliveryOrderStatusStepPreviousInDB,
                                                                                        [
                                                                                          "Id",
                                                                                          "Sequence",
                                                                                          "First",
                                                                                          "Last",
                                                                                          "Canceled",
                                                                                          "Code",
                                                                                          "Description",
                                                                                          "BColor",
                                                                                          "FColor",
                                                                                          "Icon"
                                                                                        ],
                                                                                        logger );

        }
        else {

          bizDeliveryOrderStatusStepPreviousInDB = {
                                                     "Id": null,
                                                     "Sequence": null,
                                                     "First": null,
                                                     "Last": null,
                                                     "Canceled": null,
                                                     "Code": null,
                                                     "Description": null,
                                                     "BColor": null,
                                                     "FColor": null,
                                                     "Icon": null
                                                   };

        }

        let bizDeliveryOrderStatusStepNextInDB = await BIZDeliveryOrderStatusStepService.getDeliveryOrderNextStatusStepByKind( bizDeliveryOrderInDB.Kind,
                                                                                                                               bizDeliveryOrderInDB.StatusSequence,
                                                                                                                               currentTransaction,
                                                                                                                               logger ) as any;

        if ( bizDeliveryOrderStatusStepNextInDB ) {

          bizDeliveryOrderStatusStepNextInDB = CommonUtilities.includeObjectFields( bizDeliveryOrderStatusStepNextInDB,
                                                                                    [
                                                                                      "Id",
                                                                                      "Sequence",
                                                                                      "First",
                                                                                      "Last",
                                                                                      "Canceled",
                                                                                      "Code",
                                                                                      "Description",
                                                                                      "BColor",
                                                                                      "FColor",
                                                                                      "Icon"
                                                                                    ],
                                                                                    logger );

        }
        else {

          bizDeliveryOrderStatusStepNextInDB = {
                                                 "Id": null,
                                                 "Sequence": null,
                                                 "First": null,
                                                 "Last": null,
                                                 "Canceled": null,
                                                 "Code": null,
                                                 "Description": null,
                                                 "BColor": null,
                                                 "FColor": null,
                                                 "Icon": null
                                               };

        }

        let bizDeliveryOrderStatusStepInDB = await BIZDeliveryOrderStatusStepService.getDeliveryOrderCurrentStatusStepByKind( bizDeliveryOrderInDB.Kind,
                                                                                                                              bizDeliveryOrderInDB.StatusSequence,
                                                                                                                              currentTransaction,
                                                                                                                              logger ) as any;

        bizDeliveryOrderStatusStepInDB = CommonUtilities.includeObjectFields( bizDeliveryOrderStatusStepInDB,
                                                                              [
                                                                                "Id",
                                                                                "Sequence",
                                                                                "First",
                                                                                "Last",
                                                                                "Canceled",
                                                                                "Code",
                                                                                "Description",
                                                                                "BColor",
                                                                                "FColor",
                                                                                "Icon"
                                                                              ],
                                                                              logger );

          bizDeliveryOrderStatusStepInDB[ "StepNext" ] = bizDeliveryOrderStatusStepNextInDB;
          bizDeliveryOrderStatusStepInDB[ "StepPrevious" ] = bizDeliveryOrderStatusStepPreviousInDB;

          //ANCHOR success user update
          result = {
                     StatusCode: 200, //Ok
                     Code: "SUCCESS_",
                     Message: await I18NManager.translate( strLanguage, "" ),
                     Mark: "4736393C7AC7" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                     LogId: null,
                     IsError: false,
                     Errors: [],
                     Warnings: [],
                     Count: 1,
                     Data: [
                             bizDeliveryOrderStatusStepInDB
                           ]
                   }

          bApplyTransaction = true;

        //}

      }

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        if ( bApplyTransaction ) {

          await currentTransaction.commit();

        }
        else {

          await currentTransaction.rollback();

        }

      }

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.getDeliveryOrderStatus.name;

      const strMark = "FDF3230E7D57" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      result = {
                 StatusCode: 500, //Internal server error
                 Code: "ERROR_UNEXPECTED",
                 Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                 LogId: error.LogId,
                 Mark: strMark,
                 IsError: true,
                 Errors: [
                           {
                             Code: error.name,
                             Message: error.message,
                             Details: await SystemUtilities.processErrorDetails( error ) //error
                           }
                         ],
                 Warnings: [],
                 Count: 0,
                 Data: []
               };

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error ) {

        }

      }

    }

    return result;

  }

  static async updateDeliveryOrderStatusNext( request: Request,
                                              response: Response,
                                              transaction: any,
                                              logger: any ):Promise<any> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    let bApplyTransaction = false;

    let strLanguage = "";

    try {

      const context = ( request as any ).context; //context is injected by MiddlewareManager.middlewareSetContext function

      strLanguage = context.Language;

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      let userSessionStatus = context.UserSessionStatus;

      let bizDeliveryOrderInDB = await BIZDeliveryOrderService.getById( request.body.Id as string,
                                                                        currentTransaction,
                                                                        logger );

      if ( bizDeliveryOrderInDB instanceof Error ) {

        const error = bizDeliveryOrderInDB as any;

        result = {
                   StatusCode: 500, //Internal server error
                   Code: "ERROR_UNEXPECTED",
                   Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                   Mark: "F6C0AC0E4094" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: error.name,
                               Message: error.message,
                               Details: await SystemUtilities.processErrorDetails( error ) //error
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( !bizDeliveryOrderInDB ) {

        result = {
                   StatusCode: 404, //Not found
                   Code: "ERROR_DELIVERY_ORDER_NOT_FOUND",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not found in database.", request.body.EstablishmentId ),
                   Mark: "A9534D816846" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DELIVERY_ORDER_NOT_FOUND",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not found in database.", request.body.EstablishmentId ),
                               Details: ""
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( bizDeliveryOrderInDB.DisabledBy || bizDeliveryOrderInDB.DisabledAt ) {

        result = {
                   StatusCode: 400, //Bad request
                   Code: "ERROR_DELIVERY_ORDER_IS_DISABLED",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Is disabled.", request.body.Id ),
                   Mark: "6161A3EE568A" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DELIVERY_ORDER_IS_DISABLED",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Is disabled.", request.body.Id ),
                               Details: null
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( bizDeliveryOrderInDB.CanceledBy || bizDeliveryOrderInDB.CanceledAt ) {

        result = {
                   StatusCode: 400, //Bad request
                   Code: "ERROR_DELIVERY_ORDER_IS_CANCELED",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Is canceled.", request.body.Id ),
                   Mark: "6917D75B81ED" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DELIVERY_ORDER_IS_CANCELED",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Is canceled.", request.body.Id ),
                               Details: null
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( bizDeliveryOrderInDB.UserId !== userSessionStatus.UserId ) {

        result = {
                   StatusCode: 403, //Fobidden
                   Code: "ERROR_DRIVER_NOT_ASSIGNED_TO_ORDER",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not is not assigned to you.", request.body.Id ),
                   Mark: "1EC383538008" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DRIVER_NOT_ASSIGNED_TO_ORDER",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not is not assigned to you.", request.body.Id ),
                               Details: null
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else {

        let bizDeliveryOrderInProgressList = await BIZDeliveryOrderService.getDeliveryOrdersInProgressStatusByDriverId( userSessionStatus.UserId,
                                                                                                                        currentTransaction,
                                                                                                                        logger );

        if ( bizDeliveryOrderInProgressList instanceof Error ) {

          const error = bizDeliveryOrderInProgressList as any;

          result = {
                     StatusCode: 500, //Internal server error
                     Code: "ERROR_UNEXPECTED",
                     Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                     Mark: "BDA32786A3C8" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                     LogId: null,
                     IsError: true,
                     Errors: [
                               {
                                 Code: error.name,
                                 Message: error.message,
                                 Details: await SystemUtilities.processErrorDetails( error ) //error
                               }
                             ],
                     Warnings: [],
                     Count: 0,
                     Data: []
                   }

        }
        else {

          let bAnotherOrderInProgress = false;

          if ( bizDeliveryOrderInProgressList?.length > 0 ) {

            bAnotherOrderInProgress = true;

            for ( let intIndex = 0; intIndex < bizDeliveryOrderInProgressList.length; intIndex++ ) {

              if ( bizDeliveryOrderInProgressList[ intIndex ].Id === request.body.Id ) {

                bAnotherOrderInProgress = false;
                break;

              }

            }

          }

          if ( bAnotherOrderInProgress ) {

            result = {
                       StatusCode: 400, //Bad request
                       Code: "ERROR_ANOTHER_DELIVERY_ORDER_IN_PROGRESS",
                       Message: await I18NManager.translate( strLanguage, "Another delivery order in progress right now." ),
                       Mark: "6A6D6118BE43" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                       LogId: null,
                       IsError: true,
                       Errors: [
                                 {
                                   Code: "ERROR_ANOTHER_DELIVERY_ORDER_IN_PROGRESS",
                                   Message: await I18NManager.translate( strLanguage, "Another delivery order in progress right now." ),
                                   Details: null
                                 }
                               ],
                       Warnings: [],
                       Count: 0,
                       Data: []
                     }

          }
          else {

            let bizDeliveryOrderStatusStepInDB = await BIZDeliveryOrderStatusStepService.getDeliveryOrderNextStatusStepByKind( bizDeliveryOrderInDB.Kind,
                                                                                                                               bizDeliveryOrderInDB.StatusSequence,
                                                                                                                               currentTransaction,
                                                                                                                               logger );

            if ( bizDeliveryOrderStatusStepInDB instanceof Error ) {

              const error = bizDeliveryOrderStatusStepInDB as any;

              result = {
                         StatusCode: 500, //Internal server error
                         Code: "ERROR_UNEXPECTED",
                         Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                         Mark: "7B0BFF7C6680" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                         LogId: null,
                         IsError: true,
                         Errors: [
                                   {
                                     Code: error.name,
                                     Message: error.message,
                                     Details: await SystemUtilities.processErrorDetails( error ) //error
                                   }
                                 ],
                         Warnings: [],
                         Count: 0,
                         Data: []
                       }

            }
            else if ( !bizDeliveryOrderStatusStepInDB ) {

              result = {
                         StatusCode: 404, //Not found
                         Code: "ERROR_NEXT_STEP_NOT_FOUND",
                         Message: await I18NManager.translate( strLanguage, "The next step to delivery order not found" ),
                         Mark: "F333F5A2F398" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                         LogId: null,
                         IsError: true,
                         Errors: [
                                   {
                                     Code: "ERROR_NEXT_STEP_NOT_FOUND",
                                     Message: await I18NManager.translate( strLanguage, "The next step to delivery order not found" ),
                                     Details: null
                                   }
                                 ],
                         Warnings: [],
                         Count: 0,
                         Data: []
                       }

            }
            else {

              const bizDeliveryOrderStatusInDB = await BIZDeliveryOrderStatusService.createOrUpdate(
                                                                                                     {
                                                                                                       DeliveryOrderId: bizDeliveryOrderInDB.Id,
                                                                                                       Code: bizDeliveryOrderStatusStepInDB.Code,
                                                                                                       Description: bizDeliveryOrderStatusStepInDB.Description,
                                                                                                       Latitude: request.body.Latitude ? request.body.Latitude: null,
                                                                                                       Longitude: request.body.Longitude ? request.body.Longitude: null,
                                                                                                       Tag: "#" + bizDeliveryOrderStatusStepInDB.Description + "#",
                                                                                                       CreatedBy: userSessionStatus.UserName
                                                                                                     },
                                                                                                     false,
                                                                                                     currentTransaction,
                                                                                                     logger
                                                                                                   );

              if ( bizDeliveryOrderStatusInDB instanceof Error ) {

                const error = bizDeliveryOrderStatusInDB as any;

                result = {
                           StatusCode: 500, //Internal server error
                           Code: "ERROR_UNEXPECTED",
                           Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                           Mark: "AC9ED8553A17" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                           LogId: null,
                           IsError: true,
                           Errors: [
                                     {
                                       Code: error.name,
                                       Message: error.message,
                                       Details: await SystemUtilities.processErrorDetails( error ) //error
                                     }
                                   ],
                           Warnings: [],
                           Count: 0,
                           Data: []
                         }

              }
              else if ( !bizDeliveryOrderStatusInDB ) {

                result = {
                           StatusCode: 500, //Internal server error
                           Code: "ERROR_UNEXPECTED",
                           Message: await I18NManager.translate( strLanguage, "Cannot create the next step in delivery order status table" ),
                           Mark: "FF46D171FAF8" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                           LogId: null,
                           IsError: true,
                           Errors: [
                                     {
                                       Code: "ERROR_DELIVERY_ORDER_STATUS_IS_NULL",
                                       Message: await I18NManager.translate( strLanguage, "Cannot create the next step in delivery order status table" ),
                                       Details: "bizDeliveryOrderStatusInDB is null"
                                     }
                                   ],
                           Warnings: [],
                           Count: 0,
                           Data: []
                         }

              }
              else {

                bizDeliveryOrderInDB.StatusCode = bizDeliveryOrderStatusStepInDB.Code;
                bizDeliveryOrderInDB.StatusDescription = bizDeliveryOrderStatusStepInDB.Description;
                bizDeliveryOrderInDB.StatusSequence = bizDeliveryOrderStatusStepInDB.Sequence;
                bizDeliveryOrderInDB.UpdatedBy = userSessionStatus.UserName;
                //bizDeliveryOrderInDB.StatusBColor = bizDeliveryOrderStatusStepInDB.BColor;
                //bizDeliveryOrderInDB.StatusFColor = bizDeliveryOrderStatusStepInDB.FColor;
                //bizDeliveryOrderInDB.StatusIcon = bizDeliveryOrderStatusStepInDB.Icon;

                bizDeliveryOrderInDB = await BIZDeliveryOrderService.createOrUpdate(
                                                                                     ( bizDeliveryOrderInDB as any ).dataValues,
                                                                                     true,
                                                                                     currentTransaction,
                                                                                     logger
                                                                                   );

                if ( bizDeliveryOrderInDB instanceof Error ) {

                  const error = bizDeliveryOrderInDB as any;

                  result = {
                             StatusCode: 500, //Internal server error
                             Code: "ERROR_UNEXPECTED",
                             Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                             Mark: "0B3BE546CFB5" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                             LogId: null,
                             IsError: true,
                             Errors: [
                                       {
                                         Code: error.name,
                                         Message: error.message,
                                         Details: await SystemUtilities.processErrorDetails( error ) //error
                                       }
                                     ],
                             Warnings: [],
                             Count: 0,
                             Data: []
                           }

                }
                else if ( !bizDeliveryOrderInDB ) {

                  result = {
                             StatusCode: 500, //Internal server error
                             Code: "ERROR_UNEXPECTED",
                             Message: await I18NManager.translate( strLanguage, "Cannot update the delivery order status fields" ),
                             Mark: "B9D3BA67B4C9" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                             LogId: null,
                             IsError: true,
                             Errors: [
                                       {
                                         Code: "ERROR_DELIVERY_ORDER_STATUS_IS_NULL",
                                         Message: await I18NManager.translate( strLanguage, "Cannot update the delivery order status fields" ),
                                         Details: "bizDeliveryOrderInDB is null"
                                       }
                                     ],
                             Warnings: [],
                             Count: 0,
                             Data: []
                           }

                }
                else {

                  const strTag = bizDeliveryOrderStatusStepInDB.Tag;
                  const extraDataPrivate = bizDeliveryOrderStatusStepInDB.ExtraData ? JSON.parse( bizDeliveryOrderStatusStepInDB.ExtraData )?.Private: null;

                  bizDeliveryOrderStatusStepInDB = CommonUtilities.includeObjectFields( bizDeliveryOrderStatusStepInDB,
                                                                                        [
                                                                                          "Id",
                                                                                          "Sequence",
                                                                                          "First",
                                                                                          "Last",
                                                                                          "Canceled",
                                                                                          "Code",
                                                                                          "Description",
                                                                                          "BColor",
                                                                                          "FColor",
                                                                                          "Icon"
                                                                                        ],
                                                                                        logger );

                  let bizDeliveryOrderStatusStepNextInDB = await BIZDeliveryOrderStatusStepService.getDeliveryOrderNextStatusStepByKind( bizDeliveryOrderInDB.Kind,
                                                                                                                                         bizDeliveryOrderInDB.StatusSequence,
                                                                                                                                         currentTransaction,
                                                                                                                                         logger ) as any;

                  if ( bizDeliveryOrderStatusStepNextInDB ) {

                    bizDeliveryOrderStatusStepNextInDB = CommonUtilities.includeObjectFields( bizDeliveryOrderStatusStepNextInDB,
                                                                                              [
                                                                                                "Id",
                                                                                                "Sequence",
                                                                                                "First",
                                                                                                "Last",
                                                                                                "Canceled",
                                                                                                "Code",
                                                                                                "Description",
                                                                                                "BColor",
                                                                                                "FColor",
                                                                                                "Icon"
                                                                                              ],
                                                                                              logger );

                  }
                  else {

                    bizDeliveryOrderStatusStepNextInDB = {
                                                           "Id": null,
                                                           "Sequence": null,
                                                           "First": null,
                                                           "Last": null,
                                                           "Canceled": null,
                                                           "Code": null,
                                                           "Description": null,
                                                           "BColor": null,
                                                           "FColor": null,
                                                           "Icon": null
                                                         };

                  }

                  let modelData = ( bizDeliveryOrderStatusInDB as any ).dataValues;

                  let tempModelData = await BIZDeliveryOrderStatusStep.convertFieldValues(
                                                                                           {
                                                                                             Data: modelData,
                                                                                             FilterFields: 1,
                                                                                             TimeZoneId: context.TimeZoneId,
                                                                                             Include: null,
                                                                                                      /*
                                                                                                      [
                                                                                                        {
                                                                                                          model: BIZDriverRoute,
                                                                                                        },
                                                                                                        {
                                                                                                          model: BIZOrigin,
                                                                                                        },
                                                                                                        {
                                                                                                          model: BIZDestination,
                                                                                                        },
                                                                                                        {
                                                                                                          model: SYSUser,
                                                                                                        }
                                                                                                      ],
                                                                                                      */
                                                                                             Exclude: null,
                                                                                                       /*
                                                                                                       [
                                                                                                         {
                                                                                                           model: SYSUser
                                                                                                         }
                                                                                                       ],
                                                                                                       */
                                                                                             IncludeFields: null,
                                                                                             Logger: logger,
                                                                                             ExtraInfo: {
                                                                                                          Request: request,
                                                                                                        }
                                                                                           }
                                                                                         );

                  if ( tempModelData ) {

                    modelData = tempModelData;

                    modelData[ "StepCurrent" ] = bizDeliveryOrderStatusStepInDB;
                    modelData[ "StepNext" ] = bizDeliveryOrderStatusStepNextInDB;

                  }

                  //ANCHOR success user update
                  result = {
                             StatusCode: 200, //Ok
                             Code: "SUCCESS_UPDATE_STATUS_DELIVERY_ORDER",
                             Message: await I18NManager.translate( strLanguage, "" ),
                             Mark: "95B95F628A81" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                             LogId: null,
                             IsError: false,
                             Errors: [],
                             Warnings: [],
                             Count: 1,
                             Data: [
                                     modelData
                                   ]
                           }

                  bApplyTransaction = true;

                  if ( strTag?.includes( "#Notify_To_Customer_SMS#" ) &&
                       extraDataPrivate?.Customer?.Message ) {

                    let strMessageToSendToCustomer = I18NManager.translateSync( strLanguage,
                                                                                extraDataPrivate?.Customer?.Message );

                    strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Establishment_Name_@", bizDeliveryOrderInDB.bizOrigin.Name );
                    strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Delivery_Address_@", bizDeliveryOrderInDB.bizDestination.Address );

                    strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Driver_Name_@", userSessionStatus.FirstName + " " + userSessionStatus.LastName );
                    strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Driver_Phone_@", userSessionStatus.Phone );

                    if ( strMessageToSendToCustomer.includes( "@_Delivery_Time_@" ) ||
                         strMessageToSendToCustomer.includes( "@_Delivery_Distance_@" ) ) {

                      if ( ( request.body.Latitude &&
                             request.body.Longitude ) ||
                             process.env.ENV === "dev" ) {

                        const bizDriverInDeliveryZoneInDB = await BIZDriverInDeliveryZoneService.getCurrentDeliveryZoneOfDriverAtDate( userSessionStatus.UserId,
                                                                                                                                       null, //By default use the current date in the server
                                                                                                                                       currentTransaction,
                                                                                                                                       logger );

                        const distanceInfo = await GeoMapManager.calcDistanceAndTimeUsingLatAndLng(
                                                                                                    !bizDriverInDeliveryZoneInDB || bizDriverInDeliveryZoneInDB?.bizDeliveryZone?.DistanceUnit === 0? "imperial": "metric",
                                                                                                    {
                                                                                                      latitude: request.body.Latitude ? request.body.Latitude: bizDeliveryOrderInDB.bizOrigin.Latitude,
                                                                                                      longitude: request.body.Longitude ? request.body.Longitude: bizDeliveryOrderInDB.bizOrigin.Longitude
                                                                                                    },
                                                                                                    [
                                                                                                      {
                                                                                                        latitude: bizDeliveryOrderInDB.bizDestination.Latitude,
                                                                                                        longitude: bizDeliveryOrderInDB.bizDestination.Longitude
                                                                                                      }
                                                                                                    ],
                                                                                                    true,
                                                                                                    logger
                                                                                                  );

                        if ( distanceInfo[ 0 ].status === "OK" ) {

                          strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Delivery_Distance_@", distanceInfo[ 0 ].distance.text );
                          strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Delivery_Time_@", distanceInfo[ 0 ].duration.text );

                        }
                        else {

                          strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Delivery_Distance_@", "Unknown" );
                          strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Delivery_Time_@", "Unknown" );

                        }

                      }
                      else {

                        strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Delivery_Time_@", "Unknown" );
                        strMessageToSendToCustomer = strMessageToSendToCustomer.replace( "@_Delivery_Distance_@", "Unknown" );

                      }

                    }

                    if ( strMessageToSendToCustomer ) {

                      const bResult = await NotificationManager.send(
                                                                      "sms",
                                                                      {
                                                                        to: bizDeliveryOrderInDB.bizDestination.Phone,
                                                                        body: {
                                                                                text: strMessageToSendToCustomer
                                                                              },
                                                                        foreign_data: JSON.stringify(
                                                                                                      {
                                                                                                        user: userSessionStatus.UserName
                                                                                                      }
                                                                                                    )
                                                                      },
                                                                      logger
                                                                    );

                      if ( !bResult ) {

                        const strMark = "7B82DD509E68" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

                        const debugMark = debug.extend( strMark );
                        debugMark( "WARNING: failed to send SMS notification to the customer to phone [%s]", bizDeliveryOrderInDB.bizDestination.Phone );

                      }

                    }

                  }

                }

              }

            }

          }

        }

      }

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        if ( bApplyTransaction ) {

          await currentTransaction.commit();

        }
        else {

          await currentTransaction.rollback();

        }

      }

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.updateDeliveryOrderStatusNext.name;

      const strMark = "134090C1AB63" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      result = {
                 StatusCode: 500, //Internal server error
                 Code: "ERROR_UNEXPECTED",
                 Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                 LogId: error.LogId,
                 Mark: strMark,
                 IsError: true,
                 Errors: [
                           {
                             Code: error.name,
                             Message: error.message,
                             Details: await SystemUtilities.processErrorDetails( error ) //error
                           }
                         ],
                 Warnings: [],
                 Count: 0,
                 Data: []
               };

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error ) {

        }

      }

    }

    return result;

  }

  static async updateDeliveryOrderStatusPrevious( request: Request,
                                                  response: Response,
                                                  transaction: any,
                                                  logger: any ):Promise<any> {

    let result = null;

    let currentTransaction = transaction;

    let bIsLocalTransaction = false;

    let bApplyTransaction = false;

    let strLanguage = "";

    try {

      const context = ( request as any ).context; //context is injected by MiddlewareManager.middlewareSetContext function

      strLanguage = context.Language;

      const dbConnection = DBConnectionManager.getDBConnection( "master" );

      if ( currentTransaction === null ) {

        currentTransaction = await dbConnection.transaction();

        bIsLocalTransaction = true;

      }

      let userSessionStatus = context.UserSessionStatus;

      let bizDeliveryOrderInDB = await BIZDeliveryOrderService.getById( request.body.Id as string,
                                                                        currentTransaction,
                                                                        logger );

      if ( bizDeliveryOrderInDB instanceof Error ) {

        const error = bizDeliveryOrderInDB as any;

        result = {
                   StatusCode: 500, //Internal server error
                   Code: "ERROR_UNEXPECTED",
                   Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                   Mark: "293D8766E811" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: error.name,
                               Message: error.message,
                               Details: await SystemUtilities.processErrorDetails( error ) //error
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( !bizDeliveryOrderInDB ) {

        result = {
                   StatusCode: 404, //Not found
                   Code: "ERROR_DELIVERY_ORDER_NOT_FOUND",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not found in database.", request.body.EstablishmentId ),
                   Mark: "06ED5C590A3F" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DELIVERY_ORDER_NOT_FOUND",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not found in database.", request.body.EstablishmentId ),
                               Details: ""
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( bizDeliveryOrderInDB.DisabledBy || bizDeliveryOrderInDB.DisabledAt ) {

        result = {
                   StatusCode: 400, //Bad request
                   Code: "ERROR_DELIVERY_ORDER_IS_DISABLED",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Is disabled.", request.body.Id ),
                   Mark: "B2A6643D342D" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DELIVERY_ORDER_IS_DISABLED",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Is disabled.", request.body.Id ),
                               Details: null
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( bizDeliveryOrderInDB.CanceledBy || bizDeliveryOrderInDB.CanceledAt ) {

        result = {
                   StatusCode: 400, //Bad request
                   Code: "ERROR_DELIVERY_ORDER_IS_CANCELED",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Is canceled.", request.body.Id ),
                   Mark: "D7CAA9C5854E" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DELIVERY_ORDER_IS_CANCELED",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Is canceled.", request.body.Id ),
                               Details: null
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else if ( bizDeliveryOrderInDB.UserId !== userSessionStatus.UserId ) {

        result = {
                   StatusCode: 403, //Fobidden
                   Code: "ERROR_DRIVER_NOT_ASSIGNED_TO_ORDER",
                   Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not is not assigned to you.", request.body.Id ),
                   Mark: "BE929C7CF700" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                   LogId: null,
                   IsError: true,
                   Errors: [
                             {
                               Code: "ERROR_DRIVER_NOT_ASSIGNED_TO_ORDER",
                               Message: await I18NManager.translate( strLanguage, "The delivery order with id %s. Not is not assigned to you.", request.body.Id ),
                               Details: null
                             }
                           ],
                   Warnings: [],
                   Count: 0,
                   Data: []
                 }

      }
      else {

        let bizDeliveryOrderInProgressList = await BIZDeliveryOrderService.getDeliveryOrdersInProgressStatusByDriverId( userSessionStatus.UserId,
                                                                                                                        currentTransaction,
                                                                                                                        logger );

        if ( bizDeliveryOrderInProgressList instanceof Error ) {

          const error = bizDeliveryOrderInProgressList as any;

          result = {
                     StatusCode: 500, //Internal server error
                     Code: "ERROR_UNEXPECTED",
                     Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                     Mark: "3B85933B2793" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                     LogId: null,
                     IsError: true,
                     Errors: [
                               {
                                 Code: error.name,
                                 Message: error.message,
                                 Details: await SystemUtilities.processErrorDetails( error ) //error
                               }
                             ],
                     Warnings: [],
                     Count: 0,
                     Data: []
                   }

        }
        else {

          let bAnotherOrderInProgress = false;

          if ( bizDeliveryOrderInProgressList?.length > 0 ) {

            bAnotherOrderInProgress = true;

            for ( let intIndex = 0; intIndex < bizDeliveryOrderInProgressList.length; intIndex++ ) {

              if ( bizDeliveryOrderInProgressList[ intIndex ].Id === request.body.Id ) {

                bAnotherOrderInProgress = false;
                break;

              }

            }

          }

          if ( bAnotherOrderInProgress ) {

            result = {
                       StatusCode: 400, //Bad request
                       Code: "ERROR_ANOTHER_DELIVERY_ORDER_IN_PROGRESS",
                       Message: await I18NManager.translate( strLanguage, "Another delivery order in progress right now." ),
                       Mark: "3A9041799065" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                       LogId: null,
                       IsError: true,
                       Errors: [
                                 {
                                   Code: "ERROR_ANOTHER_DELIVERY_ORDER_IN_PROGRESS",
                                   Message: await I18NManager.translate( strLanguage, "Another delivery order in progress right now." ),
                                   Details: null
                                 }
                               ],
                       Warnings: [],
                       Count: 0,
                       Data: []
                     }

          }
          else {

            let bizDeliveryOrderStatusStepInDB = await BIZDeliveryOrderStatusStepService.getDeliveryOrderPreviousStatusStepByKind( bizDeliveryOrderInDB.Kind,
                                                                                                                                   bizDeliveryOrderInDB.StatusSequence,
                                                                                                                                   currentTransaction,
                                                                                                                                   logger );

            if ( bizDeliveryOrderStatusStepInDB instanceof Error ) {

              const error = bizDeliveryOrderStatusStepInDB as any;

              result = {
                         StatusCode: 500, //Internal server error
                         Code: "ERROR_UNEXPECTED",
                         Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                         Mark: "7BED34C356CA" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                         LogId: null,
                         IsError: true,
                         Errors: [
                                   {
                                     Code: error.name,
                                     Message: error.message,
                                     Details: await SystemUtilities.processErrorDetails( error ) //error
                                   }
                                 ],
                         Warnings: [],
                         Count: 0,
                         Data: []
                       }

            }
            else if ( !bizDeliveryOrderStatusStepInDB ) {

              result = {
                         StatusCode: 404, //Not found
                         Code: "ERROR_PREVIOUS_STEP_NOT_FOUND",
                         Message: await I18NManager.translate( strLanguage, "The previous step to delivery order not found" ),
                         Mark: "5A5CFFB2D218" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                         LogId: null,
                         IsError: true,
                         Errors: [
                                   {
                                     Code: "ERROR_PREVIOUS_STEP_NOT_FOUND",
                                     Message: await I18NManager.translate( strLanguage, "The previous step to delivery order not found" ),
                                     Details: null
                                   }
                                 ],
                         Warnings: [],
                         Count: 0,
                         Data: []
                       }

            }
            else {

              const bizDeliveryOrderStatusInDB = await BIZDeliveryOrderStatusService.createOrUpdate(
                                                                                                     {
                                                                                                       DeliveryOrderId: bizDeliveryOrderInDB.Id,
                                                                                                       Code: bizDeliveryOrderStatusStepInDB.Code,
                                                                                                       Description: bizDeliveryOrderStatusStepInDB.Description,
                                                                                                       Latitude: request.body.Latitude ? request.body.Latitude: null,
                                                                                                       Longitude: request.body.Longitude ? request.body.Longitude: null,
                                                                                                       Tag: "#" + bizDeliveryOrderStatusStepInDB.Description + "#",
                                                                                                       CreatedBy: userSessionStatus.UserName
                                                                                                     },
                                                                                                     false,
                                                                                                     currentTransaction,
                                                                                                     logger
                                                                                                   );

              if ( bizDeliveryOrderStatusInDB instanceof Error ) {

                const error = bizDeliveryOrderStatusInDB as any;

                result = {
                           StatusCode: 500, //Internal server error
                           Code: "ERROR_UNEXPECTED",
                           Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                           Mark: "D8DCFEFFE398" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                           LogId: null,
                           IsError: true,
                           Errors: [
                                     {
                                       Code: error.name,
                                       Message: error.message,
                                       Details: await SystemUtilities.processErrorDetails( error ) //error
                                     }
                                   ],
                           Warnings: [],
                           Count: 0,
                           Data: []
                         }

              }
              else if ( !bizDeliveryOrderStatusInDB ) {

                result = {
                           StatusCode: 500, //Internal server error
                           Code: "ERROR_UNEXPECTED",
                           Message: await I18NManager.translate( strLanguage, "Cannot create the next step in delivery order status table" ),
                           Mark: "724889E16A78" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                           LogId: null,
                           IsError: true,
                           Errors: [
                                     {
                                       Code: "ERROR_DELIVERY_ORDER_STATUS_IS_NULL",
                                       Message: await I18NManager.translate( strLanguage, "Cannot create the next step in delivery order status table" ),
                                       Details: "bizDeliveryOrderStatusInDB is null"
                                     }
                                   ],
                           Warnings: [],
                           Count: 0,
                           Data: []
                         }

              }
              else {

                bizDeliveryOrderInDB.StatusCode = bizDeliveryOrderStatusStepInDB.Code;
                bizDeliveryOrderInDB.StatusDescription = bizDeliveryOrderStatusStepInDB.Description;
                bizDeliveryOrderInDB.StatusSequence = bizDeliveryOrderStatusStepInDB.Sequence;
                bizDeliveryOrderInDB.UpdatedBy = userSessionStatus.UserName;
                //bizDeliveryOrderInDB.StatusBColor = bizDeliveryOrderStatusStepInDB.BColor;
                //bizDeliveryOrderInDB.StatusFColor = bizDeliveryOrderStatusStepInDB.FColor;
                //bizDeliveryOrderInDB.StatusIcon = bizDeliveryOrderStatusStepInDB.Icon;

                bizDeliveryOrderInDB = await BIZDeliveryOrderService.createOrUpdate(
                                                                                     ( bizDeliveryOrderInDB as any ).dataValues,
                                                                                     true,
                                                                                     currentTransaction,
                                                                                     logger
                                                                                   );

                if ( bizDeliveryOrderInDB instanceof Error ) {

                  const error = bizDeliveryOrderInDB as any;

                  result = {
                             StatusCode: 500, //Internal server error
                             Code: "ERROR_UNEXPECTED",
                             Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                             Mark: "0C8BF18351B7" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                             LogId: null,
                             IsError: true,
                             Errors: [
                                       {
                                         Code: error.name,
                                         Message: error.message,
                                         Details: await SystemUtilities.processErrorDetails( error ) //error
                                       }
                                     ],
                             Warnings: [],
                             Count: 0,
                             Data: []
                           }

                }
                else if ( !bizDeliveryOrderInDB ) {

                  result = {
                             StatusCode: 500, //Internal server error
                             Code: "ERROR_UNEXPECTED",
                             Message: await I18NManager.translate( strLanguage, "Cannot update the delivery order status fields" ),
                             Mark: "122595104B86" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                             LogId: null,
                             IsError: true,
                             Errors: [
                                       {
                                         Code: "ERROR_DELIVERY_ORDER_STATUS_IS_NULL",
                                         Message: await I18NManager.translate( strLanguage, "Cannot update the delivery order status fields" ),
                                         Details: "bizDeliveryOrderInDB is null"
                                       }
                                     ],
                             Warnings: [],
                             Count: 0,
                             Data: []
                           }

                }
                else {

                  bizDeliveryOrderStatusStepInDB = CommonUtilities.includeObjectFields( bizDeliveryOrderStatusStepInDB,
                                                                                        [
                                                                                          "Id",
                                                                                          "Sequence",
                                                                                          "First",
                                                                                          "Last",
                                                                                          "Canceled",
                                                                                          "Code",
                                                                                          "Description",
                                                                                          "BColor",
                                                                                          "FColor",
                                                                                          "Icon"
                                                                                        ],
                                                                                        logger );

                  let bizDeliveryOrderStatusStepPreviousInDB = await BIZDeliveryOrderStatusStepService.getDeliveryOrderPreviousStatusStepByKind( bizDeliveryOrderInDB.Kind,
                                                                                                                                                 bizDeliveryOrderInDB.StatusSequence,
                                                                                                                                                 currentTransaction,
                                                                                                                                                 logger ) as any;

                  if ( bizDeliveryOrderStatusStepPreviousInDB ) {

                    bizDeliveryOrderStatusStepPreviousInDB = CommonUtilities.includeObjectFields( bizDeliveryOrderStatusStepPreviousInDB,
                                                                                                  [
                                                                                                    "Id",
                                                                                                    "Sequence",
                                                                                                    "First",
                                                                                                    "Last",
                                                                                                    "Canceled",
                                                                                                    "Code",
                                                                                                    "Description",
                                                                                                    "BColor",
                                                                                                    "FColor",
                                                                                                    "Icon"
                                                                                                  ],
                                                                                                  logger );

                  }
                  else {

                    bizDeliveryOrderStatusStepPreviousInDB = {
                                                               "Id": null,
                                                               "Sequence": null,
                                                               "First": null,
                                                               "Last": null,
                                                               "Canceled": null,
                                                               "Code": null,
                                                               "Description": null,
                                                               "BColor": null,
                                                               "FColor": null,
                                                               "Icon": null
                                                             };

                  }

                  let modelData = ( bizDeliveryOrderStatusInDB as any ).dataValues;

                  let tempModelData = await BIZDeliveryOrderStatusStep.convertFieldValues(
                                                                                           {
                                                                                             Data: modelData,
                                                                                             FilterFields: 1,
                                                                                             TimeZoneId: context.TimeZoneId,
                                                                                             Include: null,
                                                                                                      /*
                                                                                                      [
                                                                                                        {
                                                                                                          model: BIZDriverRoute,
                                                                                                        },
                                                                                                        {
                                                                                                          model: BIZOrigin,
                                                                                                        },
                                                                                                        {
                                                                                                          model: BIZDestination,
                                                                                                        },
                                                                                                        {
                                                                                                          model: SYSUser,
                                                                                                        }
                                                                                                      ],
                                                                                                      */
                                                                                             Exclude: null,
                                                                                                       /*
                                                                                                       [
                                                                                                         {
                                                                                                           model: SYSUser
                                                                                                         }
                                                                                                       ],
                                                                                                       */
                                                                                             IncludeFields: null,
                                                                                             Logger: logger,
                                                                                             ExtraInfo: {
                                                                                                          Request: request,
                                                                                                        }
                                                                                           }
                                                                                         );

                  if ( tempModelData ) {

                    modelData = tempModelData;

                    modelData[ "StepCurrent" ] = bizDeliveryOrderStatusStepInDB;
                    modelData[ "StepPrevious" ] = bizDeliveryOrderStatusStepPreviousInDB;

                  }

                  //ANCHOR success user update
                  result = {
                             StatusCode: 200, //Ok
                             Code: "SUCCESS_UPDATE_STATUS_DELIVERY_ORDER",
                             Message: await I18NManager.translate( strLanguage, "" ),
                             Mark: "57637587D6E9" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" ),
                             LogId: null,
                             IsError: false,
                             Errors: [],
                             Warnings: [],
                             Count: 1,
                             Data: [
                                     modelData
                                   ]
                           }

                  bApplyTransaction = true;

                }

              }

            }

          }

        }

      }

      if ( currentTransaction !== null &&
           currentTransaction.finished !== "rollback" &&
           bIsLocalTransaction ) {

        if ( bApplyTransaction ) {

          await currentTransaction.commit();

        }
        else {

          await currentTransaction.rollback();

        }

      }

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = this.name + "." + this.updateDeliveryOrderStatusPrevious.name;

      const strMark = "E63937F552B9" + ( cluster.worker && cluster.worker.id ? "-" + cluster.worker.id : "" );

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

      result = {
                 StatusCode: 500, //Internal server error
                 Code: "ERROR_UNEXPECTED",
                 Message: await I18NManager.translate( strLanguage, "Unexpected error. Please read the server log for more details." ),
                 LogId: error.LogId,
                 Mark: strMark,
                 IsError: true,
                 Errors: [
                           {
                             Code: error.name,
                             Message: error.message,
                             Details: await SystemUtilities.processErrorDetails( error ) //error
                           }
                         ],
                 Warnings: [],
                 Count: 0,
                 Data: []
               };

      if ( currentTransaction !== null &&
           bIsLocalTransaction ) {

        try {

          await currentTransaction.rollback();

        }
        catch ( error ) {

        }

      }

    }

    return result;

  }

}
