import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

let defaultModalProps = {};

class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.component = React.cloneElement(this.props.component, { resolve: this.resolve.bind(this), close: this.close.bind(this) });
  }

  resolve(payload) {
    this.setState({open: false}, () => {
      this.props.resolve(payload);
      this.props.div && this.props.div.parentNode ? this.props.div.parentNode.removeChild(this.props.div) : null;
    });
  }

  close() {
    return this.resolve(null);
  }

  render() {
    return React.createElement(Modal, Object.assign({}, {
      onClose: this.close.bind(this),
      open: this.state.open,
      children: this.component,
    } , this.props.modalProps));
  }
}

const asyncModal = (component, props = {}, modalProps = {}) => {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = React.createElement(ModalWrapper, {
      div,
      resolve,
      component: React.createElement(component, props),
      modalProps: Object.assign({}, defaultModalProps, modalProps),
    });
    ReactDOM.render(wrapper, div);
  });
};

asyncModal.setDefaultModalProps = (modalProps) => {
  defaultModalProps = modalProps;
}

export default asyncModal;
