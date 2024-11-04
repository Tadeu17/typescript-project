export function Autobind(
  _: any,
  _2: string,
  propDescriptor: PropertyDescriptor
) {
  const originalMethod = propDescriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
