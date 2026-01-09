import styles from "../styles/TrailerModal.module.css";

function TrailerModal({ trailerKey, onClose }) {
  if (!trailerKey) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Bande-annonce"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default TrailerModal;
