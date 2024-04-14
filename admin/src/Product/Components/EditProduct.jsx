import { useState } from "react";
import FormContainer from "../../ReusableComponent/FormContainer";
import FormInputs from "../../ReusableComponent/FormInputs";
import { useLoaderData } from "react-router-dom";

export default function EditProduct() {
  const prdData = useLoaderData();
  const [formInput, setFormInput] = useState(prdData);

  return (
    <>
      <FormContainer title={"Edit Hotel"}>
        <FormInputs
          isEdit={true}
          fields={formInput}
          setFormInput={setFormInput}
        />
      </FormContainer>
    </>
  );
}