import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const TaskForm = () => {
    const formSchema = Yup.object().shape({
        projectName: Yup.string()
            .min(5, "Debe tener más de 5 caracteres")
            .max(45, "Debe tener como máximo 45 caracteres")
            .required("Este campo es obligatorio"),
        description: Yup.string()
            .min(10, "Debe tener más de 10 caracteres")
            .max(100, "Debe tener como máximo 100 caracteres")
            .required("Este campo es obligatorio"),
        projectManager: Yup.string()
            .required("Este campo es obligatorio"),
        assignedTo: Yup.string()
            .required("Este campo es obligatorio"),
        status: Yup.string()
            .required("Este campo es obligatorio"),

    })

    return (
        <div>TaskForm</div>
    )
}

export default TaskForm