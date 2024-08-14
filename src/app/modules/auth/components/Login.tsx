import { useState, useEffect } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import axios from "axios";
import { getUserByToken, login } from "../core/_requests";
import { useAuth } from "../core/Auth";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters"),
  password: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters"),
  mobile: Yup.string().length(10, "Must be 10 digits"),
  otp: Yup.string().length(6, "Must be 6 digits"),
});

const initialValues = {
  email: "",
  password: "",
  mobile: "",
  otp: "",
};

export function Login(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [authMethod, setAuthMethod] = useState<"email" | "mobile">("email");
  const { saveAuth, setCurrentUser } = useAuth();
  const [token, setToken] = useState("");
  const [resendOtpTimer, setResendOtpTimer] = useState(0);
  const [disableResendButton, setDisableResendButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({ accessToken: "", loginType: "" });
  const [currentUserData, setCurrentUserData] = useState<any>(undefined);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (resendOtpTimer > 0) {
      timer = setTimeout(() => setResendOtpTimer((prev) => prev - 1), 1000);
    } else {
      setDisableResendButton(false);
    }
    return () => timer && clearTimeout(timer);
  }, [resendOtpTimer]);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      try {
        if (authMethod === "mobile") {
          if (!otpSent) {
            const { data } = await axios.post(`${API_URL}/api/admins/otp`, {
              phoneNumber: values.mobile,
            });
            setGeneratedOtp(data.generatedOTP);
            setToken(data.token);
            setOtpSent(true);
            setResendOtpTimer(30);
            setDisableResendButton(true);
          } else if (values.otp === generatedOtp) {
            setAuthData({ accessToken: token, loginType: "" });
            const { data } = await getUserByToken(token);
            setCurrentUserData(data.data);
            setIsAuthenticated(true);
          } else {
            setStatus("Invalid OTP");
            setOtpSent(false);
          }
        } else if (authMethod === "email") {
          const { data } = await login(values.email, values.password);
          setAuthData(data.data);
          const userData = await getUserByToken(data.data.accessToken);
          setCurrentUserData(userData.data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus("Incorrect login details");
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/admins/otp`, {
        phoneNumber: formik.values.mobile,
      });
      setGeneratedOtp(data.generatedOTP);
      setToken(data.token);
      setOtpSent(true);
      setResendOtpTimer(30);
      setDisableResendButton(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDashboard = (type: "IFAS" | "API") => {
    authData.loginType = type;
    saveAuth(authData);
    setCurrentUser(currentUserData);
  };

  return (
    <div className="container">
      {!isAuthenticated ? (
        <form
          className="form w-100"
          onSubmit={formik.handleSubmit}
          noValidate
          id="kt_login_signin_form"
        >
          <div className="text-center mb-11">
            <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
            <div className="text-gray-500 fw-semibold fs-6">
              TO ACCESS DASHBOARD
            </div>
          </div>

          {formik.status && (
            <div className="mb-lg-15 alert alert-danger">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          )}

          <div className="d-flex justify-content-center mb-8">
            <button
              type="button"
              className={clsx(
                "btn",
                authMethod === "email" ? "btn-primary" : "btn-light"
              )}
              onClick={() => setAuthMethod("email")}
            >
              Email
            </button>
            <button
              type="button"
              className={clsx(
                "btn",
                authMethod === "mobile" ? "btn-primary" : "btn-light"
              )}
              onClick={() => setAuthMethod("mobile")}
            >
              Mobile
            </button>
          </div>

          {authMethod === "email" && (
            <>
              <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bolder text-gray-900">
                  Email
                </label>
                <input
                  placeholder="Email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className={clsx("form-control bg-transparent", {
                    "is-invalid": formik.touched.email && formik.errors.email,
                    "is-valid": formik.touched.email && !formik.errors.email,
                  })}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="fv-plugins-message-container">
                    <span role="alert">{formik.errors.email}</span>
                  </div>
                )}
              </div>

              <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bolder text-gray-900">
                  Password
                </label>
                <input
                  placeholder="Password"
                  type="password"
                  {...formik.getFieldProps("password")}
                  className={clsx("form-control bg-transparent", {
                    "is-invalid":
                      formik.touched.password && formik.errors.password,
                    "is-valid":
                      formik.touched.password && !formik.errors.password,
                  })}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert">{formik.errors.password}</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {authMethod === "mobile" && (
            <>
              <div className="fv-row mb-8">
                <label className="form-label fs-6 fw-bolder text-gray-900">
                  Mobile Number
                </label>
                <input
                  placeholder="Mobile Number"
                  type="text"
                  {...formik.getFieldProps("mobile")}
                  className={clsx("form-control bg-transparent", {
                    "is-invalid": formik.touched.mobile && formik.errors.mobile,
                    "is-valid": formik.touched.mobile && !formik.errors.mobile,
                  })}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="fv-plugins-message-container">
                    <span role="alert">{formik.errors.mobile}</span>
                  </div>
                )}
              </div>

              {otpSent && (
                <>
                  <div className="fv-row mb-8">
                    <label className="form-label fs-6 fw-bolder text-gray-900">
                      OTP
                    </label>
                    <input
                      placeholder="OTP"
                      type="text"
                      {...formik.getFieldProps("otp")}
                      className={clsx("form-control bg-transparent", {
                        "is-invalid": formik.touched.otp && formik.errors.otp,
                        "is-valid": formik.touched.otp && !formik.errors.otp,
                      })}
                    />
                    {formik.touched.otp && formik.errors.otp && (
                      <div className="fv-plugins-message-container">
                        <span role="alert">{formik.errors.otp}</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleResendOtp}
                    disabled={disableResendButton}
                  >
                    Resend OTP {resendOtpTimer > 0 && `(${resendOtpTimer})`}
                  </button>
                </>
              )}
            </>
          )}

          <div className="d-grid mb-10">
            <br />
            <button
              type="submit"
              id="kt_sign_in_submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading ? (
                <span className="indicator-label">
                  {authMethod === "email"
                    ? "Continue"
                    : otpSent
                    ? "Verify OTP"
                    : "Send OTP"}
                </span>
              ) : (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center mt-5">
          <h2 className="mb-4 text-primary">Select Your Dashboard</h2>
          <div className="d-flex justify-content-center">
            <div
              className="card mx-3 text-center"
              style={{ width: "250px", cursor: "pointer" }}
              onClick={() => handleSelectDashboard("IFAS")}
            >
              <div className="card-body">
                <i
                  className="fas fa-chart-line text-primary mb-4"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h5 className="card-title">IFAS APP SUBSCRIPTION</h5>
                <p className="card-text text-muted">
                  Manage and track IFAS ERP integrations.
                </p>
              </div>
            </div>
            <div
              className="card mx-3 text-center"
              style={{ width: "250px", cursor: "pointer" }}
              onClick={() => handleSelectDashboard("API")}
            >
              <div className="card-body">
                <i
                  className="fas fa-code text-primary mb-4"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h5 className="card-title">API SUBSCRIPTIONS</h5>
                <p className="card-text text-muted">
                  Manage and track API integrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
