# React Async Modal
A simple tool for creating modals with Promise style usage based on `react-responsive-modal`

Install
-----------
* yarn: `yarn add react-async-modal`
* npm: `npm i react-async-modal --save`

Usage example
-------------
```jsx
import asyncModal from 'react-async-modal';

// Setup default modal settings (optional)
asyncModal.setDefaultModalProps({
  showCloseIcon: false,
  style: {
    modal: {
      width: 500
    }
  }
});

// Defining modal component
class MyConfirm extends React.Component {
  render() {
    return <div>
      <h1>{this.props.question}</h1>
      <button onClick={()=>this.props.resolve(true)}>Confirm</button>
      <button onClick={()=>this.props.close()}>Close</button>
    </div>  
  }
}

// Calling modal with async/await style
const result = await asyncModal(MyConfirm, { question: 'Delete file?' });
console.log(result);

// Or with Promise style
asyncModal(MyConfirm, { question: 'Delete file?' }).then((payload) => {
  if(payload) {
      console.log('File was deleted!');
  }
});
```
There are two methods will be injected to `props` of `MyConfirm` component:
* `resolve` method to send payload and close modal
* `close` method to send `null` as payload and close modal 

Modal customization
-------------------
Use `modalProps` argument or `asyncModal.setDefaultModalProps()` method to pass props to `react-responsive-modal`

Available props: https://react-responsive-modal.leopradel.com/#props
