import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Quill's snow theme

export default function BlogDetailInput({ value, onChange }) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML); // Send HTML content to parent
      });

      // Set initial value if editing
      if (value) {
        quill.root.innerHTML = value;
      }
    }
  }, [quill, value, onChange]);

  return <div style={{ height: 200 }} ref={quillRef} />;
}
