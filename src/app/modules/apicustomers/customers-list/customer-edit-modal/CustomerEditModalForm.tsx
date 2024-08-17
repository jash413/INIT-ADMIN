import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../_metronic/helpers";
import { Customer } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { CustomersListLoading } from "../components/loading/CustomersListLoading";
import { UsersListLoading } from "../../../apiusers/users-list/components/loading/UsersListLoading";
import { createCustomer, updateCustomer } from "../core/_requests";
import {
  createUser,
  updateUser,
} from "../../../apiusers/users-list/core/_requests";
import { User } from "../../../apiusers/users-list/core/_models";
import { useQueryResponse } from "../core/QueryResponseProvider";
import moment from "moment";

// Validation schemas
const editCustomerSchema = Yup.object().shape({
  CUS_NAME: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  CUS_ADDR: Yup.string().required("Address is required"),
  CMP_NAME: Yup.string().required("Company name is required"),
  notification_date: Yup.string().required("Notification date is required"),
});

const editUserSchema = Yup.object().shape({
  USR_ID: Yup.string()
    .email("Email is not valid")
    .required("Email is required"),
  USR_PASS: Yup.string().required("Password is required"),
});

interface CustomerEditModalFormProps {
  customer: Customer;
  isCustomerLoading: boolean;
}

const CustomerEditModalForm: FC<CustomerEditModalFormProps> = ({
  customer,
  isCustomerLoading,
}) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const [showUserForm, setShowUserForm] = useState(false);

  const [customerForEdit] = useState<Customer>({
    ...customer,
    CUS_NAME: customer.CUS_NAME,
    CUS_ADDR: customer.CUS_ADDR,
    CMP_NAME: customer.CMP_NAME,
    notification_date: moment(customer.notification_date).format("YYYY-MM-DD"),
  });

  const [userForEdit] = useState<User>({
    GST_CODE: "",
    GST_NMBR: "",
    USR_ID: "",
    USR_PASS: "",
    USR_ACTV: 0,
    is_admin: 0,
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const customerFormik = useFormik({
    initialValues: customerForEdit,
    validationSchema: editCustomerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values.id)) {
          await updateCustomer(values);
          setSubmitting(false);
          cancel(true);
        } else {
          const response = await createCustomer(values);
          if (response) {
            userForEdit.GST_CODE = response.REG_CODE;
          }
          setShowUserForm(true);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const userFormik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values.id)) {
          await updateUser(values);
        } else {
          await createUser(values);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(false);
        cancel(true);
      }
    },
  });

  const renderField = (
    label: string,
    name: string,
    type = "text",
    isRequired = true,
    isToggleBtn = false,
    formik: any
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
            disabled={
              formik.isSubmitting || (formik === customerFormik && showUserForm)
            }
          />
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
          disabled={
            formik.isSubmitting || (formik === customerFormik && showUserForm)
          }
        />
      )}
      {formik.touched[name] && formik.errors[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );

  return (
    <>
      {!showUserForm ? (
        <form
          id="kt_modal_add_customer_form"
          className="form"
          onSubmit={customerFormik.handleSubmit}
          noValidate
        >
          <div
            className="d-flex flex-column scroll-y me-n7 pe-7"
            id="kt_modal_add_customer_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_add_customer_header"
            data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
            data-kt-scroll-offset="300px"
          >
            {renderField(
              "Customer Name",
              "CUS_NAME",
              "text",
              true,
              false,
              customerFormik
            )}
            {renderField(
              "Address",
              "CUS_ADDR",
              "text",
              true,
              false,
              customerFormik
            )}
            {renderField(
              "Company Name",
              "CMP_NAME",
              "text",
              true,
              false,
              customerFormik
            )}
            {renderField(
              "Notification Date",
              "notification_date",
              "date",
              true,
              false,
              customerFormik
            )}
          </div>
          <div className="text-center pt-15">
            <button
              type="reset"
              onClick={() => cancel()}
              className="btn btn-light me-3"
              data-kt-customers-modal-action="cancel"
              disabled={customerFormik.isSubmitting || showUserForm}
            >
              Discard
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              data-kt-customers-modal-action="submit"
              disabled={
                showUserForm ||
                customerFormik.isSubmitting ||
                !customerFormik.isValid ||
                !customerFormik.touched
              }
            >
              <span className="indicator-label">Submit</span>
              {(customerFormik.isSubmitting || showUserForm) && (
                <span className="indicator-progress">
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      ) : (
        <form
          id="kt_modal_add_user_form"
          className="form"
          onSubmit={userFormik.handleSubmit}
          noValidate
        >
          <div
            className="d-flex flex-column scroll-y me-n7 pe-7"
            id="kt_modal_add_user_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_add_user_header"
            data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
            data-kt-scroll-offset="300px"
          >
            {renderField("Email", "USR_ID", "email", true, false, userFormik)}
            {renderField(
              "Password",
              "USR_PASS",
              "password",
              true,
              false,
              userFormik
            )}
            <div className="d-flex justify-content-start">
              {renderField(
                "Active",
                "USR_ACTV",
                "checkbox",
                false,
                true,
                userFormik
              )}
              {renderField(
                "Admin",
                "is_admin",
                "checkbox",
                false,
                true,
                userFormik
              )}
            </div>
          </div>
          <div className="text-center pt-15">
            <button
              type="reset"
              onClick={() => cancel()}
              className="btn btn-light me-3"
              data-kt-users-modal-action="cancel"
              disabled={userFormik.isSubmitting || !showUserForm}
            >
              Discard
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              data-kt-users-modal-action="submit"
              disabled={
                !showUserForm ||
                userFormik.isSubmitting ||
                !userFormik.isValid ||
                !userFormik.touched
              }
            >
              <span className="indicator-label">Submit</span>
              {(userFormik.isSubmitting || !showUserForm) && (
                <span className="indicator-progress">
                  Please wait...{" "}
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      )}

      {customerFormik.isSubmitting ||
        (isCustomerLoading && <CustomersListLoading />)}
      {userFormik.isSubmitting && <UsersListLoading />}
    </>
  );
};

export { CustomerEditModalForm };
