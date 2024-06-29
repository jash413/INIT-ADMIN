import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../_metronic/helpers";
import { Subscription } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { SubscriptionsListLoading } from "../components/loading/SubscriptionsListLoading";
import {
  createSubscription,
  updateSubscription,
  fetchCustomers,
  fetchPlans,
} from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";

type Props = {
  isSubscriptionLoading: boolean;
  subscription: Subscription;
};

const editSubscriptionSchema = Yup.object().shape({
  CUS_CODE: Yup.string().required("Customer Code is required"),
  SUB_STDT: Yup.string().required("Start Date is required"),
  SUB_ENDT: Yup.string().required("End Date is required"),
  PLA_CODE: Yup.string().required("Plan Code is required"),
  LIC_USER: Yup.number().required("License User is required"),
  SUB_ORDN: Yup.string().required("Order Number is required"),
  ORD_REQD: Yup.number().required("Order Required is required"),
  status: Yup.number().required("Status is required"),
});

const SubscriptionEditModalForm: FC<Props> = ({
  subscription,
  isSubscriptionLoading,
}) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const [subscriptionForEdit] = useState<Subscription>({
    ...subscription,
    SUB_STDT: subscription.SUB_STDT,
    SUB_ENDT: subscription.SUB_ENDT,
    PLA_CODE: subscription.PLA_CODE,
    LIC_USER: subscription.LIC_USER,
    SUB_ORDN: subscription.SUB_ORDN,
    ORD_REQD: subscription.ORD_REQD,
    status: subscription.status,
  });

  const [customers, setCustomers] = useState([]);
  const [plans, setPlans] = useState([]);

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
        const plansData = await fetchPlans();
        setPlans(
          plansData?.data?.map((plan: any) => ({
            value: plan.PLA_CODE,
            label: plan.PLA_DESC,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: subscriptionForEdit,
    validationSchema: editSubscriptionSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isNotEmpty(values.SUB_CODE)) {
          await updateSubscription(values);
        } else {
          await createSubscription(values);
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
    name: keyof Subscription,
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
            disabled={formik.isSubmitting || isSubscriptionLoading}
            checked={formik.values[name] === 1}
            onChange={() =>
              formik.setFieldValue(name, formik.values[name] === 1 ? 0 : 1)
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
          disabled={formik.isSubmitting || isSubscriptionLoading}
        />
      )}
    </div>
  );

  const renderSelectField = (
    label: string,
    name: keyof Subscription,
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
        disabled={formik.isSubmitting || isSubscriptionLoading}
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
        id="kt_modal_add_subscription_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div
          className="d-flex flex-column scroll-y me-n7 pe-7"
          id="kt_modal_add_subscription_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_subscription_header"
          data-kt-scroll-wrappers="#kt_modal_add_subscription_scroll"
          data-kt-scroll-offset="300px"
        >
          {renderSelectField("Select Customer", "CUS_CODE", customers)}
          {renderField("Start Date", "SUB_STDT", "date")}
          {renderField("End Date", "SUB_ENDT", "date")}
          {renderSelectField("Select Plan", "PLA_CODE", plans)}
          {renderField("License Users", "LIC_USER")}
          {renderField("Invoice No.", "SUB_ORDN")}
          {renderField(
            "Order Entry Required",
            "ORD_REQD",
            "checkbox",
            true,
            true
          )}
          {renderField("Status", "status", "checkbox", true, true)}
        </div>
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-subscriptions-modal-action="cancel"
            disabled={formik.isSubmitting || isSubscriptionLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-subscriptions-modal-action="submit"
            disabled={
              isSubscriptionLoading ||
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched
            }
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting || isSubscriptionLoading) && (
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isSubscriptionLoading) && (
        <SubscriptionsListLoading />
      )}
    </>
  );
};

export { SubscriptionEditModalForm };
