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
import Detail from '../model/Detail';
import ProductIn from '../model/ProductIn';
import ProductOut from '../model/ProductOut';

/**
* Product service.
* @module api/ProductApi
* @version 1.0.0
*/
export default class ProductApi {

    /**
    * Constructs a new ProductApi. 
    * @alias module:api/ProductApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the ab50e2adControllerGetProduct operation.
     * @callback module:api/ProductApi~ab50e2adControllerGetProductCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProductOut} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Product
     * @param {Number} productId 
     * @param {module:api/ProductApi~ab50e2adControllerGetProductCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProductOut}
     */
    ab50e2adControllerGetProduct(productId, callback) {
      let postBody = null;
      // verify the required parameter 'productId' is set
      if (productId === undefined || productId === null) {
        throw new Error("Missing the required parameter 'productId' when calling ab50e2adControllerGetProduct");
      }

      let pathParams = {
        'product_id': productId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = ProductOut;
      return this.apiClient.callApi(
        '/api/products/{product_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the call7b55df3eControllerListProducts operation.
     * @callback module:api/ProductApi~call7b55df3eControllerListProductsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ProductOut>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Products
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit  (default to 100)
     * @param {Number} opts.offset  (default to 0)
     * @param {module:api/ProductApi~call7b55df3eControllerListProductsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ProductOut>}
     */
    call7b55df3eControllerListProducts(opts, callback) {
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

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [ProductOut];
      return this.apiClient.callApi(
        '/api/products', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the call92b6613eControllerUpdateProduct operation.
     * @callback module:api/ProductApi~call92b6613eControllerUpdateProductCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProductOut} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Product
     * @param {Number} productId 
     * @param {module:model/ProductIn} productIn 
     * @param {module:api/ProductApi~call92b6613eControllerUpdateProductCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProductOut}
     */
    call92b6613eControllerUpdateProduct(productId, productIn, callback) {
      let postBody = productIn;
      // verify the required parameter 'productId' is set
      if (productId === undefined || productId === null) {
        throw new Error("Missing the required parameter 'productId' when calling call92b6613eControllerUpdateProduct");
      }
      // verify the required parameter 'productIn' is set
      if (productIn === undefined || productIn === null) {
        throw new Error("Missing the required parameter 'productIn' when calling call92b6613eControllerUpdateProduct");
      }

      let pathParams = {
        'product_id': productId
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
      let returnType = ProductOut;
      return this.apiClient.callApi(
        '/api/products/{product_id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the call9e9747e7ControllerDeleteProduct operation.
     * @callback module:api/ProductApi~call9e9747e7ControllerDeleteProductCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Detail} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Product
     * @param {Number} productId 
     * @param {module:api/ProductApi~call9e9747e7ControllerDeleteProductCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Detail}
     */
    call9e9747e7ControllerDeleteProduct(productId, callback) {
      let postBody = null;
      // verify the required parameter 'productId' is set
      if (productId === undefined || productId === null) {
        throw new Error("Missing the required parameter 'productId' when calling call9e9747e7ControllerDeleteProduct");
      }

      let pathParams = {
        'product_id': productId
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
        '/api/products/{product_id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the f1809f5bControllerCreateProduct operation.
     * @callback module:api/ProductApi~f1809f5bControllerCreateProductCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProductOut} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Product
     * @param {module:model/ProductIn} productIn 
     * @param {module:api/ProductApi~f1809f5bControllerCreateProductCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProductOut}
     */
    f1809f5bControllerCreateProduct(productIn, callback) {
      let postBody = productIn;
      // verify the required parameter 'productIn' is set
      if (productIn === undefined || productIn === null) {
        throw new Error("Missing the required parameter 'productIn' when calling f1809f5bControllerCreateProduct");
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
      let returnType = ProductOut;
      return this.apiClient.callApi(
        '/api/products', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
