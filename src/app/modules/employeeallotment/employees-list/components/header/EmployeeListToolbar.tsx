import {KTIcon} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

const EmployeesListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddEmployeeModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-employee-table-toolbar='base'>
      {/* begin::Add employee */}
      <button type='button' className='btn btn-primary' onClick={openAddEmployeeModal}>
        <KTIcon iconName='plus' className='fs-2' />
        Add Employee
      </button>
      {/* end::Add employee */}
    </div>
  )
}

export {EmployeesListToolbar}
