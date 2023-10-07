type ModalProps = {
  children: React.ReactNode;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ children, setShowModal }: ModalProps) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
          onClick={() => setShowModal(false)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
