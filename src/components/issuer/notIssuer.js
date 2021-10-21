import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { alert } from '../../redux/actions/alert';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './notIssuer.css';

const validationSchema = yup.object({
	identity: yup.string().required('Identity Name is required'),
	description: yup.string().required('Description is required'),
});

const mapDispatchToProps = (dispatch) => ({
	Alert: (message, severity) => dispatch(alert(message, severity)),
});

const NotIssuer = (props) => {
	useEffect(() => {
		props.Alert('This account is not registered as an Issuer', 'info');
	}, [props]);

	const formik = useFormik({
		initialValues: {
			identity: '',
			description: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<div className="register">
			<form onSubmit={formik.handleSubmit}>
				<TextField
					className="text"
					fullWidth
					placeholder="Enter the name of Identity this account will issue"
					variant="filled"
					id="identity"
					name="identity"
					label="Identity Name"
					value={formik.values.identity}
					onChange={formik.handleChange}
					error={formik.touched.identity && Boolean(formik.errors.identity)}
					helperText={formik.touched.identity && formik.errors.identity}
				/>
				<TextField
					className="text"
					fullWidth
					variant="filled"
					multiline
					id="description"
					name="description"
					label="Identity And Issuer Description"
					placeholder="Enter a description stating issuer and the identity details"
					rows={5}
					value={formik.values.description}
					onChange={formik.handleChange}
					error={
						formik.touched.description && Boolean(formik.errors.description)
					}
					helperText={formik.touched.description && formik.errors.description}
				/>
				<Button
					variant="contained"
					color="primary"
					className="signinBtn"
					type="submit"
				>
					Request Issuer Account
				</Button>
			</form>

            <h6 className="note">
                <b>Note : </b>
                If you previously requested for an Issuer Account and still seeing this page
                then your request propably got rejected.
            </h6>
		</div>
	);
};

export default connect(null, mapDispatchToProps)(NotIssuer);
