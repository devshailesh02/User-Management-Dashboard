import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Drawer = ({
  open,
  onClose,
  title,
  children,
  position = "left", // left | right
  width = "w-80", // Tailwind width class
}) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Prevent body scrolling while drawer is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 ${
          position === "left" ? "left-0" : "right-0"
        } z-50 flex h-screen ${width} flex-col bg-white shadow-xl transition-transform duration-300 ${
          position === "left"
            ? open
              ? "translate-x-0"
              : "-translate-x-full"
            : open
              ? "translate-x-0"
              : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </>
  );
};

export default Drawer;
