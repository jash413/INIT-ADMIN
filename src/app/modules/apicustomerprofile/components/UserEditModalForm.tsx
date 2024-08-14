import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../_metronic/helpers";
import { User } from "../userCore/_models";
import clsx from "clsx";
import { useListView } from "../userCore/ListViewProvider";
import { createUser, updateUser } from "../userCore/_requests";
import { useQueryResponse } from "../userCore/QueryResponseProvider";
import { getAllCustomers } from "../../apicustomers/customers-list/core/_requests";
import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  isUserLoading: boolean;
  user: User;
  onClose: () => void; // Add onClose prop to handle modal closure
  onUserSaved: () => void;
};

const editUserSchema = Yup.object().shape({
  GST_CODE: Yup.string().required("GST Code is required"),
  GST_NMBR: Yup.string().required("GST Number is required"),
  USR_ID: Yup.string()
    .email("Email is not valid")
    .required("Email is required"),
  USR_PASS: Yup.string().required("Password is required"),
});

const UserEditModalForm: FC<Props> = ({
  user,
  isUserLoading,
  onClose,
  onUserSaved,
}) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();
  const [customers, setCustomers] = useState<any>([]);

  useEffect(() => {
    getAllCustomers().then((data) => {
      setCustomers(
        data.data.map((customer: any) => ({
          value: customer.REG_CODE,
          label: customer.CUS_NAME,
        }))
      );
    });
  }, []);

  const [userForEdit] = useState<User>({
    ...user,
    GST_CODE: user.GST_CODE,
    GST_NMBR: user.GST_NMBR,
    USR_ID: user.USR_ID,
    USR_PASS: user.USR_PASS,
    USR_ACTV: user.USR_ACTV || 0,
    is_admin: user.is_admin || 0,
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
    onClose();
  };

  const formik = useFormik({
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
        onUserSaved();
      }
    },
  });

  const renderField = (
    label: string,
    name: keyof User,
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
            disabled={formik.isSubmitting || isUserLoading}
            checked={formik.values[name] === 1}
            onChange={(e) =>
              formik.setFieldValue(name, e.target.checked ? 1 : 0)
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
          disabled={formik.isSubmitting || isUserLoading}
        />
      )}
    </div>
  );

  const renderSelectField = (
    label: string,
    name: keyof User,
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
        disabled={formik.isSubmitting || isUserLoading || isDisabled}
      >
        <option value="">{label}</option>
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
      <div
        className="modal fade show d-block"
        id="kt_modal_add_user"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      >
        {/* begin::Modal dialog */}
        <div className="modal-dialog modal-dialog-centered mw-650px">
          {/* begin::Modal content */}
          <div className="modal-content">
            <div className="modal-header">
              {/* begin::Modal title */}
              <h2 className="fw-bolder">
                {user.id ? "Edit User" : "Add User"}
              </h2>
              {/* end::Modal title */}

              {/* begin::Close */}
              <div
                className="btn btn-icon btn-sm btn-active-icon-primary"
                data-kt-users-modal-action="close"
                onClick={() => cancel()}
                style={{ cursor: "pointer" }}
              >
                <KTIcon iconName="cross" className="fs-1" />
              </div>
              {/* end::Close */}
            </div>
            {/* begin::Modal body */}
            <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
              <form
                id="kt_modal_add_user_form"
                className="form"
                onSubmit={formik.handleSubmit}
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
                  {renderSelectField(
                    "Select Customer",
                    "GST_CODE",
                    customers,
                    true,
                    userForEdit.GST_CODE !== undefined
                  )}
                  {renderField("GST Number", "GST_NMBR")}
                  {renderField("Email", "USR_ID", "email")}
                  {renderField("Password", "USR_PASS", "password")}
                  {renderField("Active", "USR_ACTV", "checkbox", false, true)}
                  {renderField("Is Admin", "is_admin", "checkbox", false, true)}
                </div>
                <div className="text-center pt-15">
                  <button
                    type="reset"
                    onClick={() => cancel()}
                    className="btn btn-light me-3"
                    data-kt-users-modal-action="cancel"
                    disabled={formik.isSubmitting || isUserLoading}
                  >
                    Discard
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-kt-users-modal-action="submit"
                    disabled={formik.isSubmitting || isUserLoading}
                  >
                    <span className="indicator-label">Submit</span>
                    {(formik.isSubmitting || isUserLoading) && (
                      <span className="indicator-progress">
                        Please wait...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* end::Modal - Users - Add */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export { UserEditModalForm };
