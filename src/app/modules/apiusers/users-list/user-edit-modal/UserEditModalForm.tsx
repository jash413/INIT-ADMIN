import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../_metronic/helpers";
import { User } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { createUser, updateUser } from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";
import moment from "moment";

type Props = {
  isUserLoading: boolean;
  user: User;
};

const editUserSchema = Yup.object().shape({
  CUS_NAME: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  CUS_ADDR: Yup.string().required("Address is required"),
  CMP_NAME: Yup.string().required("Company name is required"),
  notification_date: Yup.string().required("Notification date is required"),
});

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const [userForEdit] = useState<User>({
    ...user,
    GST_CODE: user.GST_CODE,
    GST_NMBR: user.GST_NMBR,
    USR_ID: user.USR_ID,
    USR_PASS: user.USR_PASS,
    USR_ACTV: user.USR_ACTV,
    is_admin: user.is_admin,
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
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
      }
    },
  });

  const renderField = (
    label: string,
    name: keyof User,
    type = "text",
    isRequired = true
  ) => (
    <div className="fv-row mb-7">
      <label className={clsx("fw-bold fs-6 mb-2", isRequired && "required")}>
        {label}
      </label>
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
    </div>
  );

  return (
    <>
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
          {renderField("Select Customer", "GST_CODE")}
          {renderField("GST Number", "GST_NMBR")}
          {renderField("Email", "USR_ID", "email")}
          {renderField("Password", "USR_PASS", "password")}
          {renderField("Active", "USR_ACTV", "checkbox", false)}
          {renderField("Is Admin", "is_admin", "checkbox", false)}
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
            disabled={
              isUserLoading ||
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched
            }
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
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  );
};

export { UserEditModalForm };
