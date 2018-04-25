/// <reference types="react" />
/**
 * mount React component to DOM
 * @param element JSX Element that wanted to mount
 * @param parent mount point
 */
export default function mount(element: JSX.Element, parent?: Element): () => void;
