import { useQueryClient, useMutation } from "react-query";
import { QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import { deleteSelectedCustomers } from "../../core/_requests";

const CustomersListGrouping = () => {
  const { selected, clearSelected } = useListView();
  const queryClient = useQueryClient();
  const { query } = useQueryResponse();

  const deleteSelectedItems = useMutation(() => deleteSelectedCustomers(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
      clearSelected();
    },
  });

  return (
    <div className="d-flex justify-content-end align-items-center">
      <div className="fw-bolder me-5">
        <span className="me-2">{selected.length}</span> Selected
      </div>

      <button
        type="button"
        className="btn btn-danger"
        onClick={async () => {
          const isConfirmed = window.confirm(
            "Are you sure to delete all selected Customers?"
          );
          if (!isConfirmed) {
            clearSelected();
            return;
          }
          await deleteSelectedItems.mutateAsync();
        }}
      >
        Delete Selected
      </button>
    </div>
  );
};

export { CustomersListGrouping };
