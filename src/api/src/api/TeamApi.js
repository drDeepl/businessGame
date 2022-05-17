/**
 * NinjaExtraAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import CreateTeamSchema from '../model/CreateTeamSchema';
import Detail from '../model/Detail';
import PlayerTeamSchema from '../model/PlayerTeamSchema';
import TeamOutSchema from '../model/TeamOutSchema';
import UserOut from '../model/UserOut';

/**
* Team service.
* @module api/TeamApi
* @version 1.0.0
*/
export default class TeamApi {

    /**
    * Constructs a new TeamApi. 
    * @alias module:api/TeamApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the bebc375eControllerCreateTeam operation.
     * @callback module:api/TeamApi~bebc375eControllerCreateTeamCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TeamOutSchema} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Team
     * @param {module:model/CreateTeamSchema} createTeamSchema 
     * @param {module:api/TeamApi~bebc375eControllerCreateTeamCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/TeamOutSchema}
     */
    bebc375eControllerCreateTeam(createTeamSchema, callback) {
      let postBody = createTeamSchema;
      // verify the required parameter 'createTeamSchema' is set
      if (createTeamSchema === undefined || createTeamSchema === null) {
        throw new Error("Missing the required parameter 'createTeamSchema' when calling bebc375eControllerCreateTeam");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['JWTAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = TeamOutSchema;
      return this.apiClient.callApi(
        '/api/teams/', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the c70f3befControllerGetParticipants operation.
     * @callback module:api/TeamApi~c70f3befControllerGetParticipantsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UserOut>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Participants
     * @param {Number} teamId 
     * @param {module:api/TeamApi~c70f3befControllerGetParticipantsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UserOut>}
     */
    c70f3befControllerGetParticipants(teamId, callback) {
      let postBody = null;
      // verify the required parameter 'teamId' is set
      if (teamId === undefined || teamId === null) {
        throw new Error("Missing the required parameter 'teamId' when calling c70f3befControllerGetParticipants");
      }

      let pathParams = {
        'team_id': teamId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['JWTAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [UserOut];
      return this.apiClient.callApi(
        '/api/teams/{team_id}/participants', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the call29c859d3ControllerGetTeam operation.
     * @callback module:api/TeamApi~call29c859d3ControllerGetTeamCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TeamOutSchema} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Team
     * @param {Number} teamId 
     * @param {module:api/TeamApi~call29c859d3ControllerGetTeamCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/TeamOutSchema}
     */
    call29c859d3ControllerGetTeam(teamId, callback) {
      let postBody = null;
      // verify the required parameter 'teamId' is set
      if (teamId === undefined || teamId === null) {
        throw new Error("Missing the required parameter 'teamId' when calling call29c859d3ControllerGetTeam");
      }

      let pathParams = {
        'team_id': teamId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['JWTAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = TeamOutSchema;
      return this.apiClient.callApi(
        '/api/teams/{team_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the call395b31aaControllerGetTeams operation.
     * @callback module:api/TeamApi~call395b31aaControllerGetTeamsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/TeamOutSchema>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Teams
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit  (default to 100)
     * @param {Number} opts.offset  (default to 0)
     * @param {module:api/TeamApi~call395b31aaControllerGetTeamsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/TeamOutSchema>}
     */
    call395b31aaControllerGetTeams(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['JWTAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [TeamOutSchema];
      return this.apiClient.callApi(
        '/api/teams', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the call558a1e23ControllerRenameTeam operation.
     * @callback module:api/TeamApi~call558a1e23ControllerRenameTeamCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TeamOutSchema} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Rename Team
     * @param {Number} teamId 
     * @param {String} name 
     * @param {module:api/TeamApi~call558a1e23ControllerRenameTeamCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/TeamOutSchema}
     */
    call558a1e23ControllerRenameTeam(teamId, name, callback) {
      let postBody = null;
      // verify the required parameter 'teamId' is set
      if (teamId === undefined || teamId === null) {
        throw new Error("Missing the required parameter 'teamId' when calling call558a1e23ControllerRenameTeam");
      }
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling call558a1e23ControllerRenameTeam");
      }

      let pathParams = {
        'team_id': teamId,
        'name': name
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['JWTAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = TeamOutSchema;
      return this.apiClient.callApi(
        '/api/teams/{team_id}/{name}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the call602c69b0ControllerRemoveTeam operation.
     * @callback module:api/TeamApi~call602c69b0ControllerRemoveTeamCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Detail} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove Team
     * @param {Number} teamId 
     * @param {module:api/TeamApi~call602c69b0ControllerRemoveTeamCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Detail}
     */
    call602c69b0ControllerRemoveTeam(teamId, callback) {
      let postBody = null;
      // verify the required parameter 'teamId' is set
      if (teamId === undefined || teamId === null) {
        throw new Error("Missing the required parameter 'teamId' when calling call602c69b0ControllerRemoveTeam");
      }

      let pathParams = {
        'team_id': teamId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['JWTAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Detail;
      return this.apiClient.callApi(
        '/api/teams/{team_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the call822d7433ControllerMovePlayer operation.
     * @callback module:api/TeamApi~call822d7433ControllerMovePlayerCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Detail} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Move Player
     * @param {module:model/PlayerTeamSchema} playerTeamSchema 
     * @param {module:api/TeamApi~call822d7433ControllerMovePlayerCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Detail}
     */
    call822d7433ControllerMovePlayer(playerTeamSchema, callback) {
      let postBody = playerTeamSchema;
      // verify the required parameter 'playerTeamSchema' is set
      if (playerTeamSchema === undefined || playerTeamSchema === null) {
        throw new Error("Missing the required parameter 'playerTeamSchema' when calling call822d7433ControllerMovePlayer");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['JWTAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Detail;
      return this.apiClient.callApi(
        '/api/teams/', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
