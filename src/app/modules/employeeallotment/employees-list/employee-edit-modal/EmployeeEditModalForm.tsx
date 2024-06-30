import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../_metronic/helpers";
import { Employee } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { EmployeesListLoading } from "../components/loading/EmployeesListLoading";
import {
  createEmployee,
  updateEmployee,
  fetchCustomers,
  fetchSubscriptionsByCustomerId,
} from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";
import moment from "moment";

type Props = {
  isEmployeeLoading: boolean;
  employee: Employee;
};

const editEmployeeSchema = Yup.object().shape({
  CUS_CODE: Yup.string().required("Customer Code is required"),
  SUB_CODE: Yup.string().required("Subscription Code is required"),
  EMP_NAME: Yup.string().required("Employee Name is required"),
  EMP_PASS: Yup.string().required("Employee Password is required"),
  EMP_IMEI: Yup.string().required("IMEI Number is required"),
  MOB_NMBR: Yup.string().required("Mobile Number is required"),
  SUB_STDT: Yup.string().required("Subscription Start Date is required"),
  SUB_ENDT: Yup.string().required("Subscription End Date is required"),
});

const EmployeeEditModalForm: FC<Props> = ({ employee, isEmployeeLoading }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();
  const [customers, setCustomers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  const [employeeForEdit] = useState<Employee>({
    ...employee,
    EMP_NAME: employee.EMP_NAME,
    EMP_PASS: employee.EMP_PASS,
    EMP_IMEI: employee.EMP_IMEI,
    MOB_NMBR: employee.MOB_NMBR,
    USR_TYPE: employee.USR_TYPE,
    SUB_STDT: moment(employee.SUB_STDT).format("YYYY-MM-DD"),
    SUB_ENDT: moment(employee.SUB_ENDT).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await fetchCustomers();
        setCustomers(
          customersData?.data?.map((customer: any) => ({
            value: customer.CUS_CODE,
            label: customer.CUS_NAME,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: employeeForEdit,
    validationSchema: editEmployeeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values.EMP_CODE)) {
          await updateEmployee(values);
        } else {
          await createEmployee(values);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(false);
        cancel(true);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!formik.values.CUS_CODE) {
          return;
        }
        const subscriptionsData = await fetchSubscriptionsByCustomerId(
          formik.values.CUS_CODE
        );
        setSubscriptions(
          subscriptionsData?.data?.map((subscription: any) => ({
            value: subscription.SUB_CODE,
            label: subscription.SUB_CODE,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [formik.values.CUS_CODE]);

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const renderField = (
    label: string,
    name: keyof Employee,
    type = "text",
    isRequired = true,
    isToggleBtn = false
  ) => (
    <div className="fv-row mb-7">
      <label className={clsx("fw-bold fs-6 mb-2", isRequired && "required")}>
        {label}
      </label>
      {isToggleBtn ? (
        <div className="form-check form-switch">
          <input
            {...formik.getFieldProps(name)}
            type="checkbox"
            className={clsx(
              "form-check-input",
              { "is-invalid": formik.touched[name] && formik.errors[name] },
              { "is-valid": formik.touched[name] && !formik.errors[name] }
            )}
            disabled={formik.isSubmitting || isEmployeeLoading}
            checked={formik.values[name] as boolean}
            onChange={() => formik.setFieldValue(name, !formik.values[name])}
          />
          {formik.touched[name] && formik.errors[name] && (
            <div className="fv-plugins-message-container">
              <span role="alert">{formik.errors[name]}</span>
            </div>
          )}
        </div>
      ) : (
        <input
          placeholder={label}
          {...formik.getFieldProps(name)}
          type={type}
          className={clsx(
            "form-control form-control-solid mb-3 mb-lg-0",
            { "is-invalid": formik.touched[name] && formik.errors[name] },
            { "is-valid": formik.touched[name] && !formik.errors[name] }
          )}
          autoComplete="off"
          disabled={formik.isSubmitting || isEmployeeLoading}
        />
      )}
    </div>
  );

  const renderSelectField = (
    label: string,
    name: keyof Employee,
    options: { value: string; label: string }[],
    isRequired = true
  ) => (
    <div className="fv-row mb-7">
      <label className={clsx("fw-bold fs-6 mb-2", isRequired && "required")}>
        {label}
      </label>
      <select
        {...formik.getFieldProps(name)}
        className={clsx(
          "form-control form-control-solid mb-3 mb-lg-0",
          { "is-invalid": formik.touched[name] && formik.errors[name] },
          { "is-valid": formik.touched[name] && !formik.errors[name] }
        )}
        disabled={formik.isSubmitting || isEmployeeLoading}
      >
        <option value="">Select {label.slice(6)}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {formik.touched[name] && formik.errors[name] && (
        <div className="fv-plugins-message-container">
          <span role="alert">{formik.errors[name]}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      <form
        id="kt_modal_add_employee_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div
          className="d-flex flex-column scroll-y me-n7 pe-7"
          id="kt_modal_add_employee_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_employee_header"
          data-kt-scroll-wrappers="#kt_modal_add_employee_scroll"
          data-kt-scroll-offset="300px"
        >
          {renderSelectField("Select Customer", "CUS_CODE", customers)}
          {renderSelectField("Select Subscription", "SUB_CODE", subscriptions)}
          {renderField("Employee Name", "EMP_NAME")}
          {renderField("Employee Password", "EMP_PASS")}
          {renderField("IMEI Number", "EMP_IMEI")}
          {renderField("Mobile Number", "MOB_NMBR")}
          {renderField("Subscription Start Date", "SUB_STDT", "date")}
          {renderField("Subscription End Date", "SUB_ENDT", "date")}
          {renderField("Is Admin?", "USR_TYPE", "checkbox", false, true)}
        </div>
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-employees-modal-action="cancel"
            disabled={formik.isSubmitting || isEmployeeLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-employees-modal-action="submit"
            disabled={
              isEmployeeLoading ||
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched
            }
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting || isEmployeeLoading) && (
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isEmployeeLoading) && <EmployeesListLoading />}
    </>
  );
};

export { EmployeeEditModalForm };
