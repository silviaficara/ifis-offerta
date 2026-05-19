"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function Dialog({ open, onClose, title, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="rounded-2xl p-0 w-[92vw] max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0"
    >
      <div className="flex flex-col max-h-[90vh] bg-white text-zinc-900">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="rounded-full w-8 h-8 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </dialog>
  );
}
