/// <reference types="react" />
export declare type Unmount = () => void;
export interface MountReactProps {
    destroy?: Unmount;
}
/**
 * mount React component to DOM
 * @param element JSX Element that wanted to mount
 * @param parent mount point
 */
export default function mount(element: JSX.Element, parent?: Element): Unmount;
