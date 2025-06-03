.toast {
    position: fixed;
    bottom: 40px;
    right: 40px;
    min-width: 280px;
    max-width: 350px;
    padding: 18px 28px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #222;
    font-size: 1.1rem;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
}
.toast.show {
    opacity: 1;
    pointer-events: auto;
}
.toast.success {
    border-left: 5px solid #4ade80;
}
.toast.error {
    border-left: 5px solid #f87171;
}