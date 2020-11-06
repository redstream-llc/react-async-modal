# React async Modal
A simple tool for creating modal with Promise-style usage based on `react-responsive-modal`

Install
-----------
* yarn: `yarn add react-async-modal`
* npm: `npm i react-async-modal --save`

API
---
```js
const promise = createModal(Component, componentProps, modalProps);
```

Basic usage
-----------
```jsx
import asyncModal from 'react-async-modal';
// ...
class MyConfirm extends React.Component {
  render() {
    return <div>
      <h1>{this.props.question}</h1>
      <button onClick={()=>this.props.resolve(true)}>Confirm</button>
      <button onClick={()=>this.props.close()}>Close</button>
    </div>  
  }
}
// async/await style
const result = await createModal(MyConfirm, { question: 'Delete file?' });
console.log(result);

// Promise style
createModal(MyConfirm, { question: 'Delete file?' }).then((payload) => {
  if(payload) {
      console.log('File was deleted!');
  }
});
```
Two methods will be injected in `props` of `MyConfirm`
* `resolve` method to send payload and close modal
* `close` method to send `null` as payload and close modal 

Modal customization
-------------------
Use `modalProps` argument to pass props to `react-responsive-modal`

Available props: https://react-responsive-modal.leopradel.com/#props
