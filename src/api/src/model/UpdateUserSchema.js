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

import ApiClient from '../ApiClient';

/**
 * The UpdateUserSchema model module.
 * @module model/UpdateUserSchema
 * @version 1.0.0
 */
class UpdateUserSchema {
    /**
     * Constructs a new <code>UpdateUserSchema</code>.
     * @alias module:model/UpdateUserSchema
     * @param teamId {Number} 
     */
    constructor(teamId) { 
        
        UpdateUserSchema.initialize(this, teamId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, teamId) { 
        obj['team_id'] = teamId;
    }

    /**
     * Constructs a <code>UpdateUserSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateUserSchema} obj Optional instance to populate.
     * @return {module:model/UpdateUserSchema} The populated <code>UpdateUserSchema</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UpdateUserSchema();

            if (data.hasOwnProperty('role')) {
                obj['role'] = ApiClient.convertToType(data['role'], 'String');
            }
            if (data.hasOwnProperty('first_name')) {
                obj['first_name'] = ApiClient.convertToType(data['first_name'], 'String');
            }
            if (data.hasOwnProperty('last_name')) {
                obj['last_name'] = ApiClient.convertToType(data['last_name'], 'String');
            }
            if (data.hasOwnProperty('team_id')) {
                obj['team_id'] = ApiClient.convertToType(data['team_id'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * @member {String} role
 * @default 'PLAYER'
 */
UpdateUserSchema.prototype['role'] = 'PLAYER';

/**
 * @member {String} first_name
 */
UpdateUserSchema.prototype['first_name'] = undefined;

/**
 * @member {String} last_name
 */
UpdateUserSchema.prototype['last_name'] = undefined;

/**
 * @member {Number} team_id
 */
UpdateUserSchema.prototype['team_id'] = undefined;






export default UpdateUserSchema;

