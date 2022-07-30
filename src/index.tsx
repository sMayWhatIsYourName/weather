import ReactDOM from 'react-dom/client';
import init from './init';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const vDom = init();
root.render(vDom);
