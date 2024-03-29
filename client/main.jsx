import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/containers/App/index';

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});
