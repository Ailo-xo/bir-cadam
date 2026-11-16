import { AnimatePresence, motion } from 'framer-motion'
import { useAppSettings } from '../context/AppSettingsContext'

const Modal = ({ isOpen, onClose, title, children }) => {
  const { t } = useAppSettings()

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h3>{title}</h3>
              <button type="button" className="close-button" onClick={onClose} aria-label={t('common.close')}>
                ×
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Modal
