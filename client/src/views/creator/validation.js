export default function validate(form) {
  console.log(form);
  const errors = {};

  if (/^[0-9]+$/.test(form.name)) {
    errors.name = "No hay razas que contengan números";
  }
  if (/^[A-Za-z\s]+$/.test(form.alturaMax)) {
    //el '*' es para que incluya el estar vacio como error
    errors.alturaMax = "Taaan alto, iba a ser?";
  }
  if (form.alturaMin > form.alturaMax) {
    errors.alturaMin = "Checkeá bien los valores...";
    errors.alturaMax = "Checkeá bien los valores...";
  }
  if (form.pesoMin > form.pesoMax) {
    errors.pesoMax = "Checkeá bien los valores...";
    errors.pesoMin = "Checkeá bien los valores...";
  }
  //   if (/^[A-Za-z\s]*$/.test(form.pesoMax)) {
  //     errors.pesoMax = "Taaan pesado, iba a ser?";
  //   }
  //   if (/^[A-Za-z\s]*$/.test(form.pesoMin)) {
  //     errors.pesoMin = "Taaan liviano, iba a ser?";
  //   }
  return errors;
}
