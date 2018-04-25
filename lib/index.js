"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
/**
 * unmount component from DOM
 * @param node mount point
 */
function unmount(node) {
    ReactDOM.unmountComponentAtNode(node);
    if (node) {
        node.parentNode.removeChild(node);
    }
}
/**
 * mount React component to DOM
 * @param element JSX Element that wanted to mount
 * @param parent mount point
 */
function mount(element, parent) {
    var el = document.createElement('div');
    if (parent) {
        parent.appendChild(el);
    }
    else {
        document.body.appendChild(el);
    }
    ReactDOM.render(element, el);
    return function () {
        unmount(el);
    };
}
exports.default = mount;
