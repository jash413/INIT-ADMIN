
import {useState} from 'react'
import {CreateAppModal} from '../../../../partials'
import {useLayout} from '../../../core'

const ToolbarClassic = () => {
  const {config} = useLayout()
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)

  return (
    <div className='d-flex align-items-center gap-2 gap-lg-3'>
      {config.app?.toolbar?.primaryButton && (
        <a
          href='#'
          onClick={() => setShowCreateAppModal(true)}
          className='btn btn-sm fw-bold btn-primary'
        >
          Create Customer
        </a>
      )}
      <CreateAppModal show={showCreateAppModal} handleClose={() => setShowCreateAppModal(false)} />
    </div>
  )
}

export {ToolbarClassic}
