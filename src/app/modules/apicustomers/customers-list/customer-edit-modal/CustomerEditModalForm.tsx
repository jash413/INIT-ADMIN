import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../_metronic/helpers";
import { Customer } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { CustomersListLoading } from "../components/loading/CustomersListLoading";
import { createCustomer, updateCustomer } from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";
import moment from "moment";

type Props = {
  isCustomerLoading: boolean;
  customer: Customer;
};

const editCustomerSchema = Yup.object().shape({
  CUS_NAME: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  CUS_ADDR: Yup.string().required("Address is required"),
  REG_CODE: Yup.string().required("Registration code is required"),
  CMP_NAME: Yup.string().required("Company name is required"),
  notification_date: Yup.string().required("Notification date is required"),
});

const CustomerEditModalForm: FC<Props> = ({ customer, isCustomerLoading }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const [customerForEdit] = useState<Customer>({
    ...customer,
    REG_CODE: customer.REG_CODE,
    CUS_NAME: customer.CUS_NAME,
    CUS_ADDR: customer.CUS_ADDR,
    CMP_NAME: customer.CMP_NAME,
    notification_date: moment(customer.notification_date).format("YYYY-MM-DD"),
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: customerForEdit,
    validationSchema: editCustomerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values.id)) {
          await updateCustomer(values);
        } else {
          await createCustomer(values);
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
    name: keyof Customer,
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
        disabled={formik.isSubmitting || isCustomerLoading}
      />
    </div>
  );

  return (
    <>
      <form
        id="kt_modal_add_customer_form"
        className="form"
        onSubmit={formik.handleSubmit}
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
          {renderField("Registration Code", "REG_CODE")}
          {renderField("Customer Name", "CUS_NAME")}
          {renderField("Address", "CUS_ADDR")}
          {renderField("Company Name", "CMP_NAME")}
          {renderField("Notification Date", "notification_date", "date")}
        </div>
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-customers-modal-action="cancel"
            disabled={formik.isSubmitting || isCustomerLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-customers-modal-action="submit"
            disabled={
              isCustomerLoading ||
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched
            }
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting || isCustomerLoading) && (
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isCustomerLoading) && <CustomersListLoading />}
    </>
  );
};

export { CustomerEditModalForm };
