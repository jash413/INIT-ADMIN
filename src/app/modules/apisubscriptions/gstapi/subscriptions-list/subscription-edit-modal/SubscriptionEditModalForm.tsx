import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../../_metronic/helpers";
import { Subscription } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { SubscriptionsListLoading } from "../components/loading/SubscriptionsListLoading";
import { createSubscription, updateSubscription } from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";
import moment from "moment";

type Props = {
  isSubscriptionLoading: boolean;
  subscription: Subscription;
};

const editSubscriptionSchema = Yup.object().shape({
  CUS_NAME: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  CUS_ADDR: Yup.string().required("Address is required"),
  CMP_NAME: Yup.string().required("Company name is required"),
  notification_date: Yup.string().required("Notification date is required"),
});

const SubscriptionEditModalForm: FC<Props> = ({ subscription, isSubscriptionLoading }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const [subscriptionForEdit] = useState<Subscription>({
    ...subscription,
    CUS_NAME: subscription.CUS_NAME,
    CUS_ADDR: subscription.CUS_ADDR,
    CMP_NAME: subscription.CMP_NAME,
    notification_date: moment(subscription.notification_date).format("YYYY-MM-DD"),
  });

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
        if (isNotEmpty(values.id)) {
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
        disabled={formik.isSubmitting || isSubscriptionLoading}
      />
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
          {renderField("Subscription Name", "CUS_NAME")}
          {renderField("Address", "CUS_ADDR")}
          {renderField("Company Name", "CMP_NAME")}
          {renderField("Notification Date", "notification_date", "date")}
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
      {(formik.isSubmitting || isSubscriptionLoading) && <SubscriptionsListLoading />}
    </>
  );
};

export { SubscriptionEditModalForm };
