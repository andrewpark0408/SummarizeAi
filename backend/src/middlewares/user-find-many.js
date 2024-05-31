'use strict';

/**
 * `user-find-many` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In user-find-many middleware.');

    const currentUserId = ctx.state?.user?.id;

    if (!currentUserId) {
      strapi.log.error("You are not authenticated");
      return ctx.unauthorized('You are not authenticated');
    }


    ctx.query = {
      ...ctx.query,
      filters: { ...ctx.query.filters, user: currentUserId },
    }

    await next();
  };
};
