import {TextInput} from "flowbite-react";
import { useState} from "react";
import {validateEmail} from "utils/validators";


export default function SharingSubForm({form, setForm}) {

  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState(null);
  const toRender = form.map((user, index) => {
    return (
      <div key={index} className={"flex flex-row justify-between items-center my-4"}>
        <div className={"text-sm"}>
          { user }
        </div>
        <div className={"text-sm text-zinc-500 cursor-pointer"} onClick={() => handleRemove(index)}>
          Remove
        </div>
      </div>
    )
  })

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (validateEmail(emailInput)) {
        setForm(prevForm => ([...prevForm, emailInput]));
        setEmailInput("");
        setEmailError(null);
      } else {
        setEmailError("Please enter a properly formatted email address.");
      }
    }
  }

  const handleRemove = (index) => {
    form.splice(index, 1);
    setForm(prevForm => {
      prevForm.splice(index, 1);
      return [...prevForm]
    });
  }

  return (
    <>
      {
        emailError ?
          <div className={"text-red-600 text-sm mb-2"}>
            { emailError }
          </div>
          : ''
      }
      <TextInput
        value={emailInput}
        type="email"
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={ (e) => {setEmailInput(e.target.value)} }
        placeholder={"Enter email address"}
      />
      {
        form.length > 0 ? toRender  :
          <div className={"text-center text-zinc-500 pt-4"}>
            No users
          </div>
      }
    </>
  )
}