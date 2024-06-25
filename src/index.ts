import React, {ComponentClass, ComponentElement, ComponentProps, FunctionComponent} from 'react';
import ReactDOM from 'react-dom';
import Modal, {ModalProps} from 'react-responsive-modal';

let defaultModalProps = {};

class ModalWrapper extends React.Component<{
  div: HTMLDivElement;
  component: ComponentElement<any, any>;
  resolve(payload?: any): void;
  close(): void;
  modalProps: ModalProps;
}> {
  component: ComponentElement<any, any>;
  state = {
    open: true,
  };

  constructor(props: ComponentProps<any>) {
    super(props);

    this.component = React.cloneElement(this.props.component, {
      resolve: this.resolve.bind(this),
      close: this.close.bind(this),
    });
  }

  resolve(payload: any) {
    this.setState({open: false}, () => {
      this.props.resolve(payload);
      if (this.props.div && this.props.div.parentNode) {
        this.props.div.parentNode.removeChild(this.props.div);
      }
    });
  }

  close() {
    return this.resolve(null);
  }

  render() {
    return React.createElement(Modal, {
      ...{
        onClose: this.close.bind(this),
        open: this.state.open,
        children: this.component,
      },
      ...(this.props.modalProps || {}),
    });
  }
}

const asyncModal = (
  component: ComponentClass<any> | FunctionComponent<any>,
  props: ComponentProps<typeof component> = {},
  modalProps?: Partial<ModalProps>
): Promise<any | null> => {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = React.createElement(ModalWrapper, {
      div,
      resolve,
      component: React.createElement(component, props),
      modalProps: {...defaultModalProps, ...(modalProps || {})},
    });
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(wrapper, div);
  });
};

asyncModal.setDefaultModalProps = (modalProps: Partial<ModalProps>) => {
  defaultModalProps = modalProps;
};

export default asyncModal;
