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
  MOB_NMBR: Yup.string().required("Mobile Number is required"),
});

const EmployeeEditModalForm: FC<Props> = ({ employee, isEmployeeLoading }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();
  const [customers, setCustomers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [mobileNumber] = useState(employee.MOB_NMBR || "");

  const [employeeForEdit] = useState<Employee>({
    ...employee,
    EMP_NAME: employee.EMP_NAME,
    MOB_NMBR: employee.MOB_NMBR,
    USR_TYPE: employee.USR_TYPE,
    EMP_ACTV: employee.EMP_ACTV,
    SALE_OS_ACTIVE: employee.SALE_OS_ACTIVE,
    PUR_OS_ACTIVE: employee.PUR_OS_ACTIVE,
    SALE_ORDER_ACTIVE: employee.SALE_ORDER_ACTIVE,
    PURCHASE_ORDER_ACTIVE: employee.PURCHASE_ORDER_ACTIVE,
    SALE_ORDER_ENTRY: employee.SALE_ORDER_ENTRY,
    SALE_REPORT_ACTIVE: employee.SALE_REPORT_ACTIVE,
    PURCHASE_REPORT_ACTIVE: employee.PURCHASE_REPORT_ACTIVE,
    LEDGER_REPORT_ACTIVE: employee.LEDGER_REPORT_ACTIVE,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await fetchCustomers();
        setCustomers(
          customersData?.data?.map((customer: any) => ({
            value: customer.CUS_CODE,
            label: `${customer.CUS_CODE}: ${customer.CUS_NAME}`,
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
          await updateEmployee(mobileNumber, values);
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
            label: `${subscription.SUB_CODE}: ${moment(
              subscription.SUB_STDT
            ).format("DD/MM/YYYY")} - ${moment(subscription.SUB_ENDT).format(
              "DD/MM/YYYY"
            )}`,
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
    <div className={clsx("fv-row mb-7", isToggleBtn && "col-md-6")}>
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
            checked={
              name === "USR_TYPE" || name === "EMP_ACTV"
                ? formik.values[name] === "1"
                : formik.values[name] === "Y"
            }
            onChange={(e) =>
              formik.setFieldValue(
                name,
                e.target.checked
                  ? name === "USR_TYPE" || name === "EMP_ACTV"
                    ? "1"
                    : "Y"
                  : name === "USR_TYPE" || name === "EMP_ACTV"
                  ? "0"
                  : "N"
              )
            }
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
    isRequired = true,
    isDisabled = false
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
        disabled={formik.isSubmitting || isEmployeeLoading || isDisabled}
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
          {renderSelectField(
            "Select Customer",
            "CUS_CODE",
            customers,
            true,
            employee?.CUS_CODE ? true : false
          )}
          {renderSelectField("Select Subscription", "SUB_CODE", subscriptions)}
          {renderField("Employee Name", "EMP_NAME")}
          {renderField("Mobile Number", "MOB_NMBR")}
          <div className="row">
            {renderField("Is Active?", "EMP_ACTV", "checkbox", false, true)}
            {renderField("Is Admin?", "USR_TYPE", "checkbox", false, true)}
          </div>
          <div className="row">
            {renderField(
              "Purchase Outstanding?",
              "PUR_OS_ACTIVE",
              "checkbox",
              false,
              true
            )}
            {renderField(
              "Sale Order Active?",
              "SALE_ORDER_ACTIVE",
              "checkbox",
              false,
              true
            )}
          </div>
          <div className="row">
            {renderField(
              "Purchase Order Active?",
              "PURCHASE_ORDER_ACTIVE",
              "checkbox",
              false,
              true
            )}
            {renderField(
              "Sale Order Entry?",
              "SALE_ORDER_ENTRY",
              "checkbox",
              false,
              true
            )}
          </div>
          <div className="row">
            {renderField(
              "Sale Report Active?",
              "SALE_REPORT_ACTIVE",
              "checkbox",
              false,
              true
            )}
            {renderField(
              "Purchase Report Active?",
              "PURCHASE_REPORT_ACTIVE",
              "checkbox",
              false,
              true
            )}
          </div>
          <div className="row">
            {renderField(
              "Sale Outstanding?",
              "SALE_OS_ACTIVE",
              "checkbox",
              false,
              true
            )}
            {renderField(
              "Ledger Report Active?",
              "LEDGER_REPORT_ACTIVE",
              "checkbox",
              false,
              true
            )}
          </div>
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
