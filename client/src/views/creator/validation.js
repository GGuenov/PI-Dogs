export default function validate(form) {
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
  if (!form.temperament) {
    errors.temperament = "Debes ingresar un temperamento";
  }

  const allowedExtensions = new Array("jpg", "png", "gif");
  let fileExtension = form.image.split(".").pop().toLowerCase();

  for (let i = 0; i < allowedExtensions.length; i++)
    if (fileExtension === allowedExtensions[i]) {
      return (errors.image = "");
    } else {
      errors.image = "Estaría teniando que ser una imagen";
    }

  return errors;
}
