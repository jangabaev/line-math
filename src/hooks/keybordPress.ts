import { useEffect } from "react";

interface IKey {
  deleteNodes: (e: any) => void;
  selectedEl: any;
  setSelectedEl: (e: any) => void;
}

export const useKeyboardPress = ({
  deleteNodes,
  selectedEl,
  setSelectedEl,
}: IKey) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Backspace" && e.key !== "Delete") return;

      const target = e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      e.preventDefault();

      if (!selectedEl) return;

      deleteNodes(selectedEl.id);
      setSelectedEl(null);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEl, deleteNodes, setSelectedEl]);
};
