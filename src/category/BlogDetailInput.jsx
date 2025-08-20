import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BlogDetailInput({ value, onChange }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': [1, 2, 3, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'link', 'image'
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value || ''}
      onChange={onChange}
      modules={modules}
      formats={formats}
      style={{ height: '200px', marginBottom: '50px' }}
    />
  );
}