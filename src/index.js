import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.component = React.cloneElement(this.props.component, { resolve: this.resolve, close: this.close });
  }

  resolve = (payload) => {
    this.setState({ open: false }, () => {
      this.props.resolve(payload);
      this.props.div?.parentNode?.removeChild(this.props.div);
    });
  };

  close = () => {
    return this.resolve(null);
  };

  render = () => {
    return React.createElement(Modal, {
      ...this.props.modalProps,
      onClose: this.close,
      open: this.state.open,
      children: this.component,
    });
  };
}

export const asyncModal = (component, props = {}, modalProps = {}) => {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = React.createElement(ModalWrapper, {
      div,
      resolve,
      component: React.createElement(component, props),
      modalProps,
    });
    ReactDOM.render(wrapper, div);
  });
};
