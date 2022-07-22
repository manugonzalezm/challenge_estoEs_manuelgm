import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import appFirebase from '../firebase';
import { getFirestore, collection, addDoc, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import Select from './Select';
import Swal from 'sweetalert2'

const db = getFirestore(appFirebase);

const TaskForm = () => {
    let location = useLocation();
    let navigate = useNavigate();
    let { taskId } = useParams();
    const [task, setTask] = useState([])
    const [editting, setEditting] = useState(false)

    const projectManagers = [
        {
            id: 1,
            value: "Juan Perez"
        },
        {
            id: 2,
            value: "Manuel Gonzalez"
        },
        {
            id: 3,
            value: "Walt Cosani"
        }
    ]

    const employees = [
        {
            id: 1,
            value: "Pedro Sanchez"
        },
        {
            id: 2,
            value: "Gabriela Fuentes"
        },
        {
            id: 3,
            value: "Ignacio Truffa"
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

    const getTask = async () => {
        try {
            const docRef = doc(db, "tasks", taskId)
            const docSnap = await getDoc(docRef)
            const data = docSnap.data()
            const parsedData = {
                projectName: data.title,
                description: data.description,
                projectManager: data.project_manager,
                assignedTo: data.assigned_to,
                status: data.status,
                creationDate: data.creation_date
            }
            setTask(parsedData)
        } catch (error) {
            console.log(error)
        }
    }
    console.log("task", task)

    useEffect(() => {
        if (location.pathname !== "tasks/new" && location.pathname !== "/" && taskId) {
            setEditting(true)
            getTask(taskId)
        }
    }, [taskId])


    const initialValues = !editting ?
        {
            projectName: "",
            description: "",
            projectManager: "",
            assignedTo: "",
            status: ""
        }
        :
        task

    const submitData = async (data) => {
        if (!editting) {
            Swal.fire({
                title: 'Task created succesfully',
                timer: 2000,
                icon: 'success'
            })
            data = {
                title: data.projectName,
                description: data.description,
                project_manager: data.projectManager,
                assigned_to: data.assignedTo,
                creation_date: Timestamp.fromDate(new Date()),
                status: data.status
            }
            console.log(data)
            try {
                await addDoc(collection(db, "tasks"), {
                    ...data
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            Swal.fire({
                title: 'Task edited succesfully',
                timer: 2000,
                icon: 'success'
            })
            data = {
                title: data.projectName,
                description: data.description,
                project_manager: data.projectManager,
                assigned_to: data.assignedTo,
                creation_date: task.creationDate,
                status: data.status,
            }
            console.log(data)
            try {
                await setDoc(doc(db, "tasks", taskId), {
                    ...data
                })
            } catch (err) {
                console.log(err)
            }
        }
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
        <>
            {(editting && task.length === 0) ?
                <Spinner animation="border" />
                :
                <Formik
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            submitData(values)
                            navigate("/", { replace: true });
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ errors, touched, isSubmitting, values }) => (
                        <Container>
                            <Form>
                                {console.log("values", values)}
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
                                {!editting ?
                                    <Button
                                        variant="danger"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Please wait..." : "Create project"}
                                    </Button>
                                    :
                                    <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id="tooltip-edit">
                                                The data cannot be identical to the existing one
                                            </Tooltip>
                                        }
                                    >
                                        <span>
                                            <Button 
                                                variant="danger"
                                                type="submit" 
                                                disabled={isSubmitting || (values.title === task.title &&
                                                    values.description === task.description &&
                                                    values.projectManager === task.projectManager &&
                                                    values.assignedTo === task.assignedTo &&
                                                    values.status === task.status
                                                )}
                                            >
                                                {isSubmitting ? "Please wait..." : "Save changes"}
                                            </Button>
                                        </span>
                                    </OverlayTrigger>
                                }
                            </Form>
                        </Container>
                    )}
                </Formik>
            }
        </>
    )
}

export default TaskForm