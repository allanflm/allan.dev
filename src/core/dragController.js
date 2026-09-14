// Pointer Events em vez de mouse events: funciona em mouse E touch
// sem código separado. setPointerCapture garante que o "solto" seja
// recebido mesmo se o ponteiro sair da title bar no meio do arrasto.
export function attachDrag(handleEl, { getPosition, onMove }) {
  handleEl.style.touchAction = 'none';

  let pointerId = null;
  let startPointerX = 0;
  let startPointerY = 0;
  let startX = 0;
  let startY = 0;

  function onPointerDown(event) {
    if (event.target.closest('.title-bar-controls')) return;

    pointerId = event.pointerId;
    handleEl.setPointerCapture(pointerId);

    startPointerX = event.clientX;
    startPointerY = event.clientY;
    const pos = getPosition();
    startX = pos.x;
    startY = pos.y;

    handleEl.addEventListener('pointermove', onPointerMove);
    handleEl.addEventListener('pointerup', onPointerUp);
    handleEl.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(event) {
    if (event.pointerId !== pointerId) return;
    const dx = event.clientX - startPointerX;
    const dy = event.clientY - startPointerY;
    onMove(startX + dx, startY + dy);
  }

  function onPointerUp(event) {
    if (event.pointerId !== pointerId) return;
    handleEl.releasePointerCapture(pointerId);
    handleEl.removeEventListener('pointermove', onPointerMove);
    handleEl.removeEventListener('pointerup', onPointerUp);
    handleEl.removeEventListener('pointercancel', onPointerUp);
    pointerId = null;
  }

  handleEl.addEventListener('pointerdown', onPointerDown);
}
