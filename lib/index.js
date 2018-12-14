"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
/**
 * unmount component from DOM
 * @param node mount point
 */
function unmount(node) {
    ReactDOM.unmountComponentAtNode(node);
    if (node && node.parentNode) {
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
    document.body.appendChild(el);
    var node = React.cloneElement(element, {
        destroy: function () { return unmount(el); }
    });
    if (parent) {
        parent.appendChild(el);
    }
    else {
        document.body.appendChild(el);
    }
    ReactDOM.render(node, el);
    return function () {
        unmount(el);
    };
}
exports.default = mount;
