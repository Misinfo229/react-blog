import { useState } from "react";

export const useForm = (initialObject = {}) => {
    const [myform, setForm] = useState(initialObject);

    const serializeForm = (form) => {
        const formData = new FormData(form);
        const newCurso = {};
        for (let [name, value] of formData) {
            newCurso[name] = value;
        }
        return newCurso;
    }

    const sendForm = (e) => {
        e.preventDefault();

        let curso = serializeForm(e.target);
        setForm(curso);
        document.querySelector(".code").classList.add("sent");
    }
    const changeForm = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...myform,
            [name]: value
        })
    }

    return {
        myform,
        sendForm,
        changeForm,
        setForm
    }
}