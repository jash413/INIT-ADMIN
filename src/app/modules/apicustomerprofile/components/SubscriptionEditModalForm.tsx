import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../_metronic/helpers";
import { Subscription } from "../subscriptionCore/_models";
import clsx from "clsx";
import { useListView } from "../subscriptionCore/ListViewProvider";
import {
  createSubscription,
  updateSubscription,
  getGstSystem,
} from "../subscriptionCore/_requests";
import { useQueryResponse } from "../subscriptionCore/QueryResponseProvider";
import { getUserById } from "../../apiusers/users-list/core/_requests";
import moment from "moment";
import { KTIcon } from "../../../../_metronic/helpers";
import { getAllCustomers } from "../../apicustomers/customers-list/core/_requests";

type Props = {
  isSubscriptionLoading: boolean;
  subscription: Subscription;
  onClose: () => void; // Add onClose prop to handle modal closure
  onSubscriptionSaved: () => void;
  customerId: string;
};

const editSubscriptionSchema = Yup.object().shape({
  SUBSCRIPTION_DATE: Yup.string().required("Subscription Date is required"),
  GST_CODE: Yup.string().required("GST Code is required"),
  SYSTEM_ID: Yup.string().required("System Id is required"),
  user_id: Yup.string().required("User Id is required"),
  INV_DATE: Yup.string().required("Invoice Date is required"),
  INV_NO: Yup.string().required("Invoice Number is required"),
  ALLOTED_CALLS: Yup.string().required("Alloted Calls is required"),
});

const SubscriptionEditModalForm: FC<Props> = ({
  subscription,
  isSubscriptionLoading,
  onClose,
  onSubscriptionSaved,
  customerId,
}) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();
  const [users, setUsers] = useState<any>([]);
  const [gstSystems, setGstSystems] = useState<any>([]);
  const [customers, setCustomers] = useState<any>([]);
  const [isUserFieldDisabled, setIsUserFieldDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    getGstSystem().then((data: any) => {
      const gstSystemOptions = data?.data.map((gstSystem: any) => ({
        value: gstSystem.id,
        label: gstSystem.system_name,
      }));

      setGstSystems(
        gstSystemOptions.filter((system: any) => system.value !== 1)
      );

      getAllCustomers().then((data: any) => {
        const customerOptions = data?.data.map((customer: any) => ({
          value: customer.REG_CODE,
          label: customer.CUS_NAME,
        }));

        setCustomers(customerOptions);
      });
    });
  }, []);

  const [subscriptionForEdit] = useState<Subscription>({
    ...subscription,
    GST_CODE: customerId,
    SYSTEM_ID: subscription.SYSTEM_ID,
    SUBSCRIPTION_DATE: moment(subscription.SUBSCRIPTION_DATE).format(
      "YYYY-MM-DD"
    ),
    is_active: subscription.is_active || 0,
    user_id: subscription.user_id,
    INV_DATE: moment(subscription.INV_DATE).format("YYYY-MM-DD"),
    INV_NO: subscription.INV_NO,
    ALLOTED_CALLS: subscription.ALLOTED_CALLS,
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
    onClose();
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
        onSubscriptionSaved();
      }
    },
  });

  useEffect(() => {
    getUserById(formik.values.GST_CODE).then((data: any) => {
      const userOptions = data?.map((user: any) => ({
        value: user.id,
        label: user.USR_ID,
      }));

      setUsers(userOptions);

      if (userOptions.length === 1) {
        formik.setFieldValue("user_id", userOptions[0].value);
        setIsUserFieldDisabled(true);
      } else {
        setIsUserFieldDisabled(false);
      }
    });
  }, [formik.values.GST_CODE]);

  const renderField = (
    label: string,
    name: keyof Subscription,
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
            disabled={formik.isSubmitting || isSubscriptionLoading}
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
          disabled={formik.isSubmitting || isSubscriptionLoading}
        />
      )}
    </div>
  );

  const renderSelectField = (
    label: string,
    name: keyof Subscription,
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
        disabled={formik.isSubmitting || isSubscriptionLoading || isDisabled}
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
                {subscription.id ? "Edit Subscription" : "Add Subscription"}
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
                  {renderSelectField(
                    "Select Customer",
                    "GST_CODE",
                    customers,
                    true,
                    true
                  )}
                  {renderSelectField(
                    "Select User",
                    "user_id",
                    users,
                    true,
                    isUserFieldDisabled
                  )}
                  {renderSelectField(
                    "Select System",
                    "SYSTEM_ID",
                    gstSystems,
                    true,
                    subscription.SYSTEM_ID !== undefined
                  )}
                  {renderField(
                    "Subscription Date",
                    "SUBSCRIPTION_DATE",
                    "date"
                  )}
                  {renderField("Alloted Calls", "ALLOTED_CALLS")}
                  {renderField("Invoice Date", "INV_DATE", "date")}
                  {renderField("Invoice Number", "INV_NO")}
                  {renderField("Active", "is_active", "checkbox", false, true)}
                </div>

                <div className="text-center pt-15">
                  <button
                    type="reset"
                    onClick={() => cancel()}
                    className="btn btn-light me-3"
                  >
                    Discard
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={formik.isSubmitting || isSubscriptionLoading}
                  >
                    <span className="indicator-label">Submit</span>
                    {(formik.isSubmitting || isSubscriptionLoading) && (
                      <span className="indicator-progress">
                        Please wait...
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
    </>
  );
};

export { SubscriptionEditModalForm };
