import React from "react";
import {useConfig} from "../../context/ConfigContext/ConfigContext";
import "./dataEditor.css";
import {FlagType, Item} from "../../model";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";


interface FormValues {
    flag: FlagType;
    quadrant: string;
    ring: string;
    name: string;
    dataTitle: string;
    body: string;
    info: string;
    revisions: any[];
    featured: boolean;
}

const DataEditor: React.FC = () => {
    const {config, addItemToData} = useConfig();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        dataTitle: Yup.string().required("Title is required"),
        body: Yup.string().required("Body is required"),

    });

    const initialValues = {
        flag: FlagType.new,
        quadrant: "languages-and-frameworks",
        ring: config?.rings[0] || "hold",
        name: "",
        dataTitle: "",
        body: "",
        info: "",
        revisions: [],
        featured: true,
    };


    const handleSubmit = (
        values: FormValues,
    ): void => {
        const newItem: Item = {
            flag: values.flag,
            featured: true,
            revisions: [],
            name: values.name,
            title: values.dataTitle,
            ring: values.ring,
            quadrant: values.quadrant,
            body: values.body,
            info: values.info,
        };
        addItemToData(newItem);
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className={"form-container"}>
                <div className="section-title">
                    <h2>1 - Add New Data</h2>
                </div>

                <div className="form-group">
                    <label htmlFor="flag">Flag:</label>
                    <Field as="select" id="flag" name="flag">
                        <option value={FlagType.new}>{FlagType.new}</option>
                        <option value={FlagType.changed}>{FlagType.changed}</option>
                        <option value={FlagType.default}>{FlagType.default}</option>
                    </Field>
                </div>

                <div className="form-group">
                    <label htmlFor="quadrant">Quadrant:</label>
                    <Field as="select" id="quadrant" name="quadrant">
                        {/* Define options based on your configuration */}
                        <option value="languages-and-frameworks">
                            {config?.quadrants["languages-and-frameworks"]}
                        </option>
                        <option value="methods-and-patterns">
                            {config?.quadrants["methods-and-patterns"]}
                        </option>
                        <option value="platforms-and-aoe-services">
                            {config?.quadrants["platforms-and-aoe-services"]}
                        </option>
                        <option value="tools">
                            {config?.quadrants["tools"]}
                        </option>

                    </Field>
                    <ErrorMessage
                        name="quadrant"
                        component="div"
                        className="error-message"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ring">Ring:</label>
                    <Field as="select" id="ring" name="ring">
                        <option value="adopt">{config?.rings[0]}</option>
                        <option value="trial">{config?.rings[1]}</option>
                        <option value="assess">{config?.rings[2]}</option>
                        <option value="hold">{config?.rings[3]}</option>
                    </Field>
                    <ErrorMessage name="ring" component="div" className="error-message"/>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <Field type="text" id="name" name="name" className="form-control"/>
                    <ErrorMessage name="name" component="div" className="error-message"/>
                </div>

                <div className="form-group">
                    <label htmlFor="dataTitle">Title:</label>
                    <Field
                        type="text"
                        id="dataTitle"
                        name="dataTitle"
                        className="form-control"
                    />
                    <ErrorMessage
                        name="dataTitle"
                        component="div"
                        className="error-message"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="body">Body:</label>
                    <Field type="text" id="body" name="body" className="form-control"/>
                    <ErrorMessage name="body" component="div" className="error-message"/>
                </div>

                <div className="form-group">
                    <label htmlFor="info">Info:</label>
                    <Field type="text" id="info" name="info" className="form-control"/>
                    <ErrorMessage name="info" component="div" className="error-message"/>
                </div>

                <div className={"editor-button"}>
                    <div className="form-group">
                        <button type="submit" className="submit-button">
                            Add data
                        </button>
                    </div>
                    <div style={{width: "10px"}}></div>
                    <div className="form-group">
                        <button type="reset" className="submit-button">
                            Reset Form
                        </button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default DataEditor;
