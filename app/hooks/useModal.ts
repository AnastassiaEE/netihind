import useBoolean from '@/hooks/useBoolean';
import { useEffect, useRef } from 'react';

export default function useModal() {
  const { value: isModalVisible, setTrue: openModal, setFalse: closeModal } = useBoolean(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [closeModal]);

  return {
    modalRef,
    isModalVisible,
    openModal,
    closeModal,
  };
}
