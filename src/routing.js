import {
  Quantities,
  ResourceVerbMappings,
  ExpressRouterMappings
} from "./routing/constants";

const canRespondTo = (handler, action) =>
  handler.prototype && handler.prototype.hasOwnProperty(action);

const respond = (resource, response, markup) => {
  response.set(resource.headers);
  response.status(resource.status).end(markup);
};

const stepFailed = e => {
  throw e;
};

const urlForQuantity = (resource, quantity) =>
  quantity === Quantities.SINGLE ? `${resource}/:id/:stub?` : resource;

const handleByProxy = (handler, callable) => {
  return (req, res) => {
    const params = { ...req.query, ...(req.params || {}) };
    const resource = new handler({ params });
    const result = resource[callable].call(resource, params);
    let step;

    if (result instanceof Promise) {
      step = result.then(() => resource.beforeRender(resource), stepFailed);
    } else {
      step = resource.beforeRender(resource);
    }

    step
      .then(res => res.view.render(), stepFailed)
      .then(output => resource.afterRender(output), stepFailed)
      .then(markup => respond(resource, res, markup), stepFailed);
  };
};

const routeAppTo = (app, method, url, handler) =>
  app[ExpressRouterMappings[method]](url, handler);

export const getPatternApplier = (app, resources) => {
  return resource => {
    const handler = resources[resource];

    Object.keys(ResourceVerbMappings).forEach(verb => {
      const mapping = ResourceVerbMappings[verb];

      if (mapping.constructor !== String) {
        Object.keys(ResourceVerbMappings[verb]).forEach(qty => {
          if (canRespondTo(handler, ResourceVerbMappings[verb][qty])) {
            routeAppTo(
              app,
              verb,
              urlForQuantity(resource, qty),
              handleByProxy(handler, ResourceVerbMappings[verb][qty])
            );
          }
        });
      } else {
        if (canRespondTo(handler, ResourceVerbMappings[verb])) {
          routeAppTo(
            app,
            verb,
            urlForQuantity(resource, Quantities.SINGLE),
            handleByProxy(handler, ResourceVerbMappings[verb])
          );
        }
      }
    });
  };
};

export const applyRoutingPatterns = (app, resources) => {
  Object.keys(resources).forEach(getPatternApplier(app, resources));
};
