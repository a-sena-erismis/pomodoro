function Modal({ onClose, children }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-frame" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="kapat">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
