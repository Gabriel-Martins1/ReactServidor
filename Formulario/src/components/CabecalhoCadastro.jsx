import InputField from "./inputField";

function FormularioCadastro() {
  return (
    <form>
      <InputField label="nome" type="text" />
      <InputField label="email" type="email" />
    </form>
  );
}