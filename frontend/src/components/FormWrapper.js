import React from 'react';
import { useFormik } from 'formik';

function FormWrapper(FormComp, obj) {
    function InnerComp(){
        const formik = useFormik(obj);
        return (<FormComp formik={formik}/>)
    }
    return InnerComp;
}
export default FormWrapper;