/**
 * Blueprint API Configuration
 * (sails.config.blueprints)
 *
 * These settings are for the global configuration of blueprint routes and
 * request options (which impact the behavior of blueprint actions).
 *
 * You may also override any of these settings on a per-controller basis
 * by defining a '_config' key in your controller defintion, and assigning it
 * a configuration object with overrides for the settings in this file.
 * A lot of the configuration options below affect so-called "CRUD methods",
 * or your controllers' `find`, `create`, `update`, and `destroy` actions.
 *
 * It's important to realize that, even if you haven't defined these yourself, as long as
 * a model exists with the same name as the controller, Sails will respond with built-in CRUD
 * logic in the form of a JSON API, including support for sort, pagination, and filtering.
 *
 * For more information on the blueprint API, check out:
 * http://sailsjs.org/#!/documentation/reference/blueprint-api
 *
 * For more information on the settings in this file, see:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.blueprints.html
 *
 */

module.exports.blueprints = {
  actions: true,
  // parseBlueprintOptions(req) {
  //   // Get the default query options.
  //   let populate = req.param('populate');
  //   // frontend may send populate as an array, so we convert to a string for parseBlueprintOptions to handle seamlessly
  //   if (_.isArray(populate)) {
  //     populate = _.toString(populate);
  //     req.params.populate = populate;
  //   }
  //   const queryOptions = req._sails.hooks.blueprints.parseBlueprintOptions(req);
  //   // if populate is not set, set it to an empty object so we dont auto populate foreign keys in the response
  //   if (!populate) {
  //     queryOptions.populates = {};
  //   }

  //   // If this is the "find" or "populate" blueprint action, and the normal query options
  //   // indicate that the request is attempting to set an exceedingly high `limit` clause or no `limit`,
  //   // then prevent it (we'll say `limit` must not exceed 100).
  //   if (req.options.blueprintAction === 'find' || req.options.blueprintAction === 'populate') {
  //     if (!queryOptions.criteria.limit) {
  //       queryOptions.criteria.limit = 1;
  //     } else if (queryOptions.criteria.limit <= 0) {
  //       queryOptions.criteria.limit = 0;
  //     } else if (queryOptions.criteria.limit > 9999) {
  //       queryOptions.criteria.limit = 9999;
  //     }
  //   }
  //   return queryOptions;
  // },

};
