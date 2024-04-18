import React from 'react';
import styles from './EditCommentModal.module.css';

export const EditCommentModal = ({ isOpen, isCancel, isConfirm, editedText, setEditedText }) => {
    return (
        <div className={`${styles['modal']} ${isOpen ? 'show' : 'hide'}`}>
            <div className={styles['modal-content']}>
                <span className={styles.close} onClick={isCancel}>&times;</span>
                <h2>Edit Comment</h2>
                <textarea
                    className={styles.textInput}
                    value={editedText}
                    onChange={(event) => setEditedText(event.target.value)}
                ></textarea>
                <button className={styles.saveChangesBtn} onClick={() => isConfirm(editedText)}>Save Changes</button>
            </div>
        </div>
    )
}