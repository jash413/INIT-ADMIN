import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login } from '../core/_requests'
import { useAuth } from '../core/Auth'
import axios from 'axios'
const API_URL = import.meta.env.VITE_APP_THEME_API_URL;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  mobile: Yup.string()
    .min(10, 'Minimum 10 digits')
    .max(10, 'Maximum 10 digits')
    .required('Mobile number is required'),
  otp: Yup.string()
    .min(6, 'Minimum 6 digits')
    .max(6, 'Maximum 6 digits'),
})

const initialValues = {
  email: 'devansh@example.com',
  password: '1234',
  mobile: '',
  otp: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState('')
  const { saveAuth, setCurrentUser } = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      if (!otpSent) {
        try {
          const response = await axios.post(`${API_URL}/api/admins/otp`, {
            phoneNumber: values.mobile,
          })
          setGeneratedOtp(response.data.generatedOTP)
          console.log(response.data.generatedOTP)
          setOtpSent(true)
          setLoading(false)
        } catch (error) {
          console.error(error)
          setStatus('Failed to send OTP')
          setSubmitting(false)
          setLoading(false)
        }
      } else {
        if (values.otp === generatedOtp) {
          try {
            let { data } = await login(values.email, values.password)
            saveAuth(data.data)
            data = await getUserByToken(data.data.accessToken)
            setCurrentUser(data.data.data)
          } catch (error) {
            console.error(error)
            saveAuth(undefined)
            setStatus('The login details are incorrect')
            setSubmitting(false)
            setLoading(false)
          }
        } else {
          setStatus('Invalid OTP')
          setSubmitting(false)
          setLoading(false)
          setOtpSent(false)
        }
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-11'>
        <h1 className='text-gray-900 fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-semibold fs-6'>TO ACCESS DASHBOARD</div>
      </div>

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>devansh@example.com</strong> and password <strong>1234</strong> to continue.
          </div>
        </div>
      )}

      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-gray-900'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            { 'is-valid': formik.touched.email && !formik.errors.email },
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>

      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-gray-900'>Mobile Number</label>
        <input
          placeholder='Mobile Number'
          {...formik.getFieldProps('mobile')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.mobile && formik.errors.mobile },
            { 'is-valid': formik.touched.mobile && !formik.errors.mobile },
          )}
          type='text'
          name='mobile'
          autoComplete='off'
        />
        {formik.touched.mobile && formik.errors.mobile && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.mobile}</span>
          </div>
        )}
      </div>

      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.password && formik.errors.password },
            { 'is-valid': formik.touched.password && !formik.errors.password },
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      {otpSent && (
        <div className='fv-row mb-8'>
          <label className='form-label fs-6 fw-bolder text-gray-900'>OTP</label>
          <input
            placeholder='OTP'
            {...formik.getFieldProps('otp')}
            className={clsx(
              'form-control bg-transparent',
              { 'is-invalid': formik.touched.otp && formik.errors.otp },
              { 'is-valid': formik.touched.otp && !formik.errors.otp },
            )}
            type='text'
            name='otp'
            autoComplete='off'
          />
          {formik.touched.otp && formik.errors.otp && (
            <div className='fv-plugins-message-container'>
              <span role='alert'>{formik.errors.otp}</span>
            </div>
          )}
        </div>
      )}

      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}