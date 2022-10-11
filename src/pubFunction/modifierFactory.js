// modelModifiers handler

function modifierFactory(props, emits, keyword) {
  return function (e) {
    let value = e.target.value;
    if (props[`${keyword}Modifiers`]["capitalize"]) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (props[`${keyword}Modifiers`]["trim"]) {
      value = value.trim();
    }

    emits(`update:${keyword}`, value);
  };
}
export default modifierFactory;
