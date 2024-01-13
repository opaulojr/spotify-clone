'use client';

import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Modal
        title="Modal title"
        description="Modal description"
        isOpen
        onChange={() => {}}
      >
        Modal Body
      </Modal>
    </div>
  );
}

export default ModalProvider;
