import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaExclamationCircle, FaFilePdf, FaFileAlt } from 'react-icons/fa';

const FileUploader = ({ bucket, onUploadSuccess, currentValue, accept = "image/*" }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentValue);

  const isImage = accept.includes('image');

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      setError(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Pilih file untuk diunggah.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUploadSuccess(publicUrl);
      
    } catch (err) {
      console.error('Error uploading:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const uploaderId = React.useMemo(() => `file-upload-${bucket}-${Math.random().toString(36).substr(2, 9)}`, [bucket]);

  return (
    <div className="file-uploader" style={{ marginBottom: '15px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px',
        padding: '10px',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        background: '#f9f9f9'
      }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '4px', 
          background: '#eee',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {preview && isImage ? (
            <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : preview && !isImage ? (
            <FaFilePdf style={{ fontSize: '1.5rem', color: '#e74c3c' }} />
          ) : (
            <FaCloudUploadAlt style={{ fontSize: '1.5rem', color: '#ccc' }} />
          )}
        </div>

        <div style={{ flexGrow: 1 }}>
          <input
            type="file"
            accept={accept}
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: 'none' }}
            id={uploaderId}
          />
          <label 
            htmlFor={uploaderId}
            style={{
              padding: '6px 12px',
              background: '#007bff',
              color: 'white',
              borderRadius: '4px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {uploading ? <FaSpinner className="fa-spin" /> : <FaCloudUploadAlt />}
            {isImage ? 'Unggah Gambar' : 'Unggah File (PDF)'}
          </label>
          
          {error && (
            <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaExclamationCircle /> {error}
            </div>
          )}
          
          {!error && preview && !uploading && (
            <div style={{ color: 'green', fontSize: '0.75rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaCheckCircle /> Berhasil diunggah
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
