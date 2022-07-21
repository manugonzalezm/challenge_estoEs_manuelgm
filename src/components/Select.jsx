import React from 'react';
import { Field } from 'formik';

const Select = (props) => {
    const { name, options, error, touched, ...rest } = props
    return (
        <div>
            <Field as="select" id={name} name={name} {...rest} className={'form-control' + (error && touched ? ' is-invalid' : '')}>
                {name==="projectManager" || name==="assignedTo" ?
                    <option value="">Select a person</option>
                :
                    name==="status" ?
                        <option value="">Select a status</option>
                    :
                        <></>
                }
                {
                    options.map(opt => (
                        <option key={opt.id} value={opt.value}>{opt.value}</option>
                    ))
                }
            </Field>
            {touched && error &&
                <div className="form-text text-danger">{error}</div>
            }
        </div>
    )
}

export default Select