// 3p
import React from 'react';
import Enzyme, { shallow, mount, ReactWrapper, ShallowWrapper } from 'enzyme';


type Wrapper = ShallowWrapper | ReactWrapper;

interface SetupSelectorsShape {
	[key: string]: (wrapper: Wrapper) => Wrapper;
}

interface Options<C extends React.ComponentType<P>, P> {
	contextComponent: C;
	contextProps: P;
}

export const createSetup = <
	ComponentProps extends {},
	Component extends React.ComponentType<ComponentProps>,
	ContextProps extends {},
	ContextComponent extends React.ComponentType<ContextProps>,
	SetupSelectors extends SetupSelectorsShape,
>(
	Component: Component, 
	initialProps: ComponentProps, 
	selectors?: SetupSelectors,
	options?: Options<ContextComponent, ContextProps>,
) => {
  return <
		ProcessedSelectors extends { [key in keyof SetupSelectors]: Wrapper }
	>(
		overrideProps?: Partial<ComponentProps>, 
		overrideContextProps?: ContextProps,
		forceMount: boolean = false,
	) => {
    const props = { ...(initialProps as {}), ...((overrideProps || {}) as {}) };
    const contextProps = options && options.contextComponent 
    		? { ...((options.contextProps || {}) as {}), ...((overrideContextProps || {}) as {}) } 
    		: null;
    const ContextComponent = options && options.contextComponent 
    		? options.contextComponent 
    		: null;
    const ComponentToRender = contextProps && ContextComponent 
    		? <ContextComponent {...contextProps}>
    				<Component {...props} />
    			</ContextComponent>
    		: <Component {...props} />;

    const wrapper = forceMount || (contextProps && ContextComponent)
    		? mount(ComponentToRender)
    		: shallow(ComponentToRender);
    		
    const processedSelectors = {} as any;
    if (selectors) {
    	Object.keys(selectors)
    		.forEach((key) => {
    			processedSelectors[key] = selectors[key](wrapper)
    		})
    }

    return {
      props, 
      wrapper,
      ...processedSelectors as ProcessedSelectors
    } as {
    	props: ComponentProps;
    	wrapper: Wrapper;
    } & ProcessedSelectors;
	}
}


export const itRenders = (
	wrapper: Wrapper
) => {
	it('renders', () => {
		expect(wrapper.exists()).toBe(true);
	})
}

