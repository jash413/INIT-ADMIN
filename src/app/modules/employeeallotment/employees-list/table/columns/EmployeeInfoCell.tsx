
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Employee} from '../../core/_models'

type Props = {
  employee: Employee
}

const EmployeeInfoCell: FC<Props> = ({employee}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {employee.CUS_CODE}
      </a>
    </div>
  </div>
)

export {EmployeeInfoCell}
