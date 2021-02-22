export type ComponentProps<T = HTMLElement> = {
    name: string;
    component: T;
}

namespace Component {
    export class Default {
        nRootName: string;
        nRoot: HTMLElement;
        destroy: () => void;
    
        constructor({ name, component }: ComponentProps) {
            this.nRootName = name;
            this.nRoot = component;
        }

        getElement = (name: string) => this.nRoot.querySelector(`.${this.nRootName}__${name}`);
    
        getElements = (name: string) => Array.from(this.nRoot.querySelectorAll(`.${this.nRootName}__${name}`));
    }

    export const getComponent = (name: string, target: Document | HTMLElement = document): ComponentProps => ({
        name,
        component: target.querySelector(`.${name}`)
    })

    export const getComponents = (name: string, target: Document | HTMLElement = document): ComponentProps[] =>
        Array.from(target.querySelectorAll(`.${name}`))
            .map((component: HTMLElement) => ({
                name,
                component
            }));
}

export const { getComponent, getComponents } = Component;
export default Component;