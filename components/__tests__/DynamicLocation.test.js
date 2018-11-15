import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DynamicLocation from '../DynamicLocation';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-maps', () => {
  const React = require('react');
  return class MockMapView extends React.Component {
    static Marker = props => React.createElement('Marker', props, props.children);

    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  };
});

test('Renders DynamicLocation component', () => {
  const snapshot = renderer.create(<DynamicLocation />).toJSON();
  expect(snapshot).toMatchSnapshot();
});
