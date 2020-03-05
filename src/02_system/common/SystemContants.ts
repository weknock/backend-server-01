
export interface ICheckUserRoles {

  isAuthorizedAdmin: boolean,
  isAuthorizedL01: boolean,
  isAuthorizedL02: boolean,
  isAuthorizedL03: boolean,
  isNotAuthorized: boolean

}

export default class SystemConstants {

  static readonly _GROUP_SYSTEM_ADMINISTRATORS_NAME = "System_Administrators";
  static readonly _GROUP_BUSINESS_MANAGERS_NAME = "Business_Managers";

  static readonly _USER_BACKEND_SYSTEM_NET_NAME = "backend@system.net";
  static readonly _USER_UNKNOWN_SYSTEM_NET_NAME = "unknown@system.net";

  static readonly _CREATED_BY_BACKEND_SYSTEM_NET = SystemConstants._USER_BACKEND_SYSTEM_NET_NAME;
  static readonly _UPDATED_BY_BACKEND_SYSTEM_NET = SystemConstants._USER_BACKEND_SYSTEM_NET_NAME;
  static readonly _DISABLED_BY_BACKEND_SYSTEM_NET = SystemConstants._USER_BACKEND_SYSTEM_NET_NAME;
  static readonly _CREATED_BY_UNKNOWN_SYSTEM_NET = SystemConstants._USER_UNKNOWN_SYSTEM_NET_NAME;
  static readonly _UPDATED_BY_UNKNOWN_SYSTEM_NET = SystemConstants._USER_UNKNOWN_SYSTEM_NET_NAME;
  static readonly _DISABLED_BY_UNKNOWN_SYSTEM_NET = SystemConstants._USER_UNKNOWN_SYSTEM_NET_NAME;

  static readonly _VALUE_ANY = "*";

  static readonly _LOCK_RESOURCE_START = "startLock:689d7b6b";
  static readonly _LOCK_RESOURCE_UPDATE_SESSION_STATUS = "sessionStatus:8f0468c6:";
  static readonly _LOCK_RESOURCE_UPDATE_ROLES_OF_ROUTE = "rolesOfRoute:17def5ee:";
 
  //Group System Administrators
  static readonly _GROUP_SYSTEM_ADMINISTRATORS = {
                                                   Id: "c4d61857-482f-40a0-bcec-93206091d37f",
                                                   Name: SystemConstants._GROUP_SYSTEM_ADMINISTRATORS_NAME,
                                                   Comment: "Default system administrators group",
                                                   Role: "#Administrator#",
                                                   CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                 };
  //Group Business Managers
  static readonly _GROUP_BUSINESS_MANAGERS = {
                                               Id : "b385be19-23f7-4931-b1e4-875c218bd732",
                                               Name: SystemConstants._GROUP_BUSINESS_MANAGERS_NAME,
                                               Comment: "Default business manager group",
                                               Role: "#Business_Manager#",
                                               CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                             };

  static readonly _USER_GROUPS = [
                                   SystemConstants._GROUP_SYSTEM_ADMINISTRATORS,
                                   SystemConstants._GROUP_BUSINESS_MANAGERS,
                                 ];

  //Users of the group Systems.Administrators
  static readonly _USER_SYSTEM_ADMINISTRATOR_01 = {
                                                    Id: "508a78a2-7906-4cb2-93ad-a7b0a80aa9a6",
                                                    GroupId: "c4d61857-482f-40a0-bcec-93206091d37f",
                                                    Name: "admin01@system.net",
                                                    Password: "admin1.123456.",
                                                    Comment: "Default system administrator user 01",
                                                    CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                  };

  static readonly _USER_SYSTEM_ADMINISTRATOR_02 = {
                                                    Id: "3d4cbe85-b41e-495b-8517-8fb5300f5d90",
                                                    GroupId: "c4d61857-482f-40a0-bcec-93206091d37f",
                                                    Name: "admin02@system.net",
                                                    Password: "admin2.123456.",
                                                    Comment: "Default system administrator user 02",
                                                    CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                  }

  static readonly _USER_SYSTEM_ADMINISTRATOR_03 = {
                                                    Id: "dee276f8-1a70-43f0-8879-0ab3907c5782",
                                                    GroupId: "c4d61857-482f-40a0-bcec-93206091d37f",
                                                    Name: "admin03@system.net",
                                                    Password: "admin3.123456.",
                                                    Comment: "Default system administrator user 03",
                                                    CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                  };

  static readonly _USER_SYSTEM_ADMINISTRATOR_04 = {
                                                    Id: "fa78bdd3-d024-4afe-a8c0-e3cd4428ff7e",
                                                    GroupId: "c4d61857-482f-40a0-bcec-93206091d37f",
                                                    Name: "admin04@system.net",
                                                    Password: "admin4.123456.",
                                                    Comment: "Default system administrator user 04",
                                                    CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                  };

  static readonly _USER_SYSTEM_ADMINISTRATOR_05 = {
                                                    Id: "50bdf5a6-8a70-4871-a952-d8ab42ca5759",
                                                    GroupId: "c4d61857-482f-40a0-bcec-93206091d37f",
                                                    Name: "admin05@system.net",
                                                    Password: "admin5.123456.",
                                                    Comment: "Default system administrator user 05",
                                                    CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                  };

  //Users of the group Business.Managers
  static readonly _USER_BUSINESS_MANAGER_01 = {
                                                Id: "092be78e-d953-441e-83e0-aca6bf200bba",
                                                GroupId: "b385be19-23f7-4931-b1e4-875c218bd732",
                                                Name: "bmanager01@system.net",
                                                Password: "bmanager1.123456.",
                                                Comment: "Default business manager user 01",
                                                CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                              };

  static readonly _USER_BUSINESS_MANAGER_02 = {
                                                Id: "12b1ec2c-eb97-48f6-bcdc-9b9555df8dbb",
                                                GroupId: "b385be19-23f7-4931-b1e4-875c218bd732",
                                                Name: "bmanager02@system.net",
                                                Password: "bmanager2.123456.",
                                                Comment: "Default business manager user 02",
                                                CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                              };

  static readonly _USER_BUSINESS_MANAGER_03 = {
                                                Id: "cadf8963-e978-4b70-a314-362bd4d0e9c5",
                                                GroupId: "b385be19-23f7-4931-b1e4-875c218bd732",
                                                Name: "bmanager03@system.net",
                                                Password: "bmanager3.123456.",
                                                Comment: "Default business manager user 03",
                                                CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                              }

  static readonly _USER_BUSINESS_MANAGER_04 = {
                                                Id: "c5be3916-5fc2-4d75-82aa-f6fe55e3d863",
                                                GroupId: "b385be19-23f7-4931-b1e4-875c218bd732",
                                                Name: "bmanager04@system.net",
                                                Password: "bmanager4.123456.",
                                                Comment: "Default business manager user 04",
                                                CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                              }

  static readonly _USER_BUSINESS_MANAGER_05 = {
                                                Id: "32f333dd-c960-44a7-b34e-b484147a9501",
                                                GroupId: "b385be19-23f7-4931-b1e4-875c218bd732",
                                                Name: "bmanager05@system.net",
                                                Password: "bmanager5.123456.",
                                                Comment: "Default business manager user 05",
                                                CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                              };

  static readonly _USERS = [
                              SystemConstants._USER_SYSTEM_ADMINISTRATOR_01,
                              SystemConstants._USER_SYSTEM_ADMINISTRATOR_02,
                              SystemConstants._USER_SYSTEM_ADMINISTRATOR_03,
                              SystemConstants._USER_SYSTEM_ADMINISTRATOR_04,
                              SystemConstants._USER_SYSTEM_ADMINISTRATOR_05,
                              SystemConstants._USER_BUSINESS_MANAGER_01,
                              SystemConstants._USER_BUSINESS_MANAGER_02,
                              SystemConstants._USER_BUSINESS_MANAGER_03,
                              SystemConstants._USER_BUSINESS_MANAGER_04,
                              SystemConstants._USER_BUSINESS_MANAGER_05,
                           ];

  static readonly _CONFIG_ENTRY_ExpireTimeAuthentication_SCHEMA = JSON.stringify(
                                                                                  {
                                                                                    "$schema": "http://json-schema.org/draft-07/schema#",
                                                                                    "type": "object",
                                                                                    "additionalProperties":false,
                                                                                    "required": [
                                                                                      "@__default__@"
                                                                                    ],
                                                                                    "patternProperties": {
                                                                                      "@__default__@": {
                                                                                        "$ref": "#/definitions/validatonDef",
                                                                                        "optional":false
                                                                                      },
                                                                                      "#.*#": {
                                                                                        "$ref": "#/definitions/validationDef",
                                                                                        "optional":false
                                                                                      }
                                                                                    },
                                                                                    "definitions": {
                                                                                      "validationDef": {
                                                                                        "type": "object",
                                                                                        "required": [ "on", "kind" ],
                                                                                        "additionalProperties": false,
                                                                                        "properties": {
                                                                                          "on": {
                                                                                            "type": "number",
                                                                                            "minimum": 1,
                                                                                            "maximum": 999999999
                                                                                          },
                                                                                          "kind": {
                                                                                            "type": "number",
                                                                                            "minimum": 0,
                                                                                            "maximum": 1
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                );

  static readonly _CONFIG_ENTRY_ExpireTimeAuthentication = {
                                                             Id: "9272d39a-4545-40e2-802f-5913998cbb20",
                                                             Scope: "system",
                                                             Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                             Category: "Authentication",
                                                             Name: "system.authentication.ExpireTimeAuthentication",
                                                             Default: JSON.stringify(
                                                                                      {
                                                                                        "@__default__@": {
                                                                                          "kind": 0,
                                                                                          "on": 30
                                                                                        }
                                                                                      }
                                                                                    ),
                                                             Label: "Control the SecurityTokenId expire time by groups or users",
                                                             Description: "Control the Authentication token expire time in minutes by specific groups or users",
                                                             AllowTagAccessR: "#Administrator#",
                                                             AllowTagAccessW: "#Administrator#",
                                                             Example: JSON.stringify(
                                                                                      {
                                                                                        "@__default__@": {
                                                                                          "kind": 0,
                                                                                          "on": 30
                                                                                        },
                                                                                        "#GroupName#": {
                                                                                          "kind": 1,
                                                                                          "on": 2880
                                                                                        },
                                                                                        "#GroupId#": {
                                                                                          "kind": 1,
                                                                                          "on": 28
                                                                                        }
                                                                                      }
                                                                                    ),
                                                             CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                             ExtraData: `{ "Type": "struct/json", "Schema": ${SystemConstants._CONFIG_ENTRY_ExpireTimeAuthentication_SCHEMA} }`
                                                           };

  static readonly _CONFIG_ENTRY_PasswordStrengthParameters_SCHEMA = JSON.stringify(
                                                                                    {
                                                                                      "$schema":"http://json-schema.org/draft-07/schema#",
                                                                                      "type":"object",
                                                                                      "additionalProperties":false,
                                                                                      "required": [
                                                                                        "@__default__@"
                                                                                      ],
                                                                                      "patternProperties":{
                                                                                          "@__default__@": {
                                                                                            "$ref": "#/definitions/validatonDef",
                                                                                            "optional":false
                                                                                          },
                                                                                          "#.*#":{
                                                                                            "$ref":"#/definitions/validationDef",
                                                                                            "optional":false
                                                                                          }
                                                                                      },
                                                                                      "definitions":{
                                                                                        "validationDef":{
                                                                                          "type":"object",
                                                                                          "required":[
                                                                                            "minLength",
                                                                                            "maxLength",
                                                                                            "minLowerCase",
                                                                                            "minUpperCase",
                                                                                            "maxUpperCase",
                                                                                            "minDigit",
                                                                                            "minSymbol",
                                                                                            "maxSymbol"
                                                                                          ],
                                                                                          "additionalProperties":false,
                                                                                          "properties":{
                                                                                            "minLength":{
                                                                                              "type":"number",
                                                                                              "minimum":4,
                                                                                              "maximum":80,
                                                                                              "optional":false
                                                                                            },
                                                                                            "maxLength":{
                                                                                              "type":"number",
                                                                                              "minimum":4,
                                                                                              "maximum":80,
                                                                                              "optional":false
                                                                                            },
                                                                                            "minLowerCase":{
                                                                                              "type":"number",
                                                                                              "minimum":0,
                                                                                              "maximum":10,
                                                                                              "optional":false
                                                                                            },
                                                                                            "maxLowerCase":{
                                                                                              "type":"number",
                                                                                              "minimum":0,
                                                                                              "maximum":10,
                                                                                              "optional":false
                                                                                            },
                                                                                            "minUpperCase":{
                                                                                              "type":"number",
                                                                                              "minimum":0,
                                                                                              "maximum":10,
                                                                                              "optional":false
                                                                                            },
                                                                                            "maxUpperCase":{
                                                                                              "type":"number",
                                                                                              "minimum":0,
                                                                                              "maximum":10,
                                                                                              "optional":false
                                                                                            },
                                                                                            "minDigit":{
                                                                                              "type":"number",
                                                                                              "minimum":0,
                                                                                              "maximum":10,
                                                                                              "optional":false
                                                                                            },
                                                                                            "maxDigit":{
                                                                                              "type":"number",
                                                                                              "minimum":0,
                                                                                              "maximum":10,
                                                                                              "optional":false
                                                                                            },
                                                                                            "minSymbol":{
                                                                                              "type":"number",
                                                                                              "minimum":0,
                                                                                              "maximum":10,
                                                                                              "optional":false
                                                                                            },
                                                                                            "maxSymbol":{
                                                                                              "type":"number",
                                                                                              "minimum":0,
                                                                                              "maximum":10,
                                                                                              "optional":false
                                                                                            },
                                                                                            "Symbols":{
                                                                                              "type":"string",
                                                                                              "optional":false
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  );

  static readonly _CONFIG_ENTRY_PasswordStrengthParameters = {
                                                               Id: "4a7819e9-712f-42e4-936b-3915b3d8a666",
                                                               Scope: "system",
                                                               Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                               Category: "Security",
                                                               Name: "system.Security.PasswordStrengthParameters",
                                                               Default: JSON.stringify(
                                                                                        {
                                                                                          "@__default__@":{
                                                                                            "minLength":8,
                                                                                            "maxLength":0,
                                                                                            "minLowerCase":0,
                                                                                            "maxLowerCase":0,
                                                                                            "minUpperCase":0,
                                                                                            "maxUpperCase":0,
                                                                                            "minDigit":0,
                                                                                            "maxDigit":0,
                                                                                            "minSymbol":0,
                                                                                            "maxSymbol":0,
                                                                                            "symbols":""
                                                                                          },
                                                                                          "#System_Administrators#": {
                                                                                            "minLength":8,
                                                                                            "maxLength":0,
                                                                                            "minLowerCase":4,
                                                                                            "maxLowerCase":0,
                                                                                            "minUpperCase":0,
                                                                                            "maxUpperCase":0,
                                                                                            "minDigit":2,
                                                                                            "maxDigit":0,
                                                                                            "minSymbol":2,
                                                                                            "maxSymbol":0,
                                                                                            "symbols":""
                                                                                          },
                                                                                          "#Business_Managers#": {
                                                                                            "minLength":8,
                                                                                            "maxLength":0,
                                                                                            "minLowerCase":4,
                                                                                            "maxLowerCase":0,
                                                                                            "minUpperCase":0,
                                                                                            "maxUpperCase":0,
                                                                                            "minDigit":2,
                                                                                            "maxDigit":0,
                                                                                            "minSymbol":1,
                                                                                            "maxSymbol":0,
                                                                                            "symbols":""
                                                                                          }
                                                                                        }
                                                                                      ),
                                                               Label: "Default password strength parameters",
                                                               Description: "Default password strength parameters defined in json/struct",
                                                               AllowTagAccessR: "#Administrator#",
                                                               AllowTagAccessW: "#Administrator#",
                                                               Example: JSON.stringify(
                                                                                        {
                                                                                          "@__default__@":{
                                                                                            "minLength":8,
                                                                                            "maxLength":0,
                                                                                            "minLowerCase":0,
                                                                                            "maxLowerCase":0,
                                                                                            "minUpperCase":0,
                                                                                            "maxUpperCase":0,
                                                                                            "minDigit":0,
                                                                                            "maxDigit":0,
                                                                                            "minSymbol":0,
                                                                                            "maxSymbol":0,
                                                                                            "symbols":""
                                                                                          },
                                                                                          "#System_Administrators#": {
                                                                                            "minLength":8,
                                                                                            "maxLength":0,
                                                                                            "minLowerCase":4,
                                                                                            "maxLowerCase":0,
                                                                                            "minUpperCase":0,
                                                                                            "maxUpperCase":0,
                                                                                            "minDigit":2,
                                                                                            "maxDigit":0,
                                                                                            "minSymbol":2,
                                                                                            "maxSymbol":0,
                                                                                            "symbols":""
                                                                                          },
                                                                                          "#Business_Managers#": {
                                                                                            "minLength":8,
                                                                                            "maxLength":0,
                                                                                            "minLowerCase":4,
                                                                                            "maxLowerCase":0,
                                                                                            "minUpperCase":0,
                                                                                            "maxUpperCase":0,
                                                                                            "minDigit":2,
                                                                                            "maxDigit":0,
                                                                                            "minSymbol":1,
                                                                                            "maxSymbol":0,
                                                                                            "symbols":""
                                                                                          },
                                                                                          "#Drivers#":{
                                                                                            "minLength":5,
                                                                                            "maxLength":8,
                                                                                            "minLowerCase":0,
                                                                                            "maxLowerCase":0,
                                                                                            "minUpperCase":0,
                                                                                            "maxUpperCase":0,
                                                                                            "minDigit":0,
                                                                                            "maxDigit":0,
                                                                                            "minSymbol":0,
                                                                                            "maxSymbol":0,
                                                                                            "symbols":""
                                                                                          },
                                                                                          "#Final_Customers#":{
                                                                                            "minLength":7,
                                                                                            "maxLength":9,
                                                                                            "minLowerCase":0,
                                                                                            "maxLowerCase":0,
                                                                                            "minUpperCase":0,
                                                                                            "maxUpperCase":0,
                                                                                            "minDigit":0,
                                                                                            "maxDigit":0,
                                                                                            "minSymbol":0,
                                                                                            "maxSymbol":0,
                                                                                            "symbols":""
                                                                                          },
                                                                                          "#Establishments#":{
                                                                                            "minLength":8,
                                                                                            "maxLength":10,
                                                                                            "minLowerCase":0,
                                                                                            "maxLowerCase":0,
                                                                                            "minUpperCase":0,
                                                                                            "maxUpperCase":0,
                                                                                            "minDigit":0,
                                                                                            "maxDigit":0,
                                                                                            "minSymbol":0,
                                                                                            "maxSymbol":0,
                                                                                            "symbols":""
                                                                                          }
                                                                                        }
                                                                                      ),
                                                               CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                               ExtraData: `{ "Type": "struct/json", "Schema": ${SystemConstants._CONFIG_ENTRY_PasswordStrengthParameters_SCHEMA} }`
                                                             };

  static readonly _CONFIG_ENTRY_BinaryDataBasePath = {
                                                       Id: "5b434e22-16a4-4d5c-805a-8a1aead18b3b",
                                                       Scope: "system",
                                                       Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                       Category: "Binary Data",
                                                       Name: "system.binary.data.BasePath",
                                                       Default: "binary_data/",
                                                       Label: "Default full path to binary data folder",
                                                       Description: "Default full path to resources folder. Empty for to assume the path to relative path binary_data/",
                                                       AllowTagAccessR: "#Administrator#",
                                                       AllowTagAccessW: "#Administrator#",
                                                       Example: "Any valid path in the server file system, relative or absolute. Example: binary_data/",
                                                       CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                       ExtraData: `{ "Type": "string" }`
                                                     };

  static readonly _CONFIG_ENTRY_BinaryDataMaximumSize = {
                                                          Id: "f318f541-8367-42e7-ac71-904cab35bac1",
                                                          Scope: "system",
                                                          Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                          Category: "Binary Data",
                                                          Name: "system.binary.data.BinaryDataMaximumSize",
                                                          Default: "10240",
                                                          Label: "Maximum size in kilobytes for binary data file",
                                                          Description: "Maximum size in kilobytes for binary data file",
                                                          AllowTagAccessR: "#Administrator#",
                                                          AllowTagAccessW: "#Administrator#",
                                                          Example: "10240 => 10MB",
                                                          CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                          ExtraData: `{ "Type": "integer", "Minimal": 1, "Maximal": 153600 }`
                                                        };

  static readonly _CONFIG_ENTRY_BinaryDataExpireAt = {
                                                       Id: "f318f541-8367-42e7-ac71-904cab35bac1",
                                                       Scope: "system",
                                                       Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                       Category: "Binary Data",
                                                       Name: "system.binary.data.BinaryDataExpireAt",
                                                       Default: "720",
                                                       Label: "Expire in hours",
                                                       Description: "Expire in hours",
                                                       AllowTagAccessR: "#Administrator#",
                                                       AllowTagAccessW: "#Administrator#",
                                                       Example: "720 => 720 Hours => 30 days",
                                                       CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                       ExtraData: `{ "Type": "integer", "Minimal": 1, "Maximal": 150000 }`
                                                     };

  static readonly _CONFIG_ENTRY_Deny_Allow_SCHEMA = JSON.stringify(
                                                                    {
                                                                      "$schema":"http://json-schema.org/draft-07/schema#",
                                                                      "type":"object",
                                                                      "additionalProperties":false,
                                                                      "required": [
                                                                        "@__default__@"
                                                                      ],
                                                                      "patternProperties":{
                                                                        "@__default__@": {
                                                                          "$ref": "#/definitions/validatonDef",
                                                                          "optional":false
                                                                        },
                                                                        "#.*#":{
                                                                          "$ref":"#/definitions/validationDef",
                                                                          "optional":false
                                                                        }
                                                                      },
                                                                      "definitions":{
                                                                        "validationDef":{
                                                                          "type":"object",
                                                                          "required":[
                                                                            "denied",
                                                                            "allowed"
                                                                          ],
                                                                          "additionalProperties":false,
                                                                          "properties":{
                                                                            "denied":{
                                                                              "type":"string",
                                                                              "optional":false
                                                                            },
                                                                            "allowed":{
                                                                              "type":"string",
                                                                              "optional":false
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  );

  static readonly _CONFIG_ENTRY_BinaryDataAllowedCategory = {
                                                              Id: "c0ea3ece-277c-4490-b2c1-a06f54382520",
                                                              Scope: "system",
                                                              Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                              Category: "Binary Data",
                                                              Name: "system.binary.data.AllowedCategory",
                                                              Default: JSON.stringify(
                                                                                       {
                                                                                         "@__default__@": {
                                                                                           "denied": "",
                                                                                           "allowed": "*"
                                                                                         }
                                                                                       }
                                                                                     ),
                                                              Label: "Define witch categories are allowed",
                                                              Description: "Define witch categories are allowed to create or add binary data inside",
                                                              AllowTagAccessR: "#Administrator#",
                                                              AllowTagAccessW: "#Administrator#",
                                                              Ecample: JSON.stringify(
                                                                                       {
                                                                                         "@__default__@":{
                                                                                           "denied":"*",
                                                                                           "allowed":""
                                                                                         },
                                                                                         "#group01#":{
                                                                                           "denied":"",
                                                                                           "allowed":"#ticket#,#profile#,#avatar#"
                                                                                         },
                                                                                         "#user01#":{
                                                                                           "denied":"#ticket#",
                                                                                           "allowed":"*"
                                                                                         },
                                                                                       }
                                                                                     ),
                                                              CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                              ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_Deny_Allow_SCHEMA}" }`
                                                            };

  static readonly _CONFIG_ENTRY_BinaryDataAllowedMimeType = {
                                                              Id: "e2f57878-e408-4754-ac13-d7186ed451ba",
                                                              Scope: "system",
                                                              Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                              Category: "Binary Data",
                                                              Name: "system.binary.data.AllowedMimeType",
                                                              Default: JSON.stringify(
                                                                                       {
                                                                                         "@__default__@": {
                                                                                           "denied": "",
                                                                                           "allowed": "*"
                                                                                         }
                                                                                       }
                                                                                     ),
                                                              Label: "Define witch binary data types are allowed in base in your mime types",
                                                              Description: "Define witch binary data types are allowed in base in your mime types",
                                                              AllowTagAccessR: "#Administrator#",
                                                              AllowTagAccessW: "#Administrator#",
                                                              Example: JSON.stringify(
                                                                                       {
                                                                                         "@__default__@":{
                                                                                           "denied":"*",
                                                                                           "allowed":""
                                                                                         },
                                                                                         "#group01#":{
                                                                                           "denied":"",
                                                                                           "allowed":"#image/png#,#application/pdf#"
                                                                                         },
                                                                                         "#user01#":{
                                                                                           "denied":"#image/jpg#,#application/pdf#",
                                                                                           "allowed":"*"
                                                                                         },
                                                                                       }
                                                                                     ),
                                                              CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                              ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_Deny_Allow_SCHEMA}" }`
                                                            };

  static readonly _CONFIG_ENTRY_BinaryDataDefaultOwner_SCHEMA = JSON.stringify(
                                                                                {
                                                                                  "$schema": "http://json-schema.org/draft-07/schema#",
                                                                                  "type": "object",
                                                                                  "additionalProperties":false,
                                                                                  "required": [
                                                                                    "@__default__@"
                                                                                  ],
                                                                                  "patternProperties": {
                                                                                    "@__default__@": {
                                                                                      "type": "string",
                                                                                      "optional":false
                                                                                    },
                                                                                    "#.*#": {
                                                                                      "type": "string",
                                                                                      "optional":false
                                                                                    }
                                                                                  }
                                                                                }
                                                                              );

  static readonly _CONFIG_ENTRY_BinaryDataDefaultOwner = {
                                                           Id: "c1befe9b-8a6a-4f3a-8d91-e1b418e2f71d",
                                                           Scope: "system",
                                                           Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                           Category: "Binary Data",
                                                           Name: "system.binary.data.DefaultOwners",
                                                           Default: JSON.stringify(
                                                                                    {
                                                                                      "@__default__@": "#@@UserName@@#,#@@Category@@#"
                                                                                    }
                                                                                  ),
                                                           Label: "Add owners to the binary data",
                                                           Description: "Add owners to the binary data when uploaded UserGroup.Id, UserGroup.Name, UserGroup.Tag, User.Id, User.Name, User.Tag, UserSessionStatus.Role",
                                                           AllowTagAccessR: "#Administrator#",
                                                           AllowTagAccessW: "#Administrator#",
                                                           Example: JSON.stringify(
                                                                                    {
                                                                                      "@__default__@": "#@@UserGroupId@@#,#@@UserGroupShortId@@#,#@@UserGroupName@@#,#@@UserId@@#,#@@UserShortId@@#,#@@UserName@@#",
                                                                                      "#user01#.ticket": "#user02#,#user03#,#Business_Manager#",
                                                                                      "#user01#.avatar": "#user10#",
                                                                                      "#Group01#": "#Group02#,#user03#"
                                                                                    }
                                                                                  ),
                                                           CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                           ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_BinaryDataDefaultOwner_SCHEMA}" }`
                                                         };

    static readonly _CONFIG_ENTRY_BinaryDataThumbnail_SCHEMA =  JSON.stringify(
                                                                                {
                                                                                  "$schema": "http://json-schema.org/draft-07/schema#",
                                                                                  "type": "object",
                                                                                  "additionalProperties":false,
                                                                                  "required": [
                                                                                    "@__default__@"
                                                                                  ],
                                                                                  "patternProperties": {
                                                                                    "@__default__@": {
                                                                                      "$ref": "#/definitions/validatonDefNotEmpty",
                                                                                      "optional":false
                                                                                    },
                                                                                    "#.*#": {
                                                                                      "$ref": "#/definitions/validatonDefNotEmpty",
                                                                                      "optional":false
                                                                                    }
                                                                                  },
                                                                                  "definitions": {
                                                                                    "validatonDefNotEmpty": {
                                                                                      "type": "array",
                                                                                      //"additionalProperties": false,
                                                                                      //"minLength": 1,
                                                                                      "minItems": 1,
                                                                                      "items": {
                                                                                        "$ref": "#/definitions/validatonObjectDef"
                                                                                      }
                                                                                    },
                                                                                    "validatonObjectDef": {
                                                                                      "type": "object",
                                                                                      "additionalProperties": false,
                                                                                      "required": [ "Mime", "Factor" ],
                                                                                      "properties": {
                                                                                        "Mime": {
                                                                                          "type": "string",
                                                                                          //"minLength": 1,
                                                                                          "optional":false
                                                                                        },
                                                                                        "Factor": {
                                                                                          "type": "number",
                                                                                          "minimum": 50,
                                                                                          "optional":false
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              );

  static readonly _CONFIG_ENTRY_BinaryDataThumbnail = {
                                                        Id: "d5108be7-c79a-4b63-a7e0-022dfc26f4e5",
                                                        Scope: "system",
                                                        Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                        Category: "Binary Data",
                                                        Name: "system.binary.data.Thumbnail",
                                                        Default: JSON.stringify(
                                                                                 {
                                                                                   "@__default__@":[
                                                                                     {
                                                                                       "mime":"#image/png#,#image/jpeg#",
                                                                                       "factor":300
                                                                                     }
                                                                                   ]
                                                                                 }
                                                                               ),
                                                        Label: "Generate thumbnail for mime types",
                                                        Description: "Generate thumbnail for mime types. The factor take the more small size from the image (width or height) and resize to factor number.",
                                                        AllowTagAccessR: "#Administrator#",
                                                        AllowTagAccessW: "#Administrator#",
                                                        Example: JSON.stringify(
                                                                                 {
                                                                                   "@__default__@":[
                                                                                     {
                                                                                       "mime":"#image/png#,#image/jpeg#",
                                                                                       "factor":300
                                                                                     }
                                                                                   ],
                                                                                   "#Group01#.ticket":[
                                                                                     {
                                                                                       "mime":"#image/png#,#image/jpeg#",
                                                                                       "factor":500
                                                                                     }
                                                                                   ]
                                                                                 }
                                                                               ),
                                                        CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                        ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_BinaryDataThumbnail_SCHEMA}" }`
                                                      };

  static readonly _CONFIG_ENTRY_BinaryDataProcess_SCHEMA = JSON.stringify(
                                                                           {
                                                                             "$schema":"http://json-schema.org/draft-07/schema#",
                                                                             "type":"object",
                                                                             "additionalProperties":false,
                                                                             "required": [
                                                                               "@__default__@"
                                                                             ],
                                                                             "patternProperties":{
                                                                               "@__default__@":{
                                                                                 "$ref":"#/definitions/validatonDefNotEmpty",
                                                                                 "optional":false
                                                                               },
                                                                               "#.*#":{
                                                                                 "$ref":"#/definitions/validatonDefNotEmpty",
                                                                                 "optional":false
                                                                               }
                                                                             },
                                                                             "definitions":{
                                                                               "validatonDefNotEmpty":{
                                                                                 "type":"array",
                                                                                 //"additionalProperties":false,
                                                                                 //"minLength":1,
                                                                                 "minItems":1,
                                                                                 "items":{
                                                                                   "$ref":"#/definitions/validatonObjectDef"
                                                                                 },
                                                                               },
                                                                               "validatonObjectDef":{
                                                                                 "type":"object",
                                                                                 "additionalProperties":false,
                                                                                 "required":[
                                                                                   "Mime",
                                                                                   "Factor",
                                                                                   "keepOriginal"
                                                                                 ],
                                                                                 "properties":{
                                                                                   "Mime":{
                                                                                     "type":"string",
                                                                                     //"minLength":1,
                                                                                     "optional":false
                                                                                   },
                                                                                   "Factor":{
                                                                                     "type":"number",
                                                                                     "minimum":50,
                                                                                     "optional":false
                                                                                   },
                                                                                   "keepOriginal":{
                                                                                     "type":"boolean",
                                                                                     "optional":false
                                                                                   }
                                                                                 }
                                                                               }
                                                                             }
                                                                           }
                                                                         );

  static readonly _CONFIG_ENTRY_BinaryDataProcess = {
                                                      Id: "40a2bddd-59e1-43a3-aa83-4c9775a2c298",
                                                      Scope: "system",
                                                      Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                      Category: "Binary Data",
                                                      Name: "system.binary.data.Process",
                                                      Default: JSON.stringify(
                                                                               {
                                                                                 "@__default__@":[
                                                                                   {
                                                                                     "mime": "#image/png#,#image/jpeg#",
                                                                                     "factor": 1500,
                                                                                     "size": 1024,
                                                                                     "keepOriginal": true
                                                                                   }
                                                                                 ]
                                                                               }
                                                                             ),
                                                      Label: "Generate more small images",
                                                      Description: "Generate more small images. Using the mime types and size in kilobytes. Scaled to factor using the more small size of image.",
                                                      AllowTagAccessR: "#Administrator#",
                                                      AllowTagAccessW: "#Administrator#",
                                                      Example: JSON.stringify(
                                                                               {
                                                                                 "@__default__@":[
                                                                                   {
                                                                                     "mime":"#image/png#,#image/jpeg#",
                                                                                     "factor":1500,
                                                                                     "size":1024,
                                                                                     "keepOriginal":true
                                                                                   }
                                                                                 ],
                                                                                 "#Group01#.ticket":[
                                                                                   {
                                                                                     "mime":"#image/png#,#image/jpeg#",
                                                                                     "factor":1000,
                                                                                     "size":512,
                                                                                     "keepOriginal":true
                                                                                   }
                                                                                 ]
                                                                               }
                                                                             ),
                                                      CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                      ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_BinaryDataProcess_SCHEMA}" }`
                                                    };

  static readonly _CONFIG_ENTRY_UserSignupProcess_SCHEMA = JSON.stringify(
                                                                           {
                                                                             "$schema":"http://json-schema.org/draft-07/schema#",
                                                                             "type":"object",
                                                                             "additionalProperties":false,
                                                                             "required":[
                                                                               "@__default__@"
                                                                             ],
                                                                             "patternProperties":{
                                                                               "@__default__@":{
                                                                                 "$ref":"#/definitions/validatonObjectDef",
                                                                                 "optional":false
                                                                               },
                                                                               "#.*#":{
                                                                                 "$ref":"#/definitions/validatonObjectDef",
                                                                                 "optional":false
                                                                               }
                                                                             },
                                                                             "definitions":{
                                                                               "validatonObjectDef":{
                                                                                 "type":"object",
                                                                                 "additionalProperties":false,
                                                                                 "required":[
                                                                                   "expireAt",
                                                                                   "group",
                                                                                   "createGroup",
                                                                                   "groupExpireAt",
                                                                                   "groupRole",
                                                                                   "status",
                                                                                   "userRole",
                                                                                   "userTag",
                                                                                   "userExpireAt"
                                                                                 ],
                                                                                 "properties":{
                                                                                   "expireAt":{
                                                                                     "type":"number",
                                                                                     "multipleOf":1.0,
                                                                                     "minimum":5,
                                                                                     "optional":false
                                                                                   },
                                                                                   "group":{
                                                                                     "type":"string",
                                                                                     "minLength":2,
                                                                                     "optional":false
                                                                                   },
                                                                                   "createGroup":{
                                                                                     "type":"boolean",
                                                                                     "optional":false
                                                                                   },
                                                                                   "groupExpireAt":{
                                                                                     "type":"number",
                                                                                     "multipleOf":1.0,
                                                                                     "minimum":-1,
                                                                                     "optional":false
                                                                                   },
                                                                                   "groupRole":{
                                                                                     "type":"string",
                                                                                     "optional":false
                                                                                   },
                                                                                   "groupTag":{
                                                                                     "type":"string",
                                                                                     "optional":false
                                                                                   },
                                                                                   "status":{
                                                                                     "type":"number",
                                                                                     "optional":false
                                                                                   },
                                                                                   "userRole":{
                                                                                     "type":"string",
                                                                                     "optional":false
                                                                                   },
                                                                                   "userTag":{
                                                                                     "type":"string",
                                                                                     "optional":false
                                                                                   },
                                                                                   "userExpireAt":{
                                                                                     "type":"number",
                                                                                     "multipleOf":1.0,
                                                                                     "minimum":-1,
                                                                                     "optional":false
                                                                                   }
                                                                                 }
                                                                               }
                                                                             }
                                                                           }
                                                                         );

  static readonly _CONFIG_ENTRY_UserSignupProcess = {
                                                      Id: "aaa72b7d-9724-441d-bc28-4ae8b3e15b1c",
                                                      Scope: "system",
                                                      Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                      Category: "Singup",
                                                      Name: "system.user.signup.Process",
                                                      Default: JSON.stringify(
                                                                               {
                                                                                 "@__default__@":{
                                                                                   "expireAt":60,
                                                                                   "group":"@__error__@",
                                                                                   "createGroup":false,
                                                                                   "groupRole":"",
                                                                                   "groupTag":"",
                                                                                   "groupExpireAt":-1,
                                                                                   "status":-1,
                                                                                   "userRole":"",
                                                                                   "userTag":"",
                                                                                   "userExpireAt":-1,
                                                                                   "passwordParameters":""
                                                                                 }
                                                                               }
                                                                             ),
                                                      Label: "Process signup kind",
                                                      Description: "Process signup of users. The group must be exists before of singup if createGroup = false. groupRole only apply if group is created first time createGroup = true",
                                                      AllowTagAccessR: "#Administrator#",
                                                      AllowTagAccessW: "#Administrator#",
                                                      Example: JSON.stringify(
                                                                               {
                                                                                 "@__default__@":{
                                                                                   "expireAt":60,
                                                                                   "group":"@__error__@",
                                                                                   "createGroup":false,
                                                                                   "groupRole":"",
                                                                                   "groupTag":"",
                                                                                   "groupExpireAt":-1,
                                                                                   "status":-1,
                                                                                   "userRole":"",
                                                                                   "userTag":"",
                                                                                   "userExpireAt":-1,
                                                                                   "passwordParameterTag":""
                                                                                 },
                                                                                 "#Driver#":{
                                                                                   "expireAt":60,
                                                                                   "group":"Drivers",
                                                                                   "createGroup":false,
                                                                                   "groupRole":"",
                                                                                   "groupTag":"",
                                                                                   "groupExpireAt":-1,
                                                                                   "status":0,
                                                                                   "userRole":"#Driver#,#UploadBinary,#DeleteBinary#,#UpdateBinary#,#SearchBinary#",
                                                                                   "userTag":"",
                                                                                   "userExpireAt":-1,
                                                                                   "passwordParameterTag":""
                                                                                 },
                                                                                 "#FinalCustomer01#":{
                                                                                   "expireAt":60,
                                                                                   "group":"Final_Customers_01",
                                                                                   "createGroup":false,
                                                                                   "groupRole":"",
                                                                                   "groupTag":"",
                                                                                   "groupExpireAt":-1,
                                                                                   "status":0,
                                                                                   "userRole":"#FinalCustomer#,#FinalCustomer01#,#UploadBinary#,#DeleteBinary#,#UpdateBinary#,#SearchBinary#",
                                                                                   "userTag":"",
                                                                                   "userExpireAt":-1,
                                                                                   "passwordParameterTag":""
                                                                                 },
                                                                                 "#Establishment#":{
                                                                                   "expireAt":60,
                                                                                   "group":"@__FromName__@",
                                                                                   "createGroup":true,
                                                                                   "groupRole":"#@__FromName__@#,#Establishment#",
                                                                                   "groupTag":"",
                                                                                   "groupExpireAt":-1,
                                                                                   "status":0,
                                                                                   "userRole":"#MasterL01#", //No need the #UploadBinary#,#DeleteBinary#,#UpdateBinary# because #MasterL01# allow that
                                                                                   "userTag":"",
                                                                                   "userExpireAt":-1,
                                                                                   "passwordParameterTag":"#Establishment#"
                                                                                 }
                                                                               }
                                                                             ),
                                                      CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                      ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_UserSignupProcess_SCHEMA}" }`
                                                    };

  static readonly _CONFIG_ENTRY_UserAutoRoleAssign_SCHEMA = "";

  static readonly _CONFIG_ENTRY_UserAutoRoleAssign = {
                                                       Id: "483ff13b-af30-46ee-aaed-091f4ce0cd05",
                                                       Scope: "system",
                                                       Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                       Category: "User",
                                                       Name: "system.user.autorole.Assign",
                                                       Default: JSON.stringify(
                                                                                {
                                                                                  "create": {
                                                                                    "@__default__@":{
                                                                                      "@__default__@": ""
                                                                                    }
                                                                                  },
                                                                                  "update": {
                                                                                    "@__default__@":{
                                                                                      "@__default__@": ""
                                                                                    }
                                                                                  }
                                                                                }
                                                                              ),
                                                       Label: "Process auto assign of role to the user creation",
                                                       Description: "Process auto assign of role in the user creation. When the user that create has the role.",
                                                       AllowTagAccessR: "#Administrator#",
                                                       AllowTagAccessW: "#Administrator#",
                                                       Example: JSON.stringify(
                                                                                {
                                                                                  "create": {
                                                                                    "@__default__@":{
                                                                                      "@__default__@": ""
                                                                                    },
                                                                                    "#MasterL01#": {
                                                                                      "@__default__@": "#UploadBinary#,#UpdateBinary#,#DeleteBinary#"
                                                                                    },
                                                                                    "#MasterL02#": {
                                                                                      "@__default__@": "#UploadBinary#,#UpdateBinary#,#DeleteBinary#"
                                                                                    },
                                                                                    "#MasterL03#": {
                                                                                      "@__default__@": "#UploadBinary#,#UpdateBinary#,#DeleteBinary#"
                                                                                    },
                                                                                    "#RoleName01#": {
                                                                                      "#GroupName01#": "#RoleName02#,#RoleName03#",
                                                                                      "@__default__@": "#RoleName02#"
                                                                                    }
                                                                                  },
                                                                                  "update": {
                                                                                    "@__default__@":{
                                                                                      "@__default__@": ""
                                                                                    },
                                                                                  }
                                                                                }
                                                                              ),
                                                       CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                       ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_UserAutoRoleAssign_SCHEMA}" }`
                                                     };

  static readonly _CONFIG_ENTRY_EMail_Service_SCHEMA = "";

  static readonly _CONFIG_ENTRY_EMail_Service = {
                                                  Id: "c0b016a3-3fda-4c5b-be78-fa8e96398196",
                                                  Scope: "system",
                                                  Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                  Category: "Notification",
                                                  Name: "system.notification.email.service",
                                                  Default: JSON.stringify(
                                                                           {
                                                                             "service":"@__none__@",
                                                                             "#gmail#":{
                                                                               "type":"smtp",
                                                                               "host":"smtp.gmail.com",
                                                                               "port":465,
                                                                               "secure":true,
                                                                               "auth":{
                                                                                 "user":"myuser@gmail.com",
                                                                                 "pass":"secret"
                                                                               }
                                                                             }
                                                                           }
                                                                         ),
                                                  Label: "Configuration for the notifications email transport",
                                                  Description: "Configuration for the notification email transport",
                                                  AllowTagAccessR: "#Administrator#",
                                                  AllowTagAccessW: "#Administrator#",
                                                  Example: JSON.stringify(
                                                                           {
                                                                             "service":"#gmail#",
                                                                             "#gmail#":{
                                                                               "type":"smtp",
                                                                               "host":"smtp.gmail.com",
                                                                               "port":465,
                                                                               "secure":true,
                                                                               "auth":{
                                                                                 "user":"myuser@gmail.com",
                                                                                 "pass":"secret"
                                                                               }
                                                                             },
                                                                             "#send_grid#":{
                                                                               "type":"send_grid",
                                                                               "host":"api.sendgrid.com/v3/mail/send",
                                                                               "port":443,
                                                                               "auth":{
                                                                                 "api_key":"my_key"
                                                                               }
                                                                             }
                                                                           }
                                                                         ),
                                                  CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                  ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_EMail_Service_SCHEMA}" }`
                                                };

  static readonly _CONFIG_ENTRY_SMS_Service_SCHEMA = "";

  static readonly _CONFIG_ENTRY_SMS_Service = {
                                                Id: "71199a26-8a8a-4015-989c-4a911b18c68e",
                                                Scope: "system",
                                                Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                Category: "Notification",
                                                Name: "system.notification.sms.service",
                                                Default: JSON.stringify(
                                                                         {
                                                                           "service":"@__none__@",
                                                                           "#sms_gateway#":{
                                                                             "type":"sms_gateway",
                                                                             "host":"https://domain.com/backend-sms-gateway",
                                                                             "port":443,
                                                                             "device_id":"*",
                                                                             "context":"AMERICA/NEW_YORK",
                                                                             "auth":{
                                                                               "api_key":"my_key"
                                                                             }
                                                                           }
                                                                         }
                                                                       ),
                                                Label: "Configuration for the notifications sms transport",
                                                Description: "Configuration for the notification sms transport",
                                                AllowTagAccessR: "#Administrator#",
                                                AllowTagAccessW: "#Administrator#",
                                                Example: JSON.stringify(
                                                                         {
                                                                           "service":"#sms_gateway#",
                                                                           "#sms_gateway#":{
                                                                             "type":"sms_gateway",
                                                                             "host":"https://domain.com/backend-sms-gateway",
                                                                             "port":443,
                                                                             "device_id":"*",
                                                                             "context":"AMERICA/NEW_YORK",
                                                                             "auth":{
                                                                               "api_key":"my_key"
                                                                             }
                                                                           }
                                                                         }
                                                                       ),
                                                CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_EMail_Service_SCHEMA}" }`
                                              };

  static readonly _CONFIG_ENTRY_PUSH_Service_SCHEMA = "";

  static readonly _CONFIG_ENTRY_Push_Service = {
                                                 Id: "56e70807-9f65-4679-b9e6-9327df438e1e",
                                                 Scope: "system",
                                                 Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                 Category: "Notification",
                                                 Name: "system.notification.push.service",
                                                 Default: JSON.stringify(
                                                                          {
                                                                            "service":"@__none__@",
                                                                            "#one_signal#":{
                                                                              "type":"one_signal",
                                                                              "host":"https://onesignal.com/api/v1/notifications",
                                                                              "port":443,
                                                                              "auth":{
                                                                                "appId":"my_app_id",
                                                                                "apiKey":"my_key"
                                                                              }
                                                                            }
                                                                          }
                                                                        ),
                                                 Label: "Configuration for the notifications push transport",
                                                 Description: "Configuration for the notification push transport",
                                                 AllowTagAccessR: "#Administrator#",
                                                 AllowTagAccessW: "#Administrator#",
                                                 Example: JSON.stringify(
                                                                          {
                                                                            "service":"#one_signal#",
                                                                            "#one_signal#":{
                                                                              "type":"one_signal",
                                                                              "host":"https://onesignal.com/api/v1/notifications",
                                                                              "port":443,
                                                                              "auth":{
                                                                                "appId":"my_app_id",
                                                                                "apiKey":"my_key"
                                                                              }
                                                                            }
                                                                          }
                                                                        ),
                                                 CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                 ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_PUSH_Service_SCHEMA}" }`
                                               };

  static readonly _CONFIG_ENTRY_MAP_GEOCODE_Service_SCHEMA = "";

  static readonly _CONFIG_ENTRY_MAP_GEOCODE_Service = {
                                                        Id: "e87b5ce8-e488-4869-be72-a754314e5f75",
                                                        Scope: "system",
                                                        Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                        Category: "Maps",
                                                        Name: "system.maps.geocode.service",
                                                        Default: JSON.stringify(
                                                                                 {
                                                                                   "service":"@__none__@",
                                                                                   "#google_maps#":{
                                                                                     "type":"google_maps",
                                                                                     "host":"https://maps.googleapis.com/maps/api/geocode/json",
                                                                                     "port":443,
                                                                                     "auth":{
                                                                                       "apiKey":"my_key"
                                                                                     }
                                                                                   }
                                                                                 }
                                                                               ),
                                                        Label: "Configuration for the geocode map service",
                                                        Description: "Configuration for the geocode map service",
                                                        AllowTagAccessR: "#Administrator#",
                                                        AllowTagAccessW: "#Administrator#",
                                                        Example: JSON.stringify(
                                                                                 {
                                                                                   "service":"#google_maps#",
                                                                                   "#google_maps#":{
                                                                                     "type":"google_maps",
                                                                                     "host":"https://maps.googleapis.com/maps/api/geocode/json",
                                                                                     "port":443,
                                                                                     "auth":{
                                                                                       "apiKey":"my_key"
                                                                                     }
                                                                                   }
                                                                                 }
                                                                               ),
                                                        CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                        ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_MAP_GEOCODE_Service_SCHEMA}" }`
                                                      };

  static readonly _CONFIG_ENTRY_MAP_DISTANCE_Service_SCHEMA = "";

  static readonly _CONFIG_ENTRY_MAP_DISTANCE_Service = {
                                                         Id: "0d06e235-c282-4d8a-bac5-8d7b84010939",
                                                         Scope: "system",
                                                         Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                         Category: "Maps",
                                                         Name: "system.map.distance.service",
                                                         Default: JSON.stringify(
                                                                                  {
                                                                                    "service":"@__none__@",
                                                                                    "#google_maps#":{
                                                                                      "type":"google_maps",
                                                                                      "host":"https://maps.googleapis.com/maps/api/distancematrix/json",
                                                                                      "port":443,
                                                                                      "auth":{
                                                                                        "apiKey":"my_key"
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                ),
                                                         Label: "Configuration for the geocode map service",
                                                         Description: "Configuration for the geocode map service",
                                                         AllowTagAccessR: "#Administrator#",
                                                         AllowTagAccessW: "#Administrator#",
                                                         Example: JSON.stringify(
                                                                                  {
                                                                                    "service":"#google_maps#",
                                                                                    "#google_maps#":{
                                                                                      "type":"google_maps",
                                                                                      "host":"https://maps.googleapis.com/maps/api/distancematrix/json",
                                                                                      "port":443,
                                                                                      "auth":{
                                                                                        "apiKey":"my_key"
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                ),
                                                         CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                         ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_MAP_GEOCODE_Service_SCHEMA}" }`
                                                       };

  static readonly _CONFIG_ENTRY_Frontend_Rules_SCHEMA = JSON.stringify(
                                                                        {
                                                                          "$schema": "http://json-schema.org/draft-07/schema#",
                                                                          "type": "object",
                                                                          "additionalProperties":false,
                                                                          "required": [ "@__default__@" ],
                                                                          "patternProperties": {
                                                                            "@__default__@": {
                                                                              "$ref": "#/definitions/validatonObjectDef"
                                                                            },
                                                                            "#.*#": {
                                                                              "$ref": "#/definitions/validatonObjectDef"
                                                                            }
                                                                          },
                                                                          "definitions": {
                                                                            "validatonObjectDef": {
                                                                              "type": "object",
                                                                              "additionalProperties": false,
                                                                              "required": [ "userLoginControl", "userSignupControl", "tag", "url", "route" ],
                                                                              "properties": {
                                                                                "userLoginControl": {
                                                                                  "$ref": "#/definitions/validatonObjectDefDeniedAllowed",
                                                                                  "optional":false
                                                                                },
                                                                                "userSignupControl": {
                                                                                  "$ref": "#/definitions/validatonObjectDefDeniedAllowed",
                                                                                  "optional":false
                                                                                },
                                                                                "userRecoverPasswordControl": {
                                                                                  "$ref": "#/definitions/validatonObjectDefDeniedAllowed",
                                                                                  "optional":false
                                                                                },
                                                                                "tag": {
                                                                                  "type": "string",
                                                                                  "optional":false
                                                                                },
                                                                                "url": {
                                                                                  "type": "string",
                                                                                  "optional":false
                                                                                },
                                                                                "route": {
                                                                                  "$ref": "#/definitions/validatonObjectDefExcludeInclude",
                                                                                  "optional":false
                                                                                }
                                                                              }
                                                                            },
                                                                            "validatonObjectDefDeniedAllowed": {
                                                                              "type": "object",
                                                                              "additionalProperties": false,
                                                                              "required": [ "denied", "allowed" ],
                                                                              "properties": {
                                                                                "denied": {
                                                                                  "type": "string",
                                                                                  "optional":false
                                                                                },
                                                                                "allowed": {
                                                                                  "type": "string",
                                                                                  "optional":false
                                                                                }
                                                                              }
                                                                            },
                                                                            "validatonObjectDefExcludeInclude": {
                                                                              "type": "object",
                                                                              "additionalProperties": false,
                                                                              "required": [ "exclude", "include" ],
                                                                              "properties": {
                                                                                "exclude": {
                                                                                  "type": "array",
                                                                                  "optional":false,
                                                                                  "items": {
                                                                                    "type": "string"
                                                                                  }
                                                                                },
                                                                                "include": {
                                                                                  "type": "array",
                                                                                  "optional":false,
                                                                                  "items": {
                                                                                    "type": "string"
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      );

    static readonly _CONFIG_ENTRY_Frontend_Rules_EXAMPLE = JSON.stringify(
                                                                           {
                                                                             "#mobile-ionic5-sales-???#": {
                                                                               "userLoginControl": {
                                                                                 "denied": "",
                                                                                 "allowed": "#Final_Customers_01#,#Administrator#"
                                                                               },
                                                                               "userSignupControl": {
                                                                                 "denied": "",
                                                                                 "allowed": "#finalCustomer#"
                                                                               },
                                                                               "tag": "#mobile#,#phone#,#phone_android#,#phone_ios#,#tablet#,#tablet_android#,#tablet_ios#",
                                                                               "url": "http://mycompany.com/myapp/url/",
                                                                               "route": {
                                                                                 "exclude": [
                                                                                   "GET:/my/service",
                                                                                   "POST:/my/service2"
                                                                                 ],
                                                                                 "include": []
                                                                               }
                                                                             },
                                                                             "#web-reactjs-establisment-???#": {
                                                                               "userLoginControl": {
                                                                                 "denied": "",
                                                                                 "allowed": "#Establishment#,#Administrator#"
                                                                               },
                                                                               "userSignupControl": {
                                                                                 "denied": "",
                                                                                 "allowed": "#establishment#"
                                                                               },
                                                                               "tag": "#web#,#web_desktop#",
                                                                               "url": "http://mycompany.com/myapp/url/",
                                                                               "route": {
                                                                                 "exclude": [
                                                                                   "GET:/my/service",
                                                                                   "POST:/my/service2"
                                                                                 ],
                                                                                 "include": [
                                                                                   "Public:PUBLIC:GET:/my/other/service",
                                                                                   "Authenticated:AUTHENTICATED:POST:/my/other/duper/service"
                                                                                 ]
                                                                               }
                                                                             },
                                                                             "#web-reactjs-delivery-???#": {
                                                                               "userLoginControl": {
                                                                                 "denied": "",
                                                                                 "allowed": "#Dispachers#,#Administrator#"
                                                                               },
                                                                               "userSignupControl": {
                                                                                 "denied": "*",
                                                                                 "allowed": ""
                                                                               },
                                                                               "tag": "#web#,#web_desktop#",
                                                                               "url": "http://mycompany.com/myapp/url/",
                                                                               "route": {
                                                                                 "exclude": [
                                                                                   "GET:/my/service",
                                                                                   "POST:/my/service2"
                                                                                 ],
                                                                                 "include": [
                                                                                   "MyRole:ROLE:POST:/my/other/super/service"
                                                                                 ]
                                                                               }
                                                                             },
                                                                             "@__default__@": {
                                                                               "userLoginControl": {
                                                                                 "denied": "",
                                                                                 "allowed": "*"
                                                                               },
                                                                               "userSignupControl": {
                                                                                 "denied": "",
                                                                                 "allowed": "*"
                                                                               },
                                                                               "tag": "#web#,#mobile#,#phone#,#tablet#",
                                                                               "url": "http://mycompany.com/myapp/url/",
                                                                               "route": {
                                                                                 "exclude": [
                                                                                   "*"
                                                                                 ],
                                                                                 "include": []
                                                                               }
                                                                             }
                                                                           }
                                                                         );

  static readonly _CONFIG_ENTRY_Frontend_Rules = {
                                                   Id: "70835d21-afdd-4f5b-9a56-61762ba55013",
                                                   Scope: "system",
                                                   Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                   Category: "Frontend Rules",
                                                   Name: "system.frontend.rules",
                                                   Default: JSON.stringify(
                                                                            {
                                                                              "@__default__@":{
                                                                                "userLoginControl":{
                                                                                  "denied":"",
                                                                                  "allowed":"*"
                                                                                },
                                                                                "userSignupControl":{
                                                                                  "denied":"",
                                                                                  "allowed":"*"
                                                                                },
                                                                                "userRecoverPasswordControl":{
                                                                                  "denied":"",
                                                                                  "allowed":"*"
                                                                                },
                                                                                "tag":"#web#,#mobile#,#phone#,#tablet#",
                                                                                "url":"http://mycompany.com/myapp/url/",
                                                                                "route":{
                                                                                  "exclude":[
                                                                                  ],
                                                                                  "include":[
                                                                                    "*"
                                                                                  ]
                                                                                }
                                                                              }
                                                                            }
                                                                          ),
                                                   Label: "Configuration for different frontend clients id rules",
                                                   Description: "Configuration for different frontend clients id rules",
                                                   AllowTagAccessR: "#Administrator#",
                                                   AllowTagAccessW: "#Administrator#",
                                                   Example: SystemConstants._CONFIG_ENTRY_Frontend_Rules_EXAMPLE,
                                                   CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                   ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_Frontend_Rules_SCHEMA}" }`
                                                 };

  static readonly _CONFIG_ENTRY_General_Default_Information_SCHEMA = "";

  static readonly _CONFIG_ENTRY_General_Default_Information = {
                                                                Id: "e3383f42-9f78-40c5-8415-42b51da54196",
                                                                Scope: "system",
                                                                Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                                Category: "General",
                                                                Name: "system.general.default.information",
                                                                Default: JSON.stringify(
                                                                                         {
                                                                                           "no_response_email":"no-response@mycompany.com",
                                                                                           "company_name":"MY COMPANY LLC",
                                                                                           "company_address":"1234N Murdock St, Coral Gables, FL98284, Florida, USA, Office 102",
                                                                                           "company_zip_code":"FL98284",
                                                                                           "company_phone":"1-989-345-6789, 1-456-345-6789",
                                                                                           "company_web":"https://www.mycompanyweb.com, https://www.othercompanyweb.com",
                                                                                           "company_email":"admin@mycompany.com, other@mydomain.com"
                                                                                         }
                                                                                       ),
                                                                Label: "Configuration for default values",
                                                                Description: "Configuration for default values",
                                                                AllowTagAccessR: "#Administrator#",
                                                                AllowTagAccessW: "#Administrator#",
                                                                Example: JSON.stringify(
                                                                                         {
                                                                                           "no_response_email":"no-response@mycompany.com",
                                                                                           "company_name":"MY COMPANY LLC",
                                                                                           "company_address":"1234N Murdock St, Coral Gables, FL98284, Florida, USA, Office 102",
                                                                                           "company_zip_code":"FL98284",
                                                                                           "company_phone":"1-989-345-6789, 1-456-345-6789",
                                                                                           "company_web":"https://www.mycompanyweb.com, https://www.othercompanyweb.com",
                                                                                           "company_email":"admin@mycompany.com, other@mydomain.com"
                                                                                         }
                                                                                       ),
                                                                CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                                ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_General_Default_Information_SCHEMA}" }`
                                                              };

  static readonly _CONFIG_ENTRY_General_User_Settings_SCHEMA = "";

  static readonly _CONFIG_ENTRY_General_User_Settings = {
                                                          Id: "09749c7d-5514-4635-8c19-c272747cf193",
                                                          Scope: "user",
                                                          Owner: SystemConstants._USER_BACKEND_SYSTEM_NET_NAME,
                                                          Category: "User",
                                                          Name: "system.general.user.settings",
                                                          Default: JSON.stringify(
                                                                                   {
                                                                                     "entry":"value"
                                                                                   }
                                                                                 ),
                                                          Label: "Configuration for user settings values",
                                                          Description: "Configuration for user settings values",
                                                          AllowTagAccessR: "#Administrator#",
                                                          AllowTagAccessW: "#Administrator#",
                                                          Example: JSON.stringify(
                                                                                   {
                                                                                     "entry":"value"
                                                                                   }
                                                                                 ),
                                                          CreatedBy: SystemConstants._CREATED_BY_BACKEND_SYSTEM_NET,
                                                          ExtraData: `{ "Type": "struct/json", "Schema": "${SystemConstants._CONFIG_ENTRY_General_Default_Information_SCHEMA}" }`
                                                        };

  static readonly _CONFIG_METADATA_ENTRIES = [
                                               SystemConstants._CONFIG_ENTRY_ExpireTimeAuthentication,
                                               SystemConstants._CONFIG_ENTRY_PasswordStrengthParameters,
                                               SystemConstants._CONFIG_ENTRY_BinaryDataBasePath,
                                               SystemConstants._CONFIG_ENTRY_BinaryDataMaximumSize,
                                               SystemConstants._CONFIG_ENTRY_BinaryDataAllowedCategory,
                                               SystemConstants._CONFIG_ENTRY_BinaryDataAllowedMimeType,
                                               SystemConstants._CONFIG_ENTRY_BinaryDataDefaultOwner,
                                               SystemConstants._CONFIG_ENTRY_BinaryDataThumbnail,
                                               SystemConstants._CONFIG_ENTRY_BinaryDataProcess,
                                               SystemConstants._CONFIG_ENTRY_UserSignupProcess,
                                               SystemConstants._CONFIG_ENTRY_UserAutoRoleAssign,
                                               SystemConstants._CONFIG_ENTRY_EMail_Service,
                                               SystemConstants._CONFIG_ENTRY_SMS_Service,
                                               SystemConstants._CONFIG_ENTRY_Push_Service,
                                               SystemConstants._CONFIG_ENTRY_Frontend_Rules,
                                               SystemConstants._CONFIG_ENTRY_General_Default_Information,
                                               SystemConstants._CONFIG_ENTRY_MAP_GEOCODE_Service,
                                               SystemConstants._CONFIG_ENTRY_MAP_DISTANCE_Service,
                                               SystemConstants._CONFIG_ENTRY_General_User_Settings
                                             ];

}
