import Modal from './Modal'
import { useAppSettings } from '../context/AppSettingsContext'

const ConfirmDialog = ({ isOpen, title, message, onClose, onConfirm, confirmLabel }) => {
  const { t } = useAppSettings()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="dialog-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            {t('common.cancel')}
          </button>
          <button type="button" className="primary-button" onClick={onConfirm}>
            {confirmLabel || t('common.confirm')}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
