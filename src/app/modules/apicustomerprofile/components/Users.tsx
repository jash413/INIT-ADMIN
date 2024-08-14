import { FC, useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { ApiUserCard } from "../../../../_metronic/partials/content/cards/ApiUserCard";
import { getUserById, searchUsers, deleteUser } from "../userCore/_requests";
import { getCustomerById } from "../../apicustomers/customers-list/core/_requests";
import { User } from "../userCore/_models";
import moment from "moment";
import { UserEditModalForm } from "./UserEditModalForm";
import { useDebounce, KTIcon } from "../../../../_metronic/helpers";
import { CustomersListFilter } from "./CustomersUserListFilter";

interface UsersProps {
  id: string;
}

const Users: FC<UsersProps> = ({ id }) => {
  const [users, setUsers] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const debouncedSearchTerm = useDebounce(searchTerm, 150);
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    getCustomerById(id).then((data) => {
      setCustomer(data);
    });
  }, [id]);

  useEffect(() => {
    if (customer && customer.REG_CODE) {
      fetchUsers();
    }
  }, [customer]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true); // Set loading to true before starting the search
      searchUsers(debouncedSearchTerm, id)
        .then((data) => {
          setUsers(data?.data || []);
        })
        .finally(() => {
          setLoading(false); // Set loading to false once the search is complete
        });
    } else {
      fetchUsers(); // Re-fetch all users if search term is cleared
    }
  }, [debouncedSearchTerm]);

  const fetchUsers = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const data = await getUserById(customer.REG_CODE);
      setUsers(data);
    } catch (error) {
      console.error("Fetch Users Error:", error);
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };

  const handleNewUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (user: User) => {
    try {
      const warning = window.confirm(
        `Are you sure you want to delete user ${user.id}?`
      );
      if (!warning) return;
      await deleteUser(user.id);
      fetchUsers();
    } catch (error) {
      console.error("Delete User Error:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Content>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <div className="d-flex align-items-center position-relative my-1">
          <KTIcon
            iconName="magnifier"
            className="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            data-kt-user-table-filter="search"
            className="form-control form-control-solid w-250px ps-14"
            placeholder="Search User..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="d-flex flex-wrap my-2">
          <CustomersListFilter
            REG_CODE={customer?.REG_CODE}
            setUser={setUsers}
          />
          <button onClick={handleNewUser} className="btn btn-primary btn-sm">
            <KTIcon iconName="plus" className="fs-2" />
            New User
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div> // Display loading indicator
      ) : (
        <div className="row g-6 g-xl-9">
          {users.length > 0 ? (
            users.map((user: User) => (
              <div key={user.id} className="col-md-6 col-xl-4">
                <ApiUserCard
                  badgeColor={user.USR_ACTV === 1 ? "success" : "danger"}
                  status={user.USR_ACTV === 1 ? "Active" : "Inactive"}
                  createdOn={moment(user.CREATED_ON).format("MMM DD, YYYY")}
                  handleEditUser={handleEditUser}
                  handleDeleteUser={handleDeleteUser}
                  user={user}
                />
              </div>
            ))
          ) : (
            <div className="text-center">No users found</div>
          )}
        </div>
      )}

      {isModalOpen && (
        <UserEditModalForm
          user={selectedUser || ({} as User)}
          isUserLoading={false}
          onClose={handleCloseModal}
          onUserSaved={fetchUsers}
        />
      )}
    </Content>
  );
};

export { Users };
