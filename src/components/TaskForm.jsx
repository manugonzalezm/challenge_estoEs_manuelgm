import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Button } from 'react-bootstrap';
import Select from './Select';

const TaskForm = () => {
    const projectManagers = [
        {
            id: 1,
            value: "Juan Perez"
        },
        {
            id: 2,
            value: "Manuel Gonzalez"
        }
    ]

    const employees = [
        {
            id: 1,
            value: "Pedro Sanchez"
        },
        {
            id: 2,
            value: "Gonzalo Fuentes"
        }
    ]

    const statusOptions = [
        {
            id: 1,
            value: "Enabled"
        },
        {
            id: 2,
            value: "Disabled"
        }
    ]

    const initialValues = {
        projectName: "",
        description: "",
        projectManager: "",
        assignedTo: "",
        status: ""
    }

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
        <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Container>
                    <Form>
                        
                        <div className="form-group my-3">
                            <label htmlFor="projectName">Project name</label>
                            <Field name="projectName" className={'form-control' + (errors.projectName && touched.projectName ? ' is-invalid' : '')} />
                            {touched.projectName && errors.projectName &&
                                <div className="form-text text-danger">{errors.projectName}</div>
                            }
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <Field name="description" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                            {touched.description && errors.description &&
                                <div className="form-text text-danger">{errors.description}</div>
                            }
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="projectManager">Project manager</label>
                            <Select
                                name="projectManager"
                                options={projectManagers}
                                error={errors.projectManager}
                                touched={touched.projectManager}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="assignedTo">Assigned to</label>
                            <Select
                                name="assignedTo"
                                options={employees}
                                error={errors.assignedTo}
                                touched={touched.assignedTo}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="status">Status</label>
                            <Select
                                name="status"
                                options={statusOptions}
                                error={errors.status}
                                touched={touched.status}
                            />
                        </div>
                        <Button 
                            variant="danger" 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Please wait..." : "Submit"}
                        </Button> {/* Luego hacer condicional para mostrar Create project o Save Changes */}
                    </Form>
                </Container>
            )}
        </Formik>
    )
}

export default TaskForm