import alertState from "../store/alert/index.js";
// DON'T DO THIS
// const alert = alertState() // register as an interface
const illegal = [".", "#", "$", "[", "]"];

function geneticInputCheck(inputObject) {
  const alert = alertState();
  if (
    Object.values(inputObject).some(
      (value) => value === "" || [...value].some((w) => illegal.includes(w))
    )
  ) {
    alert.title = "Input check failed";
    alert.content = "Empty Fields or illegal fields";
    return false;
  }
  return true;
}

export { geneticInputCheck };
