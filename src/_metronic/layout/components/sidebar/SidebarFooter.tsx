import {useAuth} from '../../../../app/modules/auth'
import {KTIcon} from '../../../helpers'

const SidebarFooter = () => {
  const {logout} = useAuth()
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
      <a
        href='#'
        onClick={logout}
        className='btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100'
        data-bs-toggle='tooltip'
        data-bs-trigger='hover'
        data-bs-dismiss-='click'
        title='Sign Out'
      >
        <span className='btn-label'>SIGN OUT</span>
        <KTIcon iconName='profile-circle' className='btn-icon fs-2 m-0' />
      </a>
    </div>
  )
}

export {SidebarFooter}
