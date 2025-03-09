export namespace ControllerRegistry {
  export const controllers = new Map();

  export const resolve = <C>(controller: { create(): C }): C => {
    let instance = controllers.get(controller);

    if (instance === undefined) {
      instance = controller.create();
      controllers.set(controller, instance);
    }

    return instance;
  };
}
