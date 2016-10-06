import Ember from 'ember';

export default Ember.Route.extend({
  // permalink query param
  queryParams: {
    permalink: {
      refreshModel: true,
      replace: true,
      as: 'e'
    }
  },

  // if there is no record in the store and no query param is passed, then create a default new record
  // if there is a query parm, load the record from the server
  model(params) {
    if (!params.permalink && !this.store.peekAll('cfg').content.length) {
      return this.store.createRecord('cfg');
    }

    return this.store.findRecord('cfg', params.permalink).then(cfg => {
      const attrs = cfg.toJSON();
      this.store.unloadRecord(cfg);
      let record = this.store.createRecord('cfg', attrs);
      record.set('permalink', null);
      return record;
    });
  },

  // clears the query param when exiting the route
  resetController(controller, isExiting) {
    if (isExiting) {
      const queryParams = controller.get('queryParams');
      for (let i = 0; i < queryParams.length; i++) {
        controller.set(`${queryParams[i]}`, null);
      }
    }
  },

  actions: {
    // redirects to the index page if there is an error importing a config file from the server
    error(error) {
      Ember.get(this, 'flashMessages').danger('The requested file could not be found.', { timeout: 6000 });
      return this.transitionTo('index');
    }
  }
});
