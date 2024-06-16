import React from 'react';

function Modal({ post, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{post.title}</h2>
                <p style={{marginTop: "20px"}}>{post.content}</p>
            </div>
        </div>
    );
}

export default Modal;
